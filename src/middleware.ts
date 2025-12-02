import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined. Middleware cannot run.');
    // On Vercel, this might redirect to login if not configured.
    // For local dev, it's better to show an error.
    if (process.env.NODE_ENV === 'production') {
       return NextResponse.redirect(new URL('/login', req.url));
    }
    return new NextResponse('Server configuration error: JWT_SECRET is not set.', { status: 500 });
  }

  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isDashboardPage = pathname.startsWith('/dashboard');

  let isTokenValid = false;
  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      isTokenValid = true;
    } catch (err) {
      // Token is invalid or expired
      isTokenValid = false;
    }
  }

  // If the user is authenticated
  if (isTokenValid) {
    // and they are trying to access login/signup, redirect to dashboard
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Otherwise, let them proceed
    return NextResponse.next();
  }

  // If the user is NOT authenticated
  // and they are trying to access a protected page, redirect to login
  if (!isAuthPage) {
    let loginUrl = new URL('/login', req.url);
    // If they were trying to access a specific page, we can redirect them back after login
    // loginUrl.searchParams.set('next', pathname);
    const response = NextResponse.redirect(loginUrl);
    
    // Clear any invalid token cookie to prevent loops
    if (token) {
        response.cookies.set('token', '', { expires: new Date(0) });
    }

    return response;
  }
  
  // If they are not authenticated and on an auth page, let them proceed
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
     * - tos (Terms of Service)
     * - privacy (Privacy Policy)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|tos|privacy).*)',
  ],
};
