import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  id: string;
}

// GET user's email config
export async function GET() {
  if (!JWT_SECRET) {
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  try {
    await dbConnect();
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    const userId = (payload as JwtPayload).id;
    
    const user = await User.findById(userId).select('emailConfig');
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ emailConfig: user.emailConfig }, { status: 200 });
  } catch (error) {
    console.error('Error fetching email config:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}


// UPDATE user's email config
export async function POST(req: Request) {
    if (!JWT_SECRET) {
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    try {
        await dbConnect();
        const token = cookies().get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }
        
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        const userId = (payload as JwtPayload).id;

        const { fromName, defaultSubject } = await req.json();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        user.emailConfig.fromName = fromName;
        user.emailConfig.defaultSubject = defaultSubject;

        await user.save();
        
        return NextResponse.json({ message: 'Email configuration updated successfully.' }, { status: 200 });

    } catch (error) {
        console.error('Error updating email config:', error);
        return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
    }
}
