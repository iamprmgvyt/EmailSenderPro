import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Protect dashboard route
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
      verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Redirect logged-in users from login page to dashboard
  if (pathname === '/login') {
    if (token) {
      try {
        verify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } catch (err) {
        // Invalid token, allow access to login page
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
