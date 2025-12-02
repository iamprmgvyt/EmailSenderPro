import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

const DAILY_LIMIT = 10;

export async function POST(req: Request) {
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
    const from = user.emailConfig.fromName ? `${user.emailConfig.fromName} <${user.email}>` : user.email;

    // This is where you would integrate with a real email sending service
    // like SendGrid, Mailgun, AWS SES, etc.
    // For this example, we'll just simulate sending an email.
    console.log(`Simulating email send from: ${from}`);
    console.log(`Simulating email send to: ${to}`);
    console.log(`Subject: ${finalSubject}`);
    console.log(`Body: ${body}`);
    
    // Increment the user's daily sent count
    user.dailySent.count += 1;
    await user.save();

    return NextResponse.json({ message: 'Email sent successfully (simulated).' }, { status: 200 });

  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
