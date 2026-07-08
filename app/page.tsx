import Navbar from '@/components/Navbar';
import Image from 'next/image';
import ChatStarter from '@/components/ChatStarter';
import InfoSection from '@/components/InfoSection';
import Alternatives from '@/components/Alternatives';
import WhyChoose from '@/components/WhyChoose';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import BottomBanner from '@/components/BottomBanner';
import Footer from '@/components/Footer';
import { seoService } from '@/services/seoService';
import { faqService } from '@/services/faqService';

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
        canonical: seoData.canonicalUrl,
      },
      robots: seoData.robots,
    };
  }

  return {
    title: 'Omegle Test - talk to strangers',
    description: 'Connect with strangers worldwide in real-time video chat with omegletest.online',
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

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: 'Omegle Test Online', url: 'https://omegletest.online' }
  ]);

  let combinedJsonLd: any[] = [breadcrumbJsonLd];

  if (jsonLdString) {
    try {
      const parsed = JSON.parse(jsonLdString);
      if (Array.isArray(parsed)) {
        combinedJsonLd.push(...parsed);
      } else {
        combinedJsonLd.push(parsed);
      }
    } catch (e) {
      console.error("JSON-LD parse error:", e);
    }
  }

  if (faqJsonLd) {
    combinedJsonLd.push(faqJsonLd);
  }

  return (
    <>
      {combinedJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }}
        />
      )}
      <main className="relative min-h-screen flex flex-col ">
        {/* Navbar (Sadece bu sayfada sticky) */}
        <Navbar isSticky={true} />

        {/* HERO BÖLÜMÜ: yükseklik ortadaki sohbet kutusunun kendi içeriğine göre belirlenir;
            görseller "absolute" konumlandığı için satırın yüksekliğine katkı yapmaz, bu sayede
            kutunun yüksekliği neyse görseller de (object-contain ile) tam o yüksekliğe oturur. */}
        <div className="flex flex-row items-stretch justify-center px-[clamp(6px,2vw,32px)] pt-6 sm:pt-10 pb-10 min-h-[clamp(240px,62vw,380px)] xl:min-h-0">

          {/* === SOLDAKİ ERKEK GÖRSELİ === */}
          <div className="relative flex-1 min-w-0">
            <img
              src="/boy-Photoroom.png"
              alt="Boy"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-full object-contain"
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
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-full object-contain"
            />
          </div>
          {/* === SAĞDAKİ KIZ GÖRSELİ BİTİŞİ === */}

        </div>
        {/* HERO BÖLÜMÜ BİTİŞİ */}

        <InfoSection />

        {/* 2. BÖLÜM: Orta Kısım */}
        <section className="w-full border-t border-gray-100">
          {/* Alternatif Uygulamalar Bölümü */}
          <Alternatives />

          {/* Neden Bizi Seçmelisiniz Bölümü */}
          <WhyChoose />
        </section>

        {/* 3. BÖLÜM: Alt Kısım */}
        <section className="w-full bg-slate-100 border-t border-gray-100">
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