import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default function RootPage() {
  if (!JWT_SECRET) {
    // This should not happen in a configured environment, but it's a safeguard.
    console.error('JWT_SECRET is not defined on the server.');
    // Redirect to login as we cannot verify authentication status.
    redirect('/login');
    return null;
  }
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    try {
      // Check if the token is valid
      verify(token, JWT_SECRET);
      // If valid, go to the dashboard
      redirect('/dashboard');
    } catch (error) {
      // If the token is invalid or expired, go to the login page
      console.log('Invalid token, redirecting to login.');
      redirect('/login');
    }
  } else {
    // If there's no token, go to the login page
    redirect('/login');
  }

  // This component's purpose is only to redirect, so it returns null.
  return null;
}
