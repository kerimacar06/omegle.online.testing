import { connectMongoDB } from '@/lib/mongodb';
import Seo from '@/models/Seo';
import { getFromCache, setInCache } from '@/lib/ramCache';

export const seoService = {
  /**
   * Belirli bir sayfanın SEO ayarlarını getirir
   * Cache mekanizmasıyla çalışır.
   */
  async getSeoData(pageKey: string) {
    try {
      const cacheKey = `seo_${pageKey}`;
      let seoData = getFromCache(cacheKey);
      
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
   * JSON-LD şemasını direkt döndürür
   */
  async getSeoJsonLd(pageKey: string) {
    const seoData = await this.getSeoData(pageKey);
    return seoData?.jsonLd || null;
  },

  /**
   * Admin paneli için tüm SEO ayarlarını getirir
   */
  async getAllSeo() {
    const cacheKey = 'all_admin_seo';
    let seos = getFromCache(cacheKey);
    
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
  async createSeo(data: any) {
    await connectMongoDB();
    return await Seo.create(data);
  },

  /**
   * ID'ye göre tekil SEO verisi getirir
   */
  async getSeoById(id: string) {
    const cacheKey = `seo_id_${id}`;
    let seo = getFromCache(cacheKey);
    
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
  async updateSeo(id: string, data: any) {
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
