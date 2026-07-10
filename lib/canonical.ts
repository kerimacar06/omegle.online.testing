export const SITE_URL = "https://omegletest.online";

/**
 * Canonical URL'i her zaman kendi domainimize göre üretir. Admin panelinden
 * girilen canonicalUrl sadece SITE_URL ile başlıyorsa (yani gerçekten bizim
 * sitemize ait bir path'se) geçerli sayılır — böylece yanlışlıkla farklı bir
 * domain (ör. örnek alınan bir site) canonical olarak ayarlanamaz.
 */
export function resolveCanonical(path: string, override?: string | null): string {
  if (override && override.startsWith(SITE_URL)) {
    return override;
  }
  return `${SITE_URL}${path}`;
}
