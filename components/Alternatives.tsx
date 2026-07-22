import Link from 'next/link';
import Image from 'next/image';
import { postService } from '@/services/postService';

interface AlternativePost {
  _id: { toString(): string };
  slug: string;
  title?: string;
  coverImage?: string;
  rating?: number;
  voteCount?: number;
}

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

  if (posts.length === 0) return null;

  return (
    <div className="w-full py-8 sm:py-12">
      <div className="w-full max-w-5xl mx-auto px-4">
        
        {/* Bölüm Başlığı */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold md:font-extrabold text-neon-ink mb-2 leading-none">Top Omegle Alternatives</h2>
          <p className="text-neon-ink-2 text-xs sm:text-lg font-medium leading-none">Check out the best random video chat platforms.</p>
        </div>

        {/* Dinamik Kartlar: mobilde 1x6 (tam genişlik, yatay kart), masaüstünde 3'lü grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-3">
          {posts.map((post: AlternativePost, index: number) => {
            const color = gradients[index % gradients.length];
            const voteCount = (post.voteCount || 0).toLocaleString('en-US');
            const ratingValue = Number(post.rating) || 5;

            return (
              <Link key={post._id.toString()} href={`/${post.slug}`} className="group block h-full">
                <div className="neon-card p-3 sm:p-3 rounded-md flex items-center gap-4 sm:gap-3 h-full">

                  {/* Sol: Resim/İkon */}
                  <div className="shrink-0">
                    {post.coverImage ? (
                      <div className="relative w-16 h-16 sm:w-14 sm:h-14 rounded-md overflow-hidden border border-neon-line shadow-sm group-hover:scale-105 transition-transform">
                        <Image src={post.coverImage} alt={post.title || 'App Logo'} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className={`w-16 h-16 sm:w-14 sm:h-14 rounded-md bg-gradient-to-tr ${color} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                        <svg className="w-7 h-7 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Sağ: İsim, Yıldızlar, Oy Sayısı (üstten alta) */}
                  <div className="min-w-0 flex-1 flex flex-col gap-1 sm:gap-0.5">
                    <h3 className="text-base sm:text-base font-bold text-neon-ink group-hover:text-neon-cyan transition-colors truncate uppercase tracking-wide leading-none">
                      {post.slug}
                    </h3>

                    <div className="flex items-center gap-1 sm:gap-0.5 leading-none">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${star <= Math.round(ratingValue) ? 'text-amber-400' : 'text-neon-line'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-neon-ink-2 font-semibold text-sm sm:text-[11px] leading-none ml-1 sm:ml-0.5">
                        {ratingValue.toFixed(1)}
                      </span>
                    </div>

                    <div className="text-neon-ink-3 text-sm sm:text-[11px] font-medium leading-none">
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
            <Link href="/apps" scroll={true} className="inline-block bg-neon-surface-2 text-neon-ink font-bold border border-neon-line px-8 py-3 rounded-md hover:bg-neon-surface transition shadow-sm">
              View All Applications
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}