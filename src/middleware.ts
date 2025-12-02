import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
const PROTECTED_ROUTES = ['/dashboard'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined. Authentication will not work.');
    if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  // If the user is trying to access a protected route
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Verify the token
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      // If token is valid, allow access to the protected route
      return NextResponse.next();
    } catch (err) {
      // If token is invalid, redirect to login and clear the invalid cookie
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // If the user is authenticated and tries to access login or signup, redirect them to dashboard
  if (token && (pathname === '/login' || pathname === '/signup')) {
     try {
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        return NextResponse.redirect(new URL('/dashboard', req.url));
     } catch (e) {
        // Invalid token, let them proceed to login/signup
     }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
