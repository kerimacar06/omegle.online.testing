// app/ altındaki sabit route segmentleri — bir post bu isimlerden birini slug olarak
// alırsa, Next.js her zaman sabit route'u önceliklendirir ve post [slug] altında
// sessizce erişilemez hale gelir (hata değil, ama içerik "kaybolmuş" gibi görünür).
export const RESERVED_SLUGS = [
  "admin",
  "api",
  "apps",
  "contact",
  "privacy",
  "terms",
  "live-text",
  "live-video",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
];

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.includes(slug.trim().toLowerCase());
}
