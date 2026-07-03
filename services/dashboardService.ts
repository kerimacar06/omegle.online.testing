import { connectMongoDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import Faq from '@/models/Faq';
import Bot from '@/models/Bot';
import { getFromCache, setInCache } from '@/lib/ramCache';

export const dashboardService = {
  /**
   * Admin dashboard için genel istatistikleri çeker
   */
  async getDashboardStats() {
    try {
      const cacheKey = 'dashboard_stats';
      let stats = getFromCache(cacheKey);

      if (!stats) {
        await connectMongoDB();
        
        const [
          totalPosts, 
          publishedPosts, 
          draftPosts, 
          deletedPosts,
          totalFaqs,
          activeFaqs,
          totalBots,
          activeBots
        ] = await Promise.all([
          Post.countDocuments({ isDeleted: { $ne: true } }),
          Post.countDocuments({ status: { $ne: 'Draft' }, isDeleted: { $ne: true } }),
          Post.countDocuments({ status: 'Draft', isDeleted: { $ne: true } }),
          Post.countDocuments({ isDeleted: true }),
          Faq.countDocuments(),
          Faq.countDocuments({ isActive: true }),
          Bot.countDocuments(),
          Bot.countDocuments({ isActive: true })
        ]);

        stats = {
          posts: { total: totalPosts, published: publishedPosts, draft: draftPosts, deleted: deletedPosts },
          faqs: { total: totalFaqs, active: activeFaqs },
          bots: { total: totalBots, active: activeBots }
        };
        setInCache(cacheKey, stats, 300);
      }

      return stats;
    } catch (error) {
      console.error("Dashboard istatistikleri çekilemedi:", error);
      return {
        posts: { total: 0, published: 0, draft: 0, deleted: 0 },
        faqs: { total: 0, active: 0 },
        bots: { total: 0, active: 0 }
      };
    }
  }
};
