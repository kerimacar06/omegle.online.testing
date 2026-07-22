import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';
import { postService } from '@/services/postService';
import AppsList from '@/components/AppsList';
import SiteBackground from '@/components/SiteBackground';
import { resolveCanonical, getSiteUrl } from '@/lib/canonical';

export const dynamic = 'force-dynamic';

type AppsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

interface AppsPost {
  _id: { toString(): string };
  slug: string;
  title: string;
  description?: string;
  coverImage?: string;
  rating?: number;
  voteCount?: number;
  createdAt?: { toString(): string } | string;
}

export async function generateMetadata(props: AppsPageProps) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || '', 10);
  const canonicalPath = page && page > 1 ? `/apps?page=${page}` : '/apps';

  const seoData = await seoService.getSeoData('apps');

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: await resolveCanonical(canonicalPath, page && page > 1 ? null : seoData.canonicalUrl),
      },
      robots: seoData.robots,
    };
  }

  return {
    title: 'Omegle Alternatives & Reviews',
    description: 'Expert reviews for the best random chat platforms.',
    alternates: {
      canonical: await resolveCanonical(canonicalPath),
    },
  };
}



async function getPosts() {
  return await postService.getPublishedPosts();
}

const POSTS_PER_PAGE = 12;

export default async function AppsPage(props: AppsPageProps) {
  const searchParams = await props.searchParams;
  const posts = await getPosts();
  const seoData = await seoService.getSeoData('apps');
  const jsonLd = await seoService.getSeoJsonLd('apps');
  const homeSeoData = await seoService.getSeoData('home');
  const siteUrl = await getSiteUrl();

  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Omegle Alternatives';
  const homeBreadcrumbName = homeSeoData?.breadcrumb && homeSeoData.breadcrumb.trim() !== "" ? homeSeoData.breadcrumb : 'Home';

  // Otomatik Breadcrumb JSON-LD
  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: homeBreadcrumbName, url: siteUrl },
    { name: breadcrumbName, url: `${siteUrl}/apps` }
  ]);

  const serializedPosts = posts.map((post: AppsPost) => ({
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
  const requestedPage = parseInt(searchParams?.page || '', 10);
  const currentPage = Math.min(Math.max(requestedPage || 1, 1), totalPages);
  const paginatedPosts = serializedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      {/* Admin panelinden yapıştırılan JSON-LD kodu varsa arama motorlarına sun */}
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

      <main className="relative min-h-screen bg-neon-bg neon-page flex flex-col">
        <SiteBackground />
        <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />

        {/* HEADER BÖLÜMÜ */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-8 pb-12">
          {/* Visual Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neon-ink-3 mb-8 font-medium">
            <Link href="/" className="hover:text-neon-cyan transition-colors">{homeBreadcrumbName}</Link>
            <span>›</span>
            <span className="text-neon-ink">{breadcrumbName}</span>
          </div>

          {/* Cam Panel: ChatStarter ile aynı görsel dil */}
          <div className="relative bg-neon-surface/70 backdrop-blur-2xl p-6 sm:p-8 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.4)] ring-1 ring-white/5 border border-neon-line text-center max-w-xl mx-auto">
            <p className="text-neon-ink-2 text-base md:text-lg font-medium max-w-xl mx-auto mb-6 leading-relaxed">
              Expert reviews for the best random chat platforms — compare features, ratings, and real user feedback.
            </p>

            <Link
              href="/live-video"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-violet text-neon-bg font-bold py-3 px-6 rounded-md transition-transform duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg neon-pulse-glow"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
              </svg>
              Start Video Chat
            </Link>
          </div>

          {/* Başlık: Kutunun dışında, altında, ortalanmış */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold md:font-extrabold text-neon-ink text-center mt-10 leading-tight">
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
        </div>
      </main>
    </>
  );
}