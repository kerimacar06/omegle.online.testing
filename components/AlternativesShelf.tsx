'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

interface AlternativePost {
  _id: string;
  slug: string;
  title?: string;
  coverImage?: string;
  rating?: number;
  voteCount?: number;
}

const gradients = [
  'from-pink-500 to-purple-500',
  'from-blue-500 to-teal-400',
  'from-amber-400 to-orange-500',
  'from-indigo-500 to-blue-600',
  'from-emerald-400 to-green-500'
];

export default function AlternativesShelf({ posts }: { posts: AlternativePost[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children[0] as HTMLElement | undefined;
    const step = item ? item.clientWidth + 16 : 240;
    track.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <div className="relative group">
      {/* Sol Ok */}
      <button
        type="button"
        onClick={() => scrollByAmount(-1)}
        aria-label="Scroll left"
        className="absolute left-1 md:left-0 md:-ml-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-v6-line shadow-md flex items-center justify-center text-v6-ink-2 hover:text-v6-coral hover:border-v6-coral/40 transition-colors touch-manipulation"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>

      {/* Yatay kaydırılabilir raf (shelf) */}
      <div ref={trackRef} className="shelf-track -mx-4 px-4 sm:mx-0 sm:px-1">
        {posts.map((post, index) => {
          const color = gradients[index % gradients.length];
          const voteCount = (post.voteCount || 0).toLocaleString('en-US');
          const ratingValue = Number(post.rating) || 5;

          return (
            <Link key={post._id} href={`/${post.slug}`} className="shelf-item group/card block shrink-0 w-[220px] sm:w-[240px]">
              <div className="bg-white rounded-2xl border border-v6-line overflow-hidden h-full hover:border-v6-coral/40 transition-colors">
                <div className="relative w-full h-28 sm:h-32 bg-v6-cream">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title || 'App Logo'} fill className="object-cover" unoptimized />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-tr ${color} flex items-center justify-center`}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-v6-ink group-hover/card:text-v6-coral transition-colors truncate uppercase tracking-wide">
                    {post.slug}
                  </h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-3 h-3 ${star <= Math.round(ratingValue) ? 'text-amber-400' : 'text-v6-line'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-v6-ink-3 text-xs ml-1">{ratingValue.toFixed(1)}</span>
                  </div>
                  <div className="text-v6-ink-3 text-xs mt-0.5">{voteCount} votes</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Sağ Ok */}
      <button
        type="button"
        onClick={() => scrollByAmount(1)}
        aria-label="Scroll right"
        className="absolute right-1 md:right-0 md:-mr-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-v6-line shadow-md flex items-center justify-center text-v6-ink-2 hover:text-v6-coral hover:border-v6-coral/40 transition-colors touch-manipulation"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
