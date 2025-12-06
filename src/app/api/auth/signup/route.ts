import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { message: 'Email, username, and password are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists by email or username
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
        return NextResponse.json(
            { message: 'User with this email already exists' },
            { status: 409 }
        );
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
        return NextResponse.json(
            { message: 'This username is already taken' },
            { status: 409 }
        );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
        email,
        username,
        password: hashedPassword,
    });

    await user.save();

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
