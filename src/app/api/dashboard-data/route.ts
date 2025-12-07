import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User, { IUser } from '@/models/User';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  id: string;
}

export async function GET() {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in .env');
    return NextResponse.json(
      { message: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    await dbConnect();
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    
    const user: IUser | null = await User.findById(decoded.id).select('apiKey dailySent loginHistory');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Reset daily count if the date has changed
    const today = new Date().toISOString().split('T')[0];
    if (user.dailySent.date !== today) {
        user.dailySent.count = 0;
        user.dailySent.date = today;
        await user.save();
    }

    return NextResponse.json({
        apiKey: user.apiKey,
        dailySent: user.dailySent,
        loginHistory: user.loginHistory,
    }, { status: 200 });

  } catch (error) {
    console.error('Dashboard data error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
