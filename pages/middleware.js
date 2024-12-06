// middleware.js (or middleware.ts if you're using TypeScript)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Create a response that prevents caching
  const response = NextResponse.next();

  // Set Cache-Control headers to prevent caching
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Expires', '0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Surrogate-Control', 'no-store');

  // Optionally, you can log or manipulate the request further
  console.log('Middleware applied to disable caching for:', request.url);

  return response;
}

// Optionally, you can define which paths the middleware should apply to:
export const config = {
  matcher: '/api/*',  // Apply to all API routes (adjust for your needs)
};
