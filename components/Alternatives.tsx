import Link from 'next/link';
import { postService } from '@/services/postService';
import AlternativesShelf from './AlternativesShelf';

interface AlternativePost {
  _id: { toString(): string };
  slug: string;
  title?: string;
  coverImage?: string;
  rating?: number;
  voteCount?: number;
}

async function getLatestPosts() {
  return await postService.getLatestPosts(10);
}

export default async function Alternatives() {
  const { posts, totalCount } = await getLatestPosts();

  if (posts.length === 0) return null;

  const serializedPosts = posts.map((post: AlternativePost) => ({
    _id: post._id.toString(),
    slug: post.slug,
    title: post.title,
    coverImage: post.coverImage,
    rating: post.rating,
    voteCount: post.voteCount,
  }));

  return (
    <div className="band-cream w-full py-10 sm:py-16 border-b border-v6-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Bölüm Başlığı */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="ch-display text-2xl sm:text-3xl md:text-4xl font-bold text-v6-ink leading-none mb-2">Top Omegle Alternatives</h2>
            <p className="text-v6-ink-2 text-xs sm:text-base">Check out the best random video chat platforms.</p>
          </div>
          {totalCount > 10 && (
            <Link href="/apps" scroll={true} className="hidden sm:inline-flex ch-btn-outline text-v6-ink font-bold px-5 py-2.5 shrink-0">
              View All
            </Link>
          )}
        </div>

        {/* Yatay kaydırılabilir raf (shelf) — ok tuşlarıyla, kart grid'i yerine film şeridi */}
        <AlternativesShelf posts={serializedPosts} />

        {/* Mobilde Tümünü Gör Butonu */}
        {totalCount > 10 && (
          <div className="text-center mt-8 sm:hidden">
            <Link href="/apps" scroll={true} className="ch-btn-outline inline-block text-v6-ink font-bold px-8 py-3">
              View All Applications
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
