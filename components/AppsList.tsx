'use client';

import Link from 'next/link';

type Post = {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  coverImage?: string;
  rating?: number;
  voteCount?: number;
  createdAt?: string;
};

const gradients = [
  'from-pink-500 to-purple-500',
  'from-blue-500 to-teal-400',
  'from-amber-400 to-orange-500',
  'from-indigo-500 to-blue-600',
  'from-emerald-400 to-green-500'
];

export default function AppsList({
  posts,
  currentPage = 1,
  totalPages = 1,
}: {
  posts: Post[];
  currentPage?: number;
  totalPages?: number;
}) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-md shadow-sm border border-gray-100">
        <p className="text-gray-500 text-lg">Henüz hiç uygulama eklenmemiş. Lütfen admin panelinden yeni bir Post ekleyin.</p>
      </div>
    );
  }

  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      {posts.map((post, index) => {
        const color = gradients[index % gradients.length];
        const voteCount = post.voteCount || 0;
        const rating = post.rating || 5;

        return (
          <Link key={post._id} href={`/${post.slug}`} className="group block h-full">
            <div className="bg-white rounded sm:rounded-md border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-300">

              {/* Kapak Görseli: object-cover ile tüm fotoğraflar çerçeveyi eşit doldurur */}
              <div className="w-full h-24 sm:h-36 md:h-44 relative overflow-hidden bg-gray-100 shrink-0 border-b border-gray-100">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${color} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                    <svg className="w-8 h-8 sm:w-14 sm:h-14 text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* İçerik */}
              <div className="p-2.5 sm:p-5 flex flex-col flex-grow">
                <h2 className="text-xs sm:text-base font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight min-h-[1.875rem] sm:min-h-[2.5rem]">
                  {post.title}
                </h2>

                {post.description && (
                  <p className="hidden sm:block text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
                    {post.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] sm:text-xs font-medium text-gray-500 mb-2 sm:mb-4 pt-1.5 sm:pt-3 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 font-semibold ml-0.5">{rating.toFixed(1)}</span>
                  </div>
                  <span>{voteCount.toLocaleString('en-US')} votes</span>
                </div>

                <div className="w-full bg-blue-600 group-hover:bg-blue-700 text-white text-center py-1.5 sm:py-2.5 rounded sm:rounded-md font-bold text-[11px] sm:text-sm transition-colors duration-300 shadow-sm">
                  Read Review
                </div>
              </div>

            </div>
          </Link>
        );
      })}
    </div>

    {totalPages > 1 && (
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-12">
        <Link
          href={currentPage > 1 ? `/apps?page=${currentPage - 1}` : '#'}
          aria-disabled={currentPage <= 1}
          className={`px-3 py-2 rounded-md border text-sm font-medium transition ${
            currentPage <= 1
              ? 'border-gray-200 text-gray-300 pointer-events-none'
              : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
          }`}
        >
          Prev
        </Link>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`/apps?page=${page}`}
            className={`w-9 h-9 flex items-center justify-center rounded-md border text-sm font-bold transition ${
              page === currentPage
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        ))}

        <Link
          href={currentPage < totalPages ? `/apps?page=${currentPage + 1}` : '#'}
          aria-disabled={currentPage >= totalPages}
          className={`px-3 py-2 rounded-md border text-sm font-medium transition ${
            currentPage >= totalPages
              ? 'border-gray-200 text-gray-300 pointer-events-none'
              : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
          }`}
        >
          Next
        </Link>
      </div>
    )}
    </>
  );
}
