import { connectMongoDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { getFromCache, setInCache } from '@/lib/ramCache';

export const postService = {
  /**
   * Admin paneli veya API için tüm postları getirir
   */
  async getAllPosts() {
    try {
      const cacheKey = 'all_admin_posts';
      let posts = getFromCache(cacheKey);
      
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
      let posts = getFromCache(cacheKey);
      
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
      let posts = getFromCache(cacheKey);
      
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
   */
  async getPublishedPosts() {
    try {
      const cacheKey = 'all_apps_posts';
      let posts = getFromCache(cacheKey);
      
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
   * Ana sayfa için en son 6 postu getirir
   */
  async getLatestPosts(limit: number = 6) {
    const cacheKey = `home_alternatives_${limit}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    try {
      await connectMongoDB();
      const query = { status: { $ne: 'Draft' }, isDeleted: { $ne: true } };
      const totalCount = await Post.countDocuments(query);
      const posts = await Post.find(query).sort({ createdAt: -1 }).limit(limit).lean();
      
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
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    try {
      await connectMongoDB();
      const post = await Post.findOne({ slug }).lean();
      if (post) setInCache(cacheKey, post, 300);
      return post;
    } catch (error) {
      console.error(`Post çekilemedi (${slug}):`, error);
      return null;
    }
  },

  /**
   * Yeni post ekler
   */
  async createPost(data: any) {
    await connectMongoDB();
    return await Post.create(data);
  },

  /**
   * ID değerine göre post getirir
   */
  async getPostById(id: string) {
    const cacheKey = `post_id_${id}`;
    let post = getFromCache(cacheKey);
    
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
  async updatePost(id: string, data: any) {
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
