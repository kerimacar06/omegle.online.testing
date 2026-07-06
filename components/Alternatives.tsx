import Link from 'next/link';
import Image from 'next/image';
import { postService } from '@/services/postService';

// Veritabanından postları çeken fonksiyon
async function getLatestPosts() {
  return await postService.getLatestPosts(6);
}

export default async function Alternatives() {
  const { posts, totalCount } = await getLatestPosts();

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
    <div className="w-full bg-white py-12">
      <div className="w-full max-w-5xl mx-auto px-4">
        
        {/* Bölüm Başlığı */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Top Omegle Alternatives</h2>
          <p className="text-gray-500 text-lg">Check out the best random video chat platforms.</p>
        </div>

        {/* Dinamik Kartlar (Grid Formatı) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post: any, index: number) => {
            const color = gradients[index % gradients.length];
            // Veritabanından gelen voteCount değerini kullan (yoksa 0)
            const voteCount = (post.voteCount || 0).toLocaleString('en-US');
            const ratingValue = Number(post.rating) || 5;
            
            return (
              <Link key={post._id.toString()} href={`/apps/${post.slug}`} className="group block">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-3 group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300">
                  
                  {/* Üst: Başlık */}
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-center w-full truncate">
                    {post.title}
                  </h3>

                  {/* Orta: Resim/İkon */}
                  <div className="shrink-0 mt-1 mb-2">
                    {post.coverImage ? (
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group-hover:scale-105 transition-transform mx-auto">
                        <Image src={post.coverImage} alt={post.title || 'App Logo'} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${color} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform mx-auto`}>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Alt: Yıldızlar */}
                  <div className="flex flex-col items-center gap-1.5 mt-1">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`w-4 h-4 ${star <= Math.round(ratingValue) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600 font-semibold text-sm">
                        ({ratingValue.toFixed(1)})
                      </span>
                    </div>

                    {/* En Alt: Oy Sayısı */}
                    <div className="text-gray-500 text-sm">
                      {voteCount} votes
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Tümünü Gör Butonu */}
        {totalCount > 6 && (
          <div className="text-center mt-10">
            <Link href="/apps" scroll={true} className="inline-block bg-white text-gray-800 font-bold border border-gray-200 px-8 py-3 rounded-lg hover:bg-gray-50 transition shadow-sm">
              View All Applications
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}