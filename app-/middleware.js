import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an API route (e.g., "/api/*")
  if (pathname.startsWith('/api')) {
    // Allow API routes to proceed normally
    return NextResponse.next();
  }

  // For all other routes, redirect to index.html (or serve the static file)
  const url = request.nextUrl.clone();
  url.pathname = '/index.html'; // Redirect to index.html for non-API routes

  // You can modify headers if needed, e.g., Cache-Control headers
  const response = NextResponse.rewrite(url);
  response.headers.set('Cache-Control', 'no-store'); // Prevent caching

  return response;
}
