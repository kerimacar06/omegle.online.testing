import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />
      
      <div className="w-full max-w-2xl mx-auto px-4 py-12 flex-grow">
        {/* Giriş Kartı */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
          
          {/* Başlık ve Slogan */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight break-all sm:break-normal px-2">
            omegletest.online
          </h1>
          <p className="text-gray-600 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Connect with strangers worldwide in real-time video chat!
          </p>

          {/* DÜZ BUTTON YERİNE TIKLANABİLİR LINK EKLENDİ */}
          <Link 
            href="/chat/video"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-200 text-lg shadow-sm text-center transform hover:scale-[1.02]"
          >
            Video Chat
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}