type CacheItem<T = any> = {
  data: T;
  expiry: number;
};

// Global RAM cache using Map
// next.js dev modunda global değişkenlerin sıfırlanmasını ve farklı route'larda farklı instance'lar oluşmasını önlemek için globalThis kullanıyoruz
const globalForCache = globalThis as unknown as {
  ramCache: Map<string, CacheItem> | undefined
}

const cache = globalForCache.ramCache ?? new Map<string, CacheItem>();
if (process.env.NODE_ENV !== 'production') globalForCache.ramCache = cache;

const globalForGC = globalThis as unknown as { gcStarted: boolean };

// YENİ: Otomatik Çöp Toplayıcı (Garbage Collector) - Bellek Sızıntısını (Memory Leak) Önler
// Her 15 dakikada bir çalışır ve süresi dolmuş tüm verileri RAM'den temizler
if (!globalForGC.gcStarted) {
  globalForGC.gcStarted = true;
  setInterval(() => {
    const now = Date.now();
    let cleaned = 0;
    for (const [key, item] of cache.entries()) {
      if (now > item.expiry) {
        cache.delete(key);
        cleaned++;
      }
    }
    if (cleaned > 0) {
      console.log(`[RAM CACHE GC] ${cleaned} adet süresi dolmuş veri bellekten silindi.`);
    }
  }, 15 * 60 * 1000);
}

export const getFromCache = <T = any>(key: string): T | null => {
  const item = cache.get(key);
  if (!item) return null;
  
  // Süresi dolmuşsa sil ve null dön
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  
  console.log(`[RAM CACHE] Veri RAM'den okundu: ${key}`);
  return item.data as T;
};

// Varsayılan olarak 5 dakika (300 saniye) RAM'de tut
export const setInCache = <T = any>(key: string, data: T, ttlSeconds: number = 300) => {
  console.log(`[RAM CACHE] Veri RAM'e kaydedildi ve veritabanı yükü azaltıldı: ${key}`);
  cache.set(key, {
    data,
    expiry: Date.now() + ttlSeconds * 1000,
  });
};

export const clearCache = (keyPrefix?: string) => {
  if (!keyPrefix) {
    cache.clear();
  } else {
    for (const key of cache.keys()) {
      if (key.startsWith(keyPrefix)) {
        cache.delete(key);
      }
    }
  }
};
