import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { getJwtSecretKey } from '@/lib/auth';
import { isRateLimited, recordFailedAttempt, clearAttempts } from '@/lib/rateLimit';

// Reverse proxy arkasında (Vercel, Nginx vb.) gerçek istemci IP'si bu başlıklarda gelir;
// yoksa (ör. yerel geliştirme) tüm istekler tek bir anahtar altında sınırlanır.
function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  const rateLimit = isRateLimited(clientIp);
  if (rateLimit.limited) {
    return NextResponse.json(
      { error: `Çok fazla başarısız giriş denemesi. Lütfen ${Math.ceil((rateLimit.retryAfterSeconds || 0) / 60)} dakika sonra tekrar deneyin.` },
      { status: 429 }
    );
  }

  try {
    const { username, password } = await request.json();

    const correctUsername = process.env.ADMIN_USERNAME;
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (username === correctUsername && password === correctPassword) {
      clearAttempts(clientIp);
      const secret = getJwtSecretKey();

      const alg = 'HS256';
      const token = await new SignJWT({ user: 'admin' })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('24h') // 24 saat geçerli
        .sign(secret);

      const response = NextResponse.json({ success: true }, { status: 200 });

      // httpOnly: JS ile okunamaz (XSS'e karşı); secure sadece production'da
      // zorlanır çünkü local'de HTTPS olmayabilir
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 gün (saniye)
        path: '/',
      });

      return response;
    } else {
      recordFailedAttempt(clientIp);
      return NextResponse.json({ error: 'Kullanıcı adı veya şifre hatalı' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
