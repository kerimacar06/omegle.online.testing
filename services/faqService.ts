import { connectMongoDB } from '@/lib/mongodb';
import Faq from '@/models/Faq';
import { getFromCache, setInCache } from '@/lib/ramCache';

export const faqService = {
  /**
   * Aktif olan FAQ (Sık Sorulan Sorular) kayıtlarını çeker
   */
  async getActiveFaqs() {
    try {
      let faqs = getFromCache('all_faqs_active');
      
      if (!faqs) {
        await connectMongoDB();
        faqs = await Faq.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
        if (faqs) setInCache('all_faqs_active', faqs, 300);
      }
      return faqs || [];
    } catch (error) {
      console.error("FAQ'lar çekilemedi:", error);
      return [];
    }
  },

  /**
   * FAQ verilerinden JSON-LD (Schema) üretir
   */
  async getFaqJsonLd() {
    const faqs = await this.getActiveFaqs();
    if (!faqs || faqs.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  },

  /**
   * Admin paneli için tüm FAQ kayıtlarını çeker
   */
  async getAllFaqs() {
    const cacheKey = 'all_admin_faqs';
    let faqs = getFromCache(cacheKey);
    
    if (!faqs) {
      await connectMongoDB();
      faqs = await Faq.find({}).sort({ order: 1, createdAt: -1 }).lean();
      if (faqs) setInCache(cacheKey, faqs, 300);
    }
    return faqs || [];
  },

  /**
   * ID'ye göre tekil FAQ getirir
   */
  async getFaqById(id: string) {
    const cacheKey = `faq_id_${id}`;
    let faq = getFromCache(cacheKey);
    
    if (!faq) {
      await connectMongoDB();
      faq = await Faq.findById(id).lean();
      if (faq) setInCache(cacheKey, faq, 300);
    }
    return faq;
  },

  /**
   * Yeni FAQ ekler
   */
  async createFaq(data: any) {
    await connectMongoDB();
    return await Faq.create(data);
  },

  /**
   * FAQ günceller
   */
  async updateFaq(id: string, data: any) {
    await connectMongoDB();
    return await Faq.findByIdAndUpdate(id, data, { new: true });
  },

  /**
   * FAQ siler
   */
  async deleteFaq(id: string) {
    await connectMongoDB();
    return await Faq.findByIdAndDelete(id);
  }
};
