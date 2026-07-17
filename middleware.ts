import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Proxy kendi `request.cookies` nesnesini kullanıyor (lib/auth.ts ise route handler'lara
// özel next/headers cookies() ile çalışıyor), o yüzden secret encode işlemi burada ayrıca yapılıyor.
function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Lütfen .env dosyasında JWT_SECRET değişkenini tanımlayın.");
  }
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const token = request.cookies.get('admin_token')?.value;

  // Sadece /admin yazılırsa direkt dashboard'a yönlendir
  if (request.nextUrl.pathname === '/admin') {
     return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (isLoginPage) {
    if (token) {
        try {
            await jwtVerify(token, getJwtSecretKey());
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch {}
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    try {
      await jwtVerify(token, getJwtSecretKey());
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
