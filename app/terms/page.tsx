import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await seoService.getSeoData('terms');
  
  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: seoData.canonicalUrl,
      },
      robots: seoData.robots,
    };
  }
  
  return {
    title: 'Terms and Conditions - Omegle Test',
    description: 'Read the terms and conditions for using Omegletest.online.',
  };
}



export default async function TermsPage() {
  const seoData = await seoService.getSeoData('terms');
  const jsonLd = seoData?.jsonLd || null;

  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Terms of Service';

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: 'Omegle Test Online', url: 'https://omegletest.online' },
    { name: breadcrumbName, url: 'https://omegletest.online/terms' }
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
      <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* HEADER BÖLÜMÜ */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-12">
        {/* Visual Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-900">{breadcrumbName}</span>
        </div>

        {/* Sayfa Başlığı */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold md:font-extrabold text-gray-900 mb-3 leading-tight">
            Terms and Conditions
          </h1>
          <p className="text-gray-500 text-base sm:text-lg font-medium">
            Last updated: June 2026
          </p>
        </div>
      </div>

      {/* İÇERİK BÖLÜMÜ */}
      <div className="w-full bg-slate-100 border-t border-gray-100 flex-grow">
        <div className="w-full max-w-4xl mx-auto px-4 py-10 sm:py-16">

          {/* Metin Kutusu */}
          <div className="bg-white p-6 sm:p-10 rounded-md border border-gray-200 shadow-sm text-gray-700 text-base sm:text-lg [&_p]:text-justify">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-0">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed mb-8">
              By using Omegletest Online, you agree to these Terms and Conditions. If you don't agree, please don't use the service — it's that simple.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              2. Age Restriction
            </h2>
            <p className="leading-relaxed mb-8">
              You must be at least 18 years old to use this platform. By using it, you confirm you meet this requirement.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              3. User Conduct
            </h2>
            <p className="leading-relaxed mb-4">
              To keep the platform safe for everyone, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-8 leading-relaxed">
              <li>Share illegal, abusive, or explicit content.</li>
              <li>Harass, bully, or intimidate other users.</li>
              <li>Spam, advertise, or sell products and services.</li>
              <li>Attempt to bypass our AI or human moderation.</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              4. Moderation and Bans
            </h2>
            <p className="leading-relaxed mb-8">
              We use automated AI moderation alongside human oversight. We reserve the right to suspend or terminate access at any time, without notice, if these Terms are violated.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              5. Disclaimer of Warranties
            </h2>
            <p className="leading-relaxed">
              The service is provided &quot;as is,&quot; with no guarantees of any kind. You use Omegletest Online at your own risk.
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </main>
    </>
  );
}