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

        {/* GÖRSELLERİ SARMALAYAN VE MOBİLDE TAŞMAYI ENGELLEYEN KUTU */}
        <div className="absolute inset-0 overflow-x-hidden sm:overflow-visible pointer-events-none z-10">

          {/* === SOLDAKİ ERKEK GÖRSELİ === */}
          {/*
            MANUEL MOBİL AYARI İÇİN: 
            Aşağıdaki "className" içindeki İLK BAŞTA YAZAN (başında sm:, md: veya lg: OLMAYAN) değerleri değiştirin:
            - top-[160px]  -> Yukarıdan ne kadar aşağıda olacağı. (Yukarı almak için top-[100px] yapabilirsiniz)
            - -left-2      -> Soldan konum. (Daha sola kaydırmak için -left-6 veya içeri almak için left-4 yapabilirsiniz)
            - w-[110px]    -> Görselin büyüklüğü/genişliği. (Büyütmek için w-[140px] deneyebilirsiniz)
          */}
          <div className="absolute top-[180px] -left-2 w-[110px] sm:top-[120px] sm:left-4 sm:w-[160px] md:z-0 md:top-[70px] md:left-[50px] md:w-[250px] lg:left-[150px] lg:w-[320px]">
            <Image
              src="/selfie çeken erkek.png"
              alt="Selfie Çeken Erkek"
              width={320}
              height={400}
              priority
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
          {/* === SOLDAKİ ERKEK GÖRSELİ BİTİŞİ === */}

          {/* === SAĞDAKİ KIZ GÖRSELİ === */}
          {/*
            MANUEL MOBİL AYARI İÇİN:
            - -right-10    -> Sağdan konum (Eksi değer sağa doğru dışarı iter. Daha çok kaydırmak için -right-14 vs yapabilirsiniz)
            - w-[160px]    -> Boyutu ayarlar.
          */}
          <div className="absolute top-[182px] right-[-50px] w-[240px] sm:top-[100px] sm:right-4 sm:w-[220px] md:z-0 md:top-[70px] md:right-[-30px] md:w-[500px] lg:right-[-10px] lg:w-[700px]">
            <Image
              src="/selfie çeken kız new-Photoroom.png"
              alt="Selfie Çeken Kız"
              width={700}
              height={875}
              priority
              className="w-full h-auto drop-shadow-2xl overflow-hidden"
            />
          </div>
          {/* === SAĞDAKİ KIZ GÖRSELİ BİTİŞİ === */}

        </div>
        {/* SARMALAYICI BİTİŞİ */}

        {/* 1. BÖLÜM: Üst Kısım */}
        <section className="w-full pt-8 sm:pt-24 md:pt-8 pb-0 relative z-20">
          {/* Sitenin ortasındaki giriş kartı */}
          <ChatStarter />
        </section>

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

          {/* Alt Banner */}
          <BottomBanner />
        </section>

        {/* Footer */}
        <Footer />

      </main>
    </>
  );
}