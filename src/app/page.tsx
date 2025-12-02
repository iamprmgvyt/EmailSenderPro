import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default function RootPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    try {
      verify(token, JWT_SECRET);
      redirect('/dashboard');
    } catch (error) {
      // Invalid token, redirect to login
      redirect('/login');
    }
  } else {
    redirect('/login');
  }

  return null;
}
