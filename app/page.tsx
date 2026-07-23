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

const TICKER_WORDS = [
  'RELEVANT CHATS', 'SAFETY & PRIVACY', 'AI MODERATION',
  'COMPLETE ANONYMITY', 'INSTANT CONNECTION', 'CLASSIC CHAT EXPERIENCE',
];

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
      <main className="relative min-h-screen flex flex-col brut-page">
        {/* Navbar (Sadece bu sayfada sticky) */}
        <Navbar isSticky={true} />

        {/* HERO BÖLÜMÜ: yükseklik ortadaki sohbet kutusunun kendi içeriğine göre belirlenir;
            görseller "absolute" konumlandığı için satırın yüksekliğine katkı yapmaz, bu sayede
            kutunun yüksekliği neyse görseller de (object-contain ile) tam o yüksekliğe oturur. */}
        <div className="flex flex-row items-stretch justify-center px-[clamp(6px,2vw,32px)] pt-6 sm:pt-10 pb-3 sm:pb-10 min-h-[clamp(240px,62vw,380px)] xl:min-h-0">

          {/* === SOLDAKİ ERKEK GÖRSELİ === */}
          <div className="relative flex-1 min-w-0">
            <img
              src="/boy-Photoroom.png"
              alt="Boy"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-full object-contain xl:-rotate-2"
            />
          </div>
          {/* === SOLDAKİ ERKEK GÖRSELİ BİTİŞİ === */}

          {/* === ORTADAKİ SOHBET KUTUSU === */}
          <div className="w-[clamp(180px,38vw,640px)] shrink-0 flex justify-center self-center">
            <ChatStarter />
          </div>
          {/* === ORTADAKİ SOHBET KUTUSU BİTİŞİ === */}

          {/* === SAĞDAKİ KIZ GÖRSELİ === */}
          <div className="relative flex-1 min-w-0">
            <img
              src="/girl-Photoroom.png"
              alt="Girl"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-full object-contain xl:rotate-3"
            />
          </div>
          {/* === SAĞDAKİ KIZ GÖRSELİ BİTİŞİ === */}

        </div>
        {/* HERO BÖLÜMÜ BİTİŞİ */}

        {/* Kayan başlık şeridi — mevcut özellik başlıklarını tekrar kullanan dekoratif bant */}
        <div className="w-full border-y-3 border-ink bg-ink py-2.5 overflow-hidden" style={{ borderTopWidth: 3, borderBottomWidth: 3 }}>
          <div className="brut-marquee-track">
            {[...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
              <span key={i} className="flex items-center shrink-0 text-paper font-bold text-sm sm:text-base uppercase tracking-wide px-4">
                {word}
                <span className="text-brut-yellow ml-4">★</span>
              </span>
            ))}
          </div>
        </div>

        <InfoSection />

        {/* 2. BÖLÜM: Orta Kısım */}
        <section className="w-full border-t-3 border-ink" style={{ borderTopWidth: 3 }}>
          {/* Alternatif Uygulamalar Bölümü */}
          <Alternatives />

          {/* Neden Bizi Seçmelisiniz Bölümü */}
          <WhyChoose />
        </section>

        {/* 3. BÖLÜM: Alt Kısım */}
        <section className="w-full bg-brut-yellow/20 border-t-3 border-ink" style={{ borderTopWidth: 3 }}>
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
