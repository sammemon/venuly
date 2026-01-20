import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isPublicRoute = 
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/marketplace') ||
    request.nextUrl.pathname.startsWith('/about') ||
    request.nextUrl.pathname.startsWith('/contact');

  // Allow auth pages and API auth routes
  if (isAuthPage || isApiAuthRoute || isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect to signin if not authenticated
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Role-based route protection
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/client') && token.role !== 'CLIENT') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (pathname.startsWith('/organizer') && token.role !== 'ORGANIZER') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
