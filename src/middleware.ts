import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req: NextRequest) {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined. Middleware cannot run.');
    // In a real app, you might want to show a generic error page
    // or redirect to a maintenance page.
    // For now, we'll just block the request to avoid security issues.
    return new NextResponse('Server configuration error.', { status: 500 });
  }

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
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // Redirect logged-in users from login or signup page to dashboard
  if (pathname === '/login' || pathname === '/signup') {
    if (token) {
      try {
        verify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } catch (err) {
        // Invalid token, allow access to page but clear the bad cookie
        const response = NextResponse.next();
        response.cookies.delete('token');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
