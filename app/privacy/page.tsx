import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';
import { resolveCanonical } from '@/lib/canonical';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await seoService.getSeoData('privacy');

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: resolveCanonical('/privacy', seoData.canonicalUrl),
      },
      robots: seoData.robots,
    };
  }

  return {
    title: 'Privacy Policy - Omegle Test',
    description: 'Read the privacy policy for using Omegletest.online.',
    alternates: {
      canonical: resolveCanonical('/privacy'),
    },
  };
}



export default async function PrivacyPage() {
  const seoData = await seoService.getSeoData('privacy');
  const jsonLd = seoData?.jsonLd || null;

  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Privacy Policy';

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: 'Omegle Test Online', url: 'https://omegletest.online' },
    { name: breadcrumbName, url: 'https://omegletest.online/privacy' }
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
            Privacy Policy
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
              1. Introduction
            </h2>
            <p className="leading-relaxed mb-8">
              Omegletest Online connects you with strangers for anonymous chat — no account, no profile, no strings attached. That same principle guides how we handle your data: we collect as little as possible, and we don't sell or trade what we do collect.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              2. What We Don't Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 mb-8 leading-relaxed">
              <li>No sign-up, so we never see your name, email, or phone number.</li>
              <li>No chat history — text and video are gone the moment a session ends.</li>
              <li>No selling or sharing of your data with advertisers.</li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              3. Technical Data & Cookies
            </h2>
            <p className="leading-relaxed mb-8">
              To match you with a stranger, we briefly process basic technical data such as your IP address and browser type. Essential cookies keep your session running and remember simple preferences like language — nothing more.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              4. Safety & AI Moderation
            </h2>
            <p className="leading-relaxed mb-8">
              Automated AI moderation scans live video and text in real time to catch harmful or illegal content. These checks aren't recorded or reviewed by a human unless something is flagged for a serious violation of our Terms.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              5. Your Part in Staying Safe
            </h2>
            <p className="leading-relaxed mb-8">
              Anonymity protects you, but only if you keep it that way. Avoid sharing personal details — real names, social media, exact location — with strangers you meet here.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              6. Policy Updates
            </h2>
            <p className="leading-relaxed">
              We may update this policy occasionally to reflect changes in our practices or legal requirements. Check back here for the latest version.
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </main>
    </>
  );
}