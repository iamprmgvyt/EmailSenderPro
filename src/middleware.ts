import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

const PROTECTED_ROUTES = ['/dashboard'];
const PUBLIC_ROUTES = ['/login', '/signup', '/privacy', '/tos'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined. Authentication will not work.');
    return new NextResponse('Server configuration error.', { status: 500 });
  }

  let isVerified = false;
  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      isVerified = true;
    } catch (err) {
      isVerified = false;
    }
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  // If user is verified
  if (isVerified) {
    // If they are on a public-only route (like login), redirect to dashboard
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Otherwise, let them proceed
    return NextResponse.next();
  }

  // If user is not verified
  // and they are trying to access a protected route, redirect to login
  if (!isVerified && isProtectedRoute) {
    const response = NextResponse.redirect(new URL('/login', req.url));
    // Clear any invalid token
    response.cookies.delete('token');
    return response;
  }
  
  // Otherwise, let them proceed
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