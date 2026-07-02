import { connectMongoDB } from '@/lib/mongodb';
import Bot from '@/models/Bot';
import { getFromCache, setInCache } from '@/lib/ramCache';

export const botService = {
  /**
   * Admin paneli için tüm bot kayıtlarını çeker
   */
  async getAllBots() {
    const cacheKey = 'all_admin_bots';
    let bots = getFromCache(cacheKey);
    
    if (!bots) {
      await connectMongoDB();
      bots = await Bot.find({}).sort({ createdAt: -1 }).lean();
      if (bots) setInCache(cacheKey, bots, 300);
    }
    return bots || [];
  },

  /**
   * Yeni bot ekler
   */
  async createBot(data: any) {
    await connectMongoDB();
    return await Bot.create(data);
  },

  /**
   * ID'ye göre tekil bot getirir
   */
  async getBotById(id: string) {
    const cacheKey = `bot_id_${id}`;
    let bot = getFromCache(cacheKey);
    
    if (!bot) {
      await connectMongoDB();
      bot = await Bot.findById(id).lean();
      if (bot) setInCache(cacheKey, bot, 300);
    }
    return bot;
  },

  /**
   * Bot günceller
   */
  async updateBot(id: string, data: any) {
    await connectMongoDB();
    return await Bot.findByIdAndUpdate(id, data, { new: true });
  },

  /**
   * Bot siler
   */
  async deleteBot(id: string) {
    await connectMongoDB();
    return await Bot.findByIdAndDelete(id);
  },

  /**
   * Rastgele aktif bot getirir (Tamamen RAM'den!)
   */
  async getRandomActiveBot() {
    const cacheKey = 'all_active_bots';
    let activeBots = getFromCache(cacheKey);
    
    // Eğer RAM'de aktif botlar yoksa, Mongo'dan çek ve RAM'e kaydet
    if (!activeBots) {
      await connectMongoDB();
      activeBots = await Bot.find({ status: "Active" }).lean();
      if (activeBots) setInCache(cacheKey, activeBots, 300);
    }
    
    // RAM'deki listeden rastgele 1 tanesini seç
    if (activeBots && activeBots.length > 0) {
      const randomIndex = Math.floor(Math.random() * activeBots.length);
      return activeBots[randomIndex];
    }
    
    return null;
  }
};

