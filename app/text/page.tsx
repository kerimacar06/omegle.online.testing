import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await seoService.getSeoData('text');
  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: { canonical: seoData.canonicalUrl },
      robots: seoData.robots,
    };
  }
  return { title: 'Text Chat | omegletest.online' };
}

function ChatTextScreen() {
  return (
    <div className="flex-grow flex flex-col max-w-4xl mx-auto w-full px-4 py-8 justify-between h-[calc(100vh-160px)]">
      {/* Mesajların Görüntülendiği Alan */}
      <div className="flex-grow bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col justify-end overflow-y-auto">
        <div className="text-center text-gray-400 py-12">
          <p className="font-semibold text-gray-600">Looking for someone to chat with...</p>
          <span className="text-xs">Waiting for a stranger to join the conversation.</span>
        </div>
      </div>

      {/* Mesaj Yazma ve Gönderme Alanı */}
      <div className="flex gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}



export default async function TextPage() {
  const seoData = await seoService.getSeoData('text');
  const jsonLd = seoData?.jsonLd || null;
  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Text Chat';

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: 'Omegle Test Online', url: 'https://omegletest.online' },
    { name: breadcrumbName, url: 'https://omegletest.online/text' }
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
        <div className="w-full max-w-4xl mx-auto px-4 pt-8">
          {/* Visual Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-900">{breadcrumbName}</span>
          </div>
        </div>
        <ChatTextScreen />
        <Footer />
      </main>
    </>
  );
}