// middleware.js

import { NextResponse } from 'next/server';

export function middleware(req:any) {
  // Clone the response so we can set headers
  const response = NextResponse.next();

  // Allow any origin
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200 });
  }

  return response;
}

export const config = {
  matcher: '/:path*', // Apply middleware only to API routes
};
