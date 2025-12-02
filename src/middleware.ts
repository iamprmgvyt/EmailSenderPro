import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined. Middleware cannot run.');
    return new NextResponse('Server configuration error.', { status: 500 });
  }

  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  let isTokenValid = false;
  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      isTokenValid = true;
    } catch (err) {
      // Token is invalid
      isTokenValid = false;
    }
  }

  // If user is authenticated
  if (isTokenValid) {
    // and they are trying to access login/signup, redirect to dashboard
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Otherwise, let them proceed
    return NextResponse.next();
  }

  // If user is NOT authenticated
  if (!isTokenValid) {
    // and they are trying to access a protected page (not login/signup), redirect to login
    if (!isAuthPage) {
      const response = NextResponse.redirect(new URL('/login', req.url));
      // If there was an invalid token, clear it
      if (token) {
        response.cookies.delete('token');
      }
      return response;
    }
    // If they are on the login/signup page, let them proceed
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};