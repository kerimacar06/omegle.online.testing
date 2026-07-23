import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';
import PopBackground from '@/components/PopBackground';
import { resolveCanonical, getSiteUrl } from '@/lib/canonical';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await seoService.getSeoData('privacy');

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: await resolveCanonical('/privacy', seoData.canonicalUrl),
      },
      robots: seoData.robots,
    };
  }

  return {
    title: 'Privacy Policy - Omegle Test',
    description: 'Read the privacy policy for using Omegletest.online.',
    alternates: {
      canonical: await resolveCanonical('/privacy'),
    },
  };
}



export default async function PrivacyPage() {
  const seoData = await seoService.getSeoData('privacy');
  const jsonLd = await seoService.getSeoJsonLd('privacy');
  const homeSeoData = await seoService.getSeoData('home');

  const siteUrl = await getSiteUrl();
  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Privacy Policy';
  const homeBreadcrumbName = homeSeoData?.breadcrumb && homeSeoData.breadcrumb.trim() !== "" ? homeSeoData.breadcrumb : 'Home';

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: homeBreadcrumbName, url: siteUrl },
    { name: breadcrumbName, url: `${siteUrl}/privacy` }
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
      <main className="relative min-h-screen pop-page flex flex-col">
      <PopBackground />
      <div className="relative z-10 flex flex-col flex-grow">
      <Navbar />

      {/* HEADER BÖLÜMÜ */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-12">
        {/* Visual Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-pop-ink-3 mb-8 font-semibold">
          <Link href="/" className="hover:text-pop-pink transition-colors">{homeBreadcrumbName}</Link>
          <span>›</span>
          <span className="text-pop-ink">{breadcrumbName}</span>
        </div>

        {/* Sayfa Başlığı */}
        <div className="text-center">
          <h1 className="pop-display text-2xl sm:text-3xl md:text-4xl text-pop-ink mb-3 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-pop-ink-2 text-base sm:text-lg font-medium">
            Last updated: June 2026
          </p>
        </div>
      </div>

      {/* İÇERİK BÖLÜMÜ */}
      <div className="w-full flex-grow">
        <div className="w-full max-w-4xl mx-auto px-4 py-10 sm:py-16">

          {/* Metin Kutusu */}
          <div className="pop-card-static p-6 sm:p-10 text-pop-ink-2 text-base sm:text-lg [&_p]:text-justify">

            <h2 className="pop-display text-xl sm:text-2xl text-pop-ink mb-4 mt-0">
              1. Introduction
            </h2>
            <p className="leading-relaxed mb-8">
              Omegletest Online connects you with strangers for anonymous chat — no account, no profile, no strings attached. That same principle guides how we handle your data: we collect as little as possible, and we don&apos;t sell or trade what we do collect.
            </p>

            <h2 className="pop-display text-xl sm:text-2xl text-pop-ink mb-4">
              2. What We Don&apos;t Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 mb-8 leading-relaxed">
              <li>No sign-up, so we never see your name, email, or phone number.</li>
              <li>No chat history — text and video are gone the moment a session ends.</li>
              <li>No selling or sharing of your data with advertisers.</li>
            </ul>

            <h2 className="pop-display text-xl sm:text-2xl text-pop-ink mb-4">
              3. Technical Data & Cookies
            </h2>
            <p className="leading-relaxed mb-8">
              To match you with a stranger, we briefly process basic technical data such as your IP address and browser type. Essential cookies keep your session running and remember simple preferences like language — nothing more.
            </p>

            <h2 className="pop-display text-xl sm:text-2xl text-pop-ink mb-4">
              4. Safety & AI Moderation
            </h2>
            <p className="leading-relaxed mb-8">
              Automated AI moderation scans live video and text in real time to catch harmful or illegal content. These checks aren&apos;t recorded or reviewed by a human unless something is flagged for a serious violation of our Terms.
            </p>

            <h2 className="pop-display text-xl sm:text-2xl text-pop-ink mb-4">
              5. Your Part in Staying Safe
            </h2>
            <p className="leading-relaxed mb-8">
              Anonymity protects you, but only if you keep it that way. Avoid sharing personal details — real names, social media, exact location — with strangers you meet here.
            </p>

            <h2 className="pop-display text-xl sm:text-2xl text-pop-ink mb-4">
              6. Policy Updates
            </h2>
            <p className="leading-relaxed">
              We may update this policy occasionally to reflect changes in our practices or legal requirements. Check back here for the latest version.
            </p>

          </div>
        </div>
      </div>

      <Footer />
      </div>
    </main>
    </>
  );
}
