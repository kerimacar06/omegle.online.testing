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
      <main className="relative min-h-screen flex flex-col pc-page">
        {/* Navbar (Sadece bu sayfada sticky) */}
        <Navbar isSticky={true} />

        {/* HERO BÖLÜMÜ: arkaplanda dekoratif uçuş rotası noktalı çizgileri */}
        <div className="relative flex flex-row items-stretch justify-center px-[clamp(6px,2vw,32px)] pt-8 sm:pt-12 pb-6 sm:pb-14 min-h-[clamp(240px,62vw,380px)] xl:min-h-0 overflow-hidden">

          {/* Dekoratif uçuş rotası — dünyanın her yerinden bağlantı fikrini görselleştiriyor */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60 hidden sm:block" viewBox="0 0 800 300" preserveAspectRatio="none" aria-hidden="true">
            <path className="flight-path" d="M60,220 Q300,40 400,150 Q500,260 740,60" />
            <circle cx="60" cy="220" r="4" fill="var(--pc-rust)" />
            <circle cx="400" cy="150" r="4" fill="var(--pc-teal)" />
            <circle cx="740" cy="60" r="4" fill="var(--pc-rust)" />
          </svg>

          {/* === SOLDAKİ ERKEK GÖRSELİ === */}
          <div className="relative flex-1 min-w-0">
            <img
              src="/boy-Photoroom.png"
              alt="Boy"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-full object-contain sepia-[0.35] contrast-105"
            />
          </div>
          {/* === SOLDAKİ ERKEK GÖRSELİ BİTİŞİ === */}

          {/* === ORTADAKİ SOHBET KUTUSU === */}
          <div className="w-[clamp(180px,38vw,640px)] shrink-0 flex justify-center self-center relative z-10">
            <ChatStarter />
          </div>
          {/* === ORTADAKİ SOHBET KUTUSU BİTİŞİ === */}

          {/* === SAĞDAKİ KIZ GÖRSELİ === */}
          <div className="relative flex-1 min-w-0">
            <img
              src="/girl-Photoroom.png"
              alt="Girl"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-full object-contain sepia-[0.35] contrast-105"
            />
          </div>
          {/* === SAĞDAKİ KIZ GÖRSELİ BİTİŞİ === */}

        </div>
        {/* HERO BÖLÜMÜ BİTİŞİ */}

        {/* Klasik airmail zarf şeridi — bölüm ayracı */}
        <div className="airmail-stripe w-full" aria-hidden="true"></div>

        <InfoSection />

        {/* 2. BÖLÜM: Orta Kısım */}
        <section className="w-full border-t-2 border-dashed border-pc-line">
          {/* Alternatif Uygulamalar Bölümü */}
          <Alternatives />

          {/* Neden Bizi Seçmelisiniz Bölümü */}
          <WhyChoose />
        </section>

        <div className="airmail-stripe w-full" aria-hidden="true"></div>

        {/* 3. BÖLÜM: Alt Kısım */}
        <section className="w-full">
          {/* Kullanıcı Yorumları Bölümü */}
          <Reviews />

          {/* SSS Bölümü */}
          <FAQ />

          {/* Alt Banner (Son CTA) */}
          <BottomBanner />
        </section>

        {/* Footer */}
        <Footer />

      </main>
    </>
  );
}
