import { i18nRouter } from 'next-i18n-router';
import { NextRequest } from 'next/server';
import i18nConfig from '@/i18nConfig';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const response = i18nRouter(request, i18nConfig);
  response.headers.set('x-url', request.url);
  response.headers.set('x-origin', origin);
  response.headers.set('x-pathname', pathname);
  return response;
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|ext-api|static|.*\\..*|_next).*)'
  // matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};
