import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add caching headers for static assets (but not videos during development)
  if (request.nextUrl.pathname.startsWith('/images/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  } else if (request.nextUrl.pathname.startsWith('/videos/')) {
    // Shorter cache for videos to allow updates during development
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, must-revalidate'
    );
  } else if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
