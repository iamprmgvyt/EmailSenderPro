import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import nodemailer from 'nodemailer';

const DAILY_LIMIT = 10;
const SENDER_EMAIL = process.env.EMAIL_FROM;
const SENDER_PASSWORD = process.env.EMAIL_PASSWORD;

export async function POST(req: Request) {
  if (!SENDER_EMAIL || !SENDER_PASSWORD) {
    console.error('EMAIL_FROM and EMAIL_PASSWORD are not defined in .env');
    return NextResponse.json(
      { message: 'Server configuration error: Email service is not configured.' },
      { status: 500 }
    );
  }

  try {
    await dbConnect();

    const apiKey = req.headers.get('x-api-key');
    if (!apiKey) {
      return NextResponse.json({ message: 'API Key is required.' }, { status: 401 });
    }

    const user = await User.findOne({ apiKey });
    if (!user) {
      return NextResponse.json({ message: 'Invalid API Key.' }, { status: 401 });
    }
    
    // Check if the user's account is locked
    if (user.isLocked && user.lockExpires && user.lockExpires > new Date()) {
        return NextResponse.json({
            message: `Your account is currently locked due to suspicious activity. API key is disabled until ${user.lockExpires.toLocaleDateString()}.`
        }, { status: 403 });
    }

    const today = new Date().toISOString().split('T')[0];
    if (user.dailySent.date !== today) {
        user.dailySent.count = 0;
        user.dailySent.date = today;
    }

    if (user.dailySent.count >= DAILY_LIMIT) {
        return NextResponse.json({ message: 'Daily email limit reached.' }, { status: 429 });
    }

    const { to, subject, body } = await req.json();
    if (!to || !body) {
        return NextResponse.json({ message: 'Missing parameters: to and body are required.' }, { status: 400 });
    }

    const finalSubject = subject || user.emailConfig.defaultSubject || 'No Subject';
    const from = user.emailConfig.fromName ? `"${user.emailConfig.fromName}" <${SENDER_EMAIL}>` : SENDER_EMAIL;

    try {
        // Create a transporter for sending email via Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASSWORD,
            },
        });

        // Define email options
        const mailOptions = {
            from: from,
            to: to,
            subject: finalSubject,
            html: body, // Use html for rich text emails
        };

        // Send the email
        await transporter.sendMail(mailOptions);
    } catch (emailError) {
        console.error('Nodemailer failed to send email:', emailError);
        return NextResponse.json(
            { message: 'Failed to send email. Please ensure your EMAIL_FROM and EMAIL_PASSWORD (App Password) environment variables are set correctly.' },
            { status: 500 }
        );
    }
    
    // Increment the user's daily sent count
    user.dailySent.count += 1;
    await user.save();

    return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Send email route error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred processing the request.' },
      { status: 500 }
    );
  }
}
