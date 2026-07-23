import Navbar from '@/components/Navbar';
import ChatStarter from '@/components/ChatStarter';
import InfoSection from '@/components/InfoSection';
import Alternatives from '@/components/Alternatives';
import WhyChoose from '@/components/WhyChoose';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import BottomBanner from '@/components/BottomBanner';
import Footer from '@/components/Footer';
import ScrollToHash from '@/components/ScrollToHash';
import { seoService } from '@/services/seoService';
import { faqService } from '@/services/faqService';
import { resolveCanonical, getSiteUrl } from '@/lib/canonical';

// Sayfanın her istendiğinde yeniden oluşturulmasını (önbellekten gelmemesini) sağlar.
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await seoService.getSeoData('home');

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: await resolveCanonical('/', seoData.canonicalUrl),
      },
      robots: seoData.robots,
    };
  }

  const siteUrl = await getSiteUrl();
  return {
    title: 'Omegle Test - talk to strangers',
    description: `Connect with strangers worldwide in real-time video chat with ${siteUrl.replace(/^https?:\/\//, '')}`,
    alternates: {
      canonical: await resolveCanonical('/'),
    },
  };
}

async function getSeoJsonLd() {
  return await seoService.getSeoJsonLd('home');
}

async function getFaqJsonLd() {
  return await faqService.getFaqJsonLd();
}

export default async function Home() {
  const jsonLdString = await getSeoJsonLd();
  const faqJsonLd = await getFaqJsonLd();
  const seoData = await seoService.getSeoData('home');

  const siteUrl = await getSiteUrl();
  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Omegle Test Online';

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: breadcrumbName, url: siteUrl }
  ]);

  return (
    <>
      {/* Admin panelinde girilen JSON-LD, olduğu gibi (diğer sayfalarla aynı desende)
          ayrı bir script etiketinde basılır — böylece panelde ne yazılırsa sayfa
          kaynağında birebir o görünür. */}
      {jsonLdString && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ScrollToHash />
      <main className="relative min-h-screen flex flex-col ch-page">
        {/* Navbar (Sadece bu sayfada sticky) */}
        <Navbar isSticky={true} />

        {/* HERO BANDI: koyu lacivert, kenardan kenara — kart/cam/blob yok */}
        <div className="band-navy w-full relative overflow-hidden">
          <div className="flex flex-row items-stretch justify-center px-[clamp(6px,2vw,32px)] pt-10 sm:pt-16 pb-8 sm:pb-14 min-h-[clamp(240px,62vw,380px)] xl:min-h-0 relative z-10">

            {/* === SOLDAKİ ERKEK GÖRSELİ === */}
            <div className="hidden xl:block relative flex-1 min-w-0">
              <img
                src="/boy-Photoroom.png"
                alt="Boy"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-full object-contain brightness-90"
              />
            </div>

            {/* === ORTADAKİ SOHBET METNİ === */}
            <div className="w-full max-w-md xl:w-[clamp(280px,32vw,480px)] shrink-0 flex justify-center self-center">
              <ChatStarter />
            </div>

            {/* === SAĞDAKİ KIZ GÖRSELİ === */}
            <div className="hidden xl:block relative flex-1 min-w-0">
              <img
                src="/girl-Photoroom.png"
                alt="Girl"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-full object-contain brightness-90"
              />
            </div>

          </div>
        </div>
        {/* HERO BANDI BİTİŞİ */}

        <InfoSection />

        <Alternatives />

        <WhyChoose />

        <Reviews />

        <FAQ />

        <BottomBanner />

        {/* Footer */}
        <Footer />

      </main>
    </>
  );
}
