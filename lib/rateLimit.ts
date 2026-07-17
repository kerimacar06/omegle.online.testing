type Attempt = { count: number; firstAttempt: number };

// ramCache.ts'teki aynı desen: dev'de hot-reload'da sıfırlanmasın diye globalThis kullanılıyor.
const globalForRateLimit = globalThis as unknown as {
  loginAttempts: Map<string, Attempt> | undefined;
};

const attempts = globalForRateLimit.loginAttempts ?? new Map<string, Attempt>();
if (process.env.NODE_ENV !== "production") globalForRateLimit.loginAttempts = attempts;

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 dakika

/**
 * Verilen anahtar (ör. IP adresi) son WINDOW_MS içinde MAX_ATTEMPTS'i aştıysa
 * true döner. Admin login için basit brute-force koruması.
 */
export function isRateLimited(key: string): { limited: boolean; retryAfterSeconds?: number } {
  const entry = attempts.get(key);
  if (!entry) return { limited: false };

  const elapsed = Date.now() - entry.firstAttempt;
  if (elapsed > WINDOW_MS) {
    attempts.delete(key);
    return { limited: false };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { limited: true, retryAfterSeconds: Math.ceil((WINDOW_MS - elapsed) / 1000) };
  }

  return { limited: false };
}

export function recordFailedAttempt(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttempt: now });
  } else {
    entry.count += 1;
  }
}

export function clearAttempts(key: string) {
  attempts.delete(key);
}
