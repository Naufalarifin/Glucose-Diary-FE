import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for session cookie
  const session = request.cookies.get('JSESSIONID')
  
  if (!session && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - login
     * - register
     * - api (API routes)
     * - static files (images, etc)
     */
    '/((?!login|register|api|_next/static|favicon.ico).*)',
  ],
}