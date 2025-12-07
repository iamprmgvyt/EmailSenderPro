import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const LOCK_DURATION_DAYS = 15;
const LOGIN_HISTORY_LIMIT = 5;

export async function POST(req: Request) {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in .env');
    return NextResponse.json(
      { message: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Check if account is currently locked
    if (user.isLocked && user.lockExpires && user.lockExpires > new Date()) {
        return NextResponse.json({ 
            message: `Account is locked due to unusual activity. Please try again after ${user.lockExpires.toLocaleDateString()}.` 
        }, { status: 403 });
    }

    // If lock has expired, unlock the account
    if (user.isLocked && user.lockExpires && user.lockExpires <= new Date()) {
        user.isLocked = false;
        user.lockExpires = undefined;
    }


    const isPasswordMatch = await bcrypt.compare(password, user.password || '');

    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // IP Check and Login History Logic
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    if (ip !== 'unknown') {
        const isNewIp = !user.knownIPs.includes(ip);

        // Add new login record
        user.loginHistory.unshift({ ip, timestamp: new Date() });
        // Keep only the last N records
        if (user.loginHistory.length > LOGIN_HISTORY_LIMIT) {
          user.loginHistory.pop();
        }

        if (user.knownIPs.length > 0 && isNewIp) {
            // New IP detected, lock the account
            user.isLocked = true;
            const lockUntil = new Date();
            lockUntil.setDate(lockUntil.getDate() + LOCK_DURATION_DAYS);
            user.lockExpires = lockUntil;
            user.knownIPs.push(ip); // Add new IP to the list
            await user.save();
            return NextResponse.json({ 
                message: `For your security, your account has been locked for ${LOCK_DURATION_DAYS} days due to a login from a new location. Please contact support if you believe this is an error.`
            }, { status: 403 });

        } else if (user.knownIPs.length === 0) {
            // First login, add the IP
            user.knownIPs.push(ip);
        }
    }
    
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}