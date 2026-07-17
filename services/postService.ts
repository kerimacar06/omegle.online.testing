import { connectMongoDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { getFromCache, setInCache } from '@/lib/ramCache';

interface PostDoc {
  _id: string;
  title: string;
  slug: string;
  breadcrumb?: string;
  description?: string;
  coverImage?: string;
  content?: string;
  alternativeAppsContent?: string;
  rating: number;
  voteCount: number;
  pros: string[];
  cons: string[];
  author: string;
  authorImage: string;
  faqs: { question?: string; answer?: string }[];
  status: 'Published' | 'Draft';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// getPostBySlug'da negatif cache için işaret değeri — var olmayan bir slug'ı
// "bulunamadı" olarak kısa süreli cache'lemek için kullanılıyor.
const NOT_FOUND = Symbol('post_not_found');

export const postService = {
  /**
   * Admin paneli veya API için tüm postları getirir
   */
  async getAllPosts() {
    try {
      const cacheKey = 'all_admin_posts';
      let posts = getFromCache<PostDoc[]>(cacheKey);
      
      if (!posts) {
        await connectMongoDB();
        posts = await Post.find().sort({ createdAt: -1 }).lean();
        if (posts) setInCache(cacheKey, posts, 300);
      }
      return posts || [];
    } catch (error) {
      console.error("Tüm postlar çekilemedi:", error);
      return [];
    }
  },

  /**
   * Admin paneli için sadece silinmemiş (aktif) postları getirir
   */
  async getActivePosts() {
    try {
      const cacheKey = 'admin_active_posts';
      let posts = getFromCache<PostDoc[]>(cacheKey);
      
      if (!posts) {
        await connectMongoDB();
        posts = await Post.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
        if (posts) setInCache(cacheKey, posts, 300);
      }
      return posts || [];
    } catch (error) {
      console.error("Aktif postlar çekilemedi:", error);
      return [];
    }
  },

  /**
   * Çöp kutusundaki (silinmiş) postları getirir
   */
  async getDeletedPosts() {
    try {
      const cacheKey = 'admin_deleted_posts';
      let posts = getFromCache<PostDoc[]>(cacheKey);
      
      if (!posts) {
        await connectMongoDB();
        posts = await Post.find({ isDeleted: true }).sort({ updatedAt: -1 }).lean();
        if (posts) setInCache(cacheKey, posts, 300);
      }
      return posts || [];
    } catch (error) {
      console.error("Çöp kutusu çekilemedi:", error);
      return [];
    }
  },


  /**
   * Yayında olan (Draft veya Deleted olmayan) postları getirir (Apps sayfası için)
   * En son eklenen post en üstte olacak şekilde tarihe göre azalan sırada listelenir.
   */
  async getPublishedPosts() {
    try {
      const cacheKey = 'all_apps_posts';
      let posts = getFromCache<PostDoc[]>(cacheKey);

      if (!posts) {
        await connectMongoDB();
        // Sadece yayında olanları (Draft veya Deleted olmayanları) buluruz.
        posts = await Post.find({ status: { $ne: 'Draft' }, isDeleted: { $ne: true } })
          .sort({ createdAt: -1 })
          .lean();
        if (posts) setInCache(cacheKey, posts, 300);
      }
      return posts || [];
    } catch (error) {
      console.error("Yayındaki postlar çekilemedi:", error);
      return [];
    }
  },

  /**
   * Ana sayfa "Top Omegle Alternatives" bölümü için en yüksek puanlı postları getirir
   * (eşit puanlarda en yeni eklenen post önce gelir).
   */
  async getLatestPosts(limit: number = 6) {
    const cacheKey = `home_alternatives_${limit}`;
    const cached = getFromCache<{ posts: PostDoc[]; totalCount: number }>(cacheKey);
    if (cached) return cached;

    try {
      await connectMongoDB();
      const query = { status: { $ne: 'Draft' }, isDeleted: { $ne: true } };
      const totalCount = await Post.countDocuments(query);
      const posts = await Post.find(query).sort({ rating: -1, createdAt: -1 }).limit(limit).lean();
      
      const result = { posts, totalCount };
      setInCache(cacheKey, result, 300);
      return result;
    } catch (error) {
      console.error("Son postlar çekilemedi:", error);
      return { posts: [], totalCount: 0 };
    }
  },

  /**
   * Slug değerine göre post getirir (Detay sayfası için)
   */
  async getPostBySlug(slug: string) {
    const cacheKey = `post_detail_${slug}`;
    const cached = getFromCache<PostDoc | typeof NOT_FOUND>(cacheKey);
    if (cached) return cached === NOT_FOUND ? null : cached;

    try {
      await connectMongoDB();
      const post = await Post.findOne({ slug }).lean();
      // Var olmayan slug'lar için de kısa süreli (negatif) cache: aksi halde
      // rastgele/var olmayan URL'lere yapılan istekler her seferinde DB'ye gider
      // (cache-miss loop) ve veritabanını gereksiz yere yorabilir.
      setInCache(cacheKey, post ?? NOT_FOUND, post ? 300 : 60);
      return post;
    } catch (error) {
      console.error(`Post çekilemedi (${slug}):`, error);
      return null;
    }
  },

  /**
   * Yeni post ekler
   */
  async createPost(data: Record<string, unknown>) {
    await connectMongoDB();
    return await Post.create(data);
  },

  /**
   * ID değerine göre post getirir
   */
  async getPostById(id: string) {
    const cacheKey = `post_id_${id}`;
    let post = getFromCache<PostDoc>(cacheKey);
    
    if (!post) {
      await connectMongoDB();
      post = await Post.findById(id).lean();
      if (post) setInCache(cacheKey, post, 300);
    }
    return post;
  },

  /**
   * Postu günceller
   */
  async updatePost(id: string, data: Record<string, unknown>) {
    await connectMongoDB();
    return await Post.findByIdAndUpdate(id, data, { new: true });
  },

  /**
   * Postu geçici olarak siler (çöp kutusuna atar)
   */
  async softDeletePost(id: string) {
    await connectMongoDB();
    return await Post.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  },

  /**
   * Çöp kutusundaki postu geri yükler
   */
  async restorePost(id: string) {
    await connectMongoDB();
    return await Post.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
  },

  /**
   * Postu kalıcı olarak siler
   */
  async permanentDeletePost(id: string) {
    await connectMongoDB();
    return await Post.findByIdAndDelete(id);
  }
};
