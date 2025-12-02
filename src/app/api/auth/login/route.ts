import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d';

export async function POST(req: Request) {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET or JWT_EXPIRES_IN is not defined in .env');
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

    const isPasswordMatch = await bcrypt.compare(password, user.password || '');

    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

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
