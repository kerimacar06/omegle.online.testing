import Link from 'next/link';
import { connectMongoDB } from '@/lib/mongodb';
import Post from '@/models/Post';

// Veritabanından postları çeken fonksiyon
async function getLatestPosts(showAll: boolean) {
  try {
    await connectMongoDB();
    if (showAll) {
      return await Post.find({}).sort({ createdAt: -1 });
    } else {
      return await Post.find({}).sort({ createdAt: -1 }).limit(4);
    }
  } catch (error) {
    console.error("Ana sayfa postları çekilemedi:", error);
    return [];
  }
}

export default async function Alternatives({ showAll = false }: { showAll?: boolean }) {
  const posts = await getLatestPosts(showAll);

  // Renkli yedek ikonlar için gradyan dizisi
  const gradients = [
    'from-pink-500 to-purple-500',
    'from-blue-500 to-teal-400',
    'from-amber-400 to-orange-500',
    'from-indigo-500 to-blue-600',
    'from-emerald-400 to-green-500'
  ];

  // Eğer veritabanında hiç post yoksa bu bölümü ana sayfada hiç gösterme
  if (posts.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      
      {/* Bölüm Başlığı */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Top Omegle Alternatives</h2>
        <p className="text-gray-500 text-lg">Check out the best random video chat platforms.</p>
      </div>

      {/* Dinamik Kartlar (4 Adet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => {
          const color = gradients[index % gradients.length];
          
          return (
            <Link key={post._id.toString()} href={`/apps/${post.slug}`} className="group">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full justify-between group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300">
                <div className="flex gap-4 items-start mb-4">
                  
                  {/* Resim veya İkon */}
                  {post.coverImage ? (
                    <div className="w-14 h-14 rounded-xl shrink-0 group-hover:scale-110 transition-transform overflow-hidden shadow-sm border border-gray-100">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  )}

                  {/* Metinler */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="text-amber-500 text-sm font-bold">★ {post.rating} / 5</div>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-2 flex justify-end text-blue-500 font-bold text-sm">
                  Read Full Review &rarr;
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Tümünü Gör Butonu */}
      {!showAll && posts.length >= 4 && (
        <div className="text-center mt-10">
          <Link href="?showAll=true" scroll={false} className="inline-block bg-white text-gray-800 font-bold border border-gray-200 px-8 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
            View All Applications
          </Link>
        </div>
      )}

    </div>
  );
}