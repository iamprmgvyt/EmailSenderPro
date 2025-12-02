import { redirect } from 'next/navigation';

export default function RootPage() {
  // The middleware is now responsible for all authentication-based redirects.
  // This page's only job is to redirect to the primary entry point of the app.
  redirect('/dashboard');

  // This component's purpose is only to redirect, so it returns null.
  return null;
}
