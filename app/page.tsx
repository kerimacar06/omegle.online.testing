import Navbar from '@/components/Navbar';
import ChatStarter from '@/components/ChatStarter';
import InfoSection from '@/components/InfoSection';
import Alternatives from '@/components/Alternatives';
import WhyChoose from '@/components/WhyChoose';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import BottomBanner from '@/components/BottomBanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
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
  );
}