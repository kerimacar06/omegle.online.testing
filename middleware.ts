import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const token = request.cookies.get('admin_token')?.value;

  // Sadece /admin yazılırsa direkt dashboard'a yönlendir
  if (request.nextUrl.pathname === '/admin') {
     return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (isLoginPage) {
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret');
            await jwtVerify(token, secret);
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch(e) {}
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret');
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
