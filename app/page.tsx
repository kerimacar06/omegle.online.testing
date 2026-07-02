import Navbar from '@/components/Navbar';
import ChatStarter from '@/components/ChatStarter';
import InfoSection from '@/components/InfoSection';
import Alternatives from '@/components/Alternatives';
import WhyChoose from '@/components/WhyChoose';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import BottomBanner from '@/components/BottomBanner';
import Footer from '@/components/Footer';

// NOT: Veritabanı ile (Mongoose vb.) burada direkt konuşmuyoruz. 
// Bunun yerine yazdığımız "Servisleri" çağırıyoruz. Bu sayede kod temiz kalıyor.
import { seoService } from '@/services/seoService';
import { faqService } from '@/services/faqService';

// Sayfanın her istendiğinde yeniden oluşturulmasını (önbellekten gelmemesini) sağlar.
export const dynamic = 'force-dynamic';

// Next.js'in özel fonksiyonudur. Sayfanın Google'daki görünümünü (Title, Description) ayarlar.
export async function generateMetadata() {
  // Veriyi API'ye istek atmadan, doğrudan kendi servisimizden (aşçıdan) alıyoruz.
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

// Ana sayfa bileşenimiz. 'async' olduğu için sayfayı oluştururken verileri bekleyebilir.
export default async function Home() {
  // Google için yapılandırılmış verileri (JSON-LD) servislerden çekiyoruz.
  const jsonLdString = await getSeoJsonLd();
  const faqJsonLd = await getFaqJsonLd();

  let combinedJsonLd: any[] = [];

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
      <main className="min-h-screen bg-white flex flex-col">
        {/* üst taraftaki düzenleme çubuğu */}
        <Navbar /> 
        
        {/* 1. BÖLÜM: Üst Kısım (Hafif gri arka plan) */}
        <section className="w-full bg-gray-50 pt-8 pb-12">
          {/* Sitenin ortasındaki giriş kartı */}
          <ChatStarter />
          
          {/* Alt kısımdaki bilgilendirme ve About metinleri */}
          <InfoSection />
        </section>
        
        {/* 2. BÖLÜM: Orta Kısım (Saf beyaz arka plan) */}
        <section className="w-full bg-white py-12">
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

        {/* 3. BÖLÜM: Alt Kısım (Blokları ayıran hafif soğuk gri tonu) */}
        <section className="w-full bg-slate-50 pt-16">
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