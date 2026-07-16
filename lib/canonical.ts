import { headers } from 'next/headers';

/**
 * İstek başlıklarından (host + protokol) sitenin o anki tam adresini otomatik
 * olarak türetir. Böylece domain değişse bile (ör. henüz domain yokken
 * localhost, ileride gerçek bir domain) kodda hiçbir yer güncellenmesine
 * gerek kalmaz — adres her zaman isteğin geldiği host'tan okunur.
 */
export async function getSiteUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const forwardedProto = headersList.get('x-forwarded-proto');
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  const protocol = forwardedProto ?? (isLocal ? 'http' : 'https');
  return `${protocol}://${host}`;
}

/**
 * Canonical URL'i her zaman o anki siteUrl'e göre üretir. Admin panelinden
 * girilen canonicalUrl sadece siteUrl ile başlıyorsa (yani gerçekten bizim
 * sitemize ait bir path'se) geçerli sayılır — böylece yanlışlıkla farklı bir
 * domain (ör. örnek alınan bir site) canonical olarak ayarlanamaz.
 */
export async function resolveCanonical(path: string, override?: string | null): Promise<string> {
  const siteUrl = await getSiteUrl();
  if (override && override.startsWith(siteUrl)) {
    return override;
  }
  return `${siteUrl}${path}`;
}
