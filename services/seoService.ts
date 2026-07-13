import { connectMongoDB } from '@/lib/mongodb';
import Seo from '@/models/Seo';
import { getFromCache, setInCache } from '@/lib/ramCache';

interface SeoDoc {
  _id: string;
  pageName: string;
  pageKey: string;
  title: string;
  breadcrumb?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  robots: string;
  jsonLd?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const seoService = {
  /**
   * Belirli bir sayfanın SEO ayarlarını getirir
   * Cache mekanizmasıyla çalışır.
   */
  async getSeoData(pageKey: string) {
    try {
      const cacheKey = `seo_${pageKey}`;
      let seoData = getFromCache<SeoDoc>(cacheKey);
      
      if (!seoData) {
        await connectMongoDB();
        seoData = await Seo.findOne({ pageKey }).lean();
        if (seoData) setInCache(cacheKey, seoData, 300);
      }
      return seoData;
    } catch (error) {
      console.error(`SEO datası çekilemedi (${pageKey}):`, error);
      return null;
    }
  },

  /**
   * JSON-LD şemasını direkt döndürür. Admin panelinde nasıl biçimlendirilmiş
   * (girintili/düz) olursa olsun, sayfa kaynağında tüm sitede tutarlı olsun
   * diye tek satıra sıkıştırılmış (minified) olarak döner.
   */
  async getSeoJsonLd(pageKey: string) {
    const seoData = await this.getSeoData(pageKey);
    if (!seoData?.jsonLd) return null;
    try {
      return JSON.stringify(JSON.parse(seoData.jsonLd));
    } catch {
      return seoData.jsonLd;
    }
  },

  /**
   * Sayfa hiyerarşisi (Breadcrumb) için dinamik JSON-LD üretir
   * items dizisi: [{ name: "Ana Sayfa", url: "https://..." }, ...] şeklinde gelir.
   */
  generateBreadcrumbJsonLd(items: { name: string, url: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  },

  /**
   * Admin paneli için tüm SEO ayarlarını getirir
   */
  async getAllSeo() {
    const cacheKey = 'all_admin_seo';
    let seos = getFromCache<SeoDoc[]>(cacheKey);
    
    if (!seos) {
      await connectMongoDB();
      seos = await Seo.find({}).sort({ createdAt: -1 }).lean();
      if (seos) setInCache(cacheKey, seos, 300);
    }
    return seos || [];
  },

  /**
   * Yeni SEO ayarı ekler
   */
  async createSeo(data: Record<string, unknown>) {
    await connectMongoDB();
    return await Seo.create(data);
  },

  /**
   * ID'ye göre tekil SEO verisi getirir
   */
  async getSeoById(id: string) {
    const cacheKey = `seo_id_${id}`;
    let seo = getFromCache<SeoDoc>(cacheKey);
    
    if (!seo) {
      await connectMongoDB();
      seo = await Seo.findById(id).lean();
      if (seo) setInCache(cacheKey, seo, 300);
    }
    return seo;
  },

  /**
   * SEO verisini günceller
   */
  async updateSeo(id: string, data: Record<string, unknown>) {
    await connectMongoDB();
    return await Seo.findByIdAndUpdate(id, data, { new: true });
  },

  /**
   * SEO verisini kalıcı olarak siler
   */
  async deleteSeo(id: string) {
    await connectMongoDB();
    return await Seo.findByIdAndDelete(id);
  }
};
