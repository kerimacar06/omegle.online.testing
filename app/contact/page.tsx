import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />
      
      <div className="w-full max-w-2xl mx-auto px-4 py-12 flex-grow">
        {/* Giriş Kartı */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
          {/* Başlık ve Slogan */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            omegletest.online
          </h1>
          <p className="text-gray-600 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Connect with strangers worldwide in real-time video chat!
          </p>

          {/* VİDEO CHAT BUTONU */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-200 text-lg shadow-sm text-center">
            Video Chat
          </button>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}