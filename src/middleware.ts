import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

const PROTECTED_ROUTES = ['/dashboard'];
const PUBLIC_ONLY_ROUTES = ['/login', '/signup'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined. Authentication will not work.');
    // In production, better to not expose this error.
    if (process.env.NODE_ENV === 'development') {
      return new NextResponse('Server configuration error.', { status: 500 });
    }
    // Fail gracefully in production
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  let isVerified = false;
  try {
    if (token) {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      isVerified = true;
    }
  } catch (err) {
    // Token is invalid
    isVerified = false;
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isPublicOnlyRoute = PUBLIC_ONLY_ROUTES.includes(pathname);

  if (isVerified) {
    // If user is logged in, redirect them from public-only pages to dashboard
    if (isPublicOnlyRoute) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } else {
    // If user is not logged in, redirect them from protected pages to login
    if (isProtectedRoute) {
      const response = NextResponse.redirect(new URL('/login', req.url));
      // Clear any invalid token that might be present
      response.cookies.delete('token');
      return response;
    }
  }
  
  // Allow the request to proceed
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
