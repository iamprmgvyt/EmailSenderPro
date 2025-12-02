import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default function RootPage() {
  if (!JWT_SECRET) {
    // This will be caught by the server and should show an error.
    // In a production environment, you should have better error handling.
    throw new Error('JWT_SECRET is not defined on the server.');
  }
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
