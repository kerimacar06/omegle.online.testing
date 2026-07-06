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
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col">
        {/* Navbar (Sadece bu sayfada sticky) */}
        <Navbar isSticky={true} />


        {/* === SOLDAKİ ERKEK GÖRSELİ BAŞLANGICI === */}
        <div
          className="absolute z-0 pointer-events-none"
          style={{
            top: '70px',    // (DİKEY) Yukarıdan aşağıya ne kadar ineceğini belirler
            left: '150px',    // (YATAY) SOL köşeden sağa doğru ne kadar geleceğini belirler (artırdıkça sağa gider)
          }}
        >
          <Image
            src="/selfie çeken erkek.png"
            alt="Selfie Çeken Erkek"
            width={320}
            height={400}
            priority
            style={{
              width: '320px',   // Görselin büyüklüğü. Bu rakamla oynayıp büyütebilirsiniz.
              maxWidth: 'none', // Ekran dışına taşarsa otomatik KÜÇÜLMESİNİ ENGELLER.
              height: 'auto'
            }}
            className="drop-shadow-2xl"
          />
        </div>
        {/* === SOLDAKİ ERKEK GÖRSELİ BİTİŞİ === */}



        {/* === SAĞDAKİ KIZ GÖRSELİ BAŞLANGICI === */}
        <div
          className="absolute z-0 pointer-events-none"
          style={{
            top: '70px',    // (DİKEY) Yukarıdan aşağıya ne kadar ineceğini belirler
            right: '-10px',  // (YATAY) Negatif değer alırsa sağdan dışarı doğru taşar
          }}
        >
          <Image
            src="/selfie çeken kız.png"
            alt="Selfie Çeken Kız"
            width={700}
            height={875}
            priority
            style={{
              width: '700px',   // Görselin büyüklüğü. Bu rakamla oynayıp büyütebilirsiniz.
              maxWidth: 'none', // Ekran dışına taşarsa otomatik KÜÇÜLMESİNİ ENGELLER.
              height: 'auto'
            }}
            className="drop-shadow-2xl"
          />
        </div>
        {/* === SAĞDAKİ KIZ GÖRSELİ BİTİŞİ === */}



        {/* 1. BÖLÜM: Üst Kısım */}
        <section className="w-full pt-8 pb-12">
          {/* Sitenin ortasındaki giriş kartı */}
          <ChatStarter />

          {/* Alt kısımdaki bilgilendirme ve About metinleri */}
          <InfoSection />
        </section>

        {/* 2. BÖLÜM: Orta Kısım */}
        <section className="w-full py-12">
          {/* Alternatif Uygulamalar Bölümü */}
          <Alternatives />

          {/* Neden Bizi Seçmelisiniz Bölümü */}
          <WhyChoose />

          {/* Ortadaki Yönlendirme Butonu */}
          <div className="max-w-4xl mx-auto px-4 mt-12 mb-4 flex justify-center">
            <a href="https://chathub.cam/" target="_blank" rel="noopener noreferrer" className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Start Video Chat Now
            </a>
          </div>
        </section>

        {/* 3. BÖLÜM: Alt Kısım */}
        <section className="w-full pt-16">
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