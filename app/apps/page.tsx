import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';
import { postService } from '@/services/postService';
import AppsList from '@/components/AppsList';
import { resolveCanonical } from '@/lib/canonical';

export const dynamic = 'force-dynamic';

// 1. YENİ: SEO (Meta Tag) Üretici Fonksiyon
// Bu fonksiyon sayfa yüklenmeden önce çalışır ve sekmeye adını (Title) verir.
export async function generateMetadata(props: any) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page, 10);
  const canonicalPath = page && page > 1 ? `/apps?page=${page}` : '/apps';

  const seoData = await seoService.getSeoData('apps');

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: resolveCanonical(canonicalPath, page && page > 1 ? null : seoData.canonicalUrl),
      },
      robots: seoData.robots,
    };
  }

  return {
    title: 'Omegle Alternatives & Reviews',
    description: 'Expert reviews for the best random chat platforms.',
    alternates: {
      canonical: resolveCanonical(canonicalPath),
    },
  };
}



// Veritabanından postları çeken fonksiyon
async function getPosts() {
  return await postService.getPublishedPosts();
}

const POSTS_PER_PAGE = 12;

export default async function AppsPage(props: any) {
  const searchParams = await props.searchParams;
  const posts = await getPosts();
  const seoData = await seoService.getSeoData('apps');
  const jsonLd = seoData?.jsonLd || null;

  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Omegle Alternatives';

  // Otomatik Breadcrumb JSON-LD
  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: 'Omegle Test Online', url: 'https://omegletest.online' },
    { name: breadcrumbName, url: 'https://omegletest.online/apps' }
  ]);

  const serializedPosts = posts.map((post: any) => ({
    _id: post._id.toString(),
    slug: post.slug,
    title: post.title,
    description: post.description,
    coverImage: post.coverImage,
    rating: post.rating,
    voteCount: post.voteCount,
    createdAt: post.createdAt ? post.createdAt.toString() : undefined,
  }));

  const totalPages = Math.max(1, Math.ceil(serializedPosts.length / POSTS_PER_PAGE));
  const requestedPage = parseInt(searchParams?.page, 10);
  const currentPage = Math.min(Math.max(requestedPage || 1, 1), totalPages);
  const paginatedPosts = serializedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      {/* YENİ: JSON-LD Entegrasyonu */}
      {/* Eğer admin panelinden JSON kod yapıştırdıysan, bu kod onu Google botlarına okutur */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/60 to-purple-50/50 flex flex-col">
        <Navbar />

        {/* HEADER BÖLÜMÜ */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-8 pb-12">
          {/* Visual Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-900">{breadcrumbName}</span>
          </div>

          {/* Cam Panel: ChatStarter ile aynı görsel dil */}
          <div className="relative bg-gray-50/70 backdrop-blur-2xl p-6 sm:p-8 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-white/60 border border-gray-200 text-center max-w-xl mx-auto">
            <p className="text-gray-500 text-base md:text-lg font-medium max-w-xl mx-auto mb-6 leading-relaxed">
              Expert reviews for the best random chat platforms — compare features, ratings, and real user feedback.
            </p>

            <Link
              href="/live-video"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg border border-blue-700/20"
            >
              <svg className="w-5 h-5 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
              </svg>
              Start Video Chat
            </Link>
          </div>

          {/* Başlık: Kutunun dışında, altında, ortalanmış */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold md:font-extrabold text-gray-900 text-center mt-10 leading-tight">
            Discover the Best Omegle Alternatives
          </h1>
        </div>

        {/* LİSTE BÖLÜMÜ */}
        <div className="w-full flex-grow">
          <div className="w-full max-w-5xl mx-auto px-4 py-10 sm:py-16">
            <AppsList posts={paginatedPosts} currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}