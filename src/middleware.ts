import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  const protectedPaths = ['/dashboard'];
  
  // Paths that are for guests only (redirect to dashboard if logged in)
  const authPaths = ['/login', '/register'];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  // Check if the current path is an auth path
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));

  // ROOT PATH HANDLER
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      // Allow access to Landing Page for guests
      return NextResponse.next();
    }
  }

  // 1. If trying to access protected path without token -> Redirect to login
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    // Optional: Add a callback URL to redirect back after login
    // loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If trying to access auth path (login/register) WITH token -> Redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
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
     * - assets (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
