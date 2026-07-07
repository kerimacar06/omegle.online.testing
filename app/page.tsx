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
      <main className="relative min-h-screen bg-white flex flex-col">
        {/* Navbar (Sadece bu sayfada sticky) */}
        <Navbar isSticky={true} />

        {/* HERO BÖLÜMÜ: erkek/kız görselleri kendi aralarında her zaman eşit genişlikte (flex-1),
            ortadaki kutu ise sabit/kendi oranında bir genişlikte (w-[clamp]) — dikey basık durmasın diye. */}
        <div className="flex flex-row items-center justify-center gap-[clamp(4px,2vw,32px)] px-[clamp(6px,2vw,32px)] pt-6 sm:pt-10">

          {/* === SOLDAKİ ERKEK GÖRSELİ === */}
          <div className="flex-1 min-w-0">
            <Image
              src="/boy-Photoroom.png"
              alt="Boy"
              width={765}
              height={1024}
              priority
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
          {/* === SOLDAKİ ERKEK GÖRSELİ BİTİŞİ === */}

          {/* === ORTADAKİ SOHBET KUTUSU === */}
          <div className="w-[clamp(160px,30vw,520px)] shrink-0 flex justify-center">
            <ChatStarter />
          </div>
          {/* === ORTADAKİ SOHBET KUTUSU BİTİŞİ === */}

          {/* === SAĞDAKİ KIZ GÖRSELİ === */}
          <div className="flex-1 min-w-0">
            <Image
              src="/girl-Photoroom.png"
              alt="Girl"
              width={414}
              height={559}
              priority
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
          {/* === SAĞDAKİ KIZ GÖRSELİ BİTİŞİ === */}

        </div>
        {/* HERO BÖLÜMÜ BİTİŞİ */}

        <InfoSection />

        {/* 2. BÖLÜM: Orta Kısım */}
        <section className="w-full">
          {/* Alternatif Uygulamalar Bölümü */}
          <Alternatives />

          {/* Neden Bizi Seçmelisiniz Bölümü */}
          <WhyChoose />

        </section>

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