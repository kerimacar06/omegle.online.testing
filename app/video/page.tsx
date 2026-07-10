import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';
import { resolveCanonical } from '@/lib/canonical';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await seoService.getSeoData('video');
  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: { canonical: resolveCanonical('/video', seoData.canonicalUrl) },
      robots: seoData.robots,
    };
  }
  return {
    title: 'Video Chat | omegletest.online',
    description: 'Start a free, anonymous live video chat with strangers worldwide on omegletest.online.',
    alternates: { canonical: resolveCanonical('/video') },
  };
}

function ChatVideoScreen() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Live Video Chat
        </h1>
        <p className="text-gray-400 text-lg">
          Connecting to camera... Please ensure you have granted camera and microphone permissions.
        </p>
        <div className="w-full aspect-video bg-black/40 rounded-2xl border border-gray-800 flex items-center justify-center shadow-inner">
          <svg className="w-16 h-16 text-gray-600 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}



export default async function VideoPage() {
  const seoData = await seoService.getSeoData('video');
  const jsonLd = seoData?.jsonLd || null;
  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Video Chat';

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: 'Omegle Test Online', url: 'https://omegletest.online' },
    { name: breadcrumbName, url: 'https://omegletest.online/video' }
  ]);

  return (
    <>
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
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Navbar />
        <div className="w-full max-w-4xl mx-auto px-4 pt-8 bg-gray-900">
          {/* Visual Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium pb-4">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">{breadcrumbName}</span>
          </div>
        </div>
        <ChatVideoScreen />
        <Footer />
      </main>
    </>
  );
}