import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Çevresel değişkenlerden (env) doğru bilgileri al
    const correctUsername = process.env.ADMIN_USERNAME;
    const correctPassword = process.env.ADMIN_PASSWORD;

    // Bilgileri kontrol et
    if (username === correctUsername && password === correctPassword) {
      // Doğruysa JWT Token oluştur
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret');
      
      const alg = 'HS256';
      const token = await new SignJWT({ user: 'admin' })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('24h') // 24 saat geçerli
        .sign(secret);

      const response = NextResponse.json({ success: true }, { status: 200 });

      // Token'i güvenli (HttpOnly) bir çerez olarak tarayıcıya ekle
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 gün (saniye cinsinden)
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Kullanıcı adı veya şifre hatalı' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
