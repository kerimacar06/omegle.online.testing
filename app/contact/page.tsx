import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Head from 'next/head';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Tarayıcı sekmesindeki başlığı garanti eden standart etiket */}
      <Head>
        <title>Omegle talk to strangers</title>
      </Head>

      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 py-16 flex-grow">
        
        {/* Üst Kısım: Logo Kartı ve Altındaki Contact Başlığı */}
        <div className="flex flex-col items-center justify-center mb-20">
          
          {/* Büyütülmüş ve Ferahlatılmış Beyaz Kart */}
          <div className="flex flex-col items-center bg-white p-10 md:p-16 rounded-3xl border border-gray-200 shadow-md w-full max-w-3xl mb-16 text-center">
            
            {/* Logo ve İsim (Mobilde alt alta, PC'de yan yana - Taşma önlendi) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 w-full">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-sm shrink-0">
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight break-all sm:break-normal px-2">
                omegletest.online
              </span>
            </div>

            {/* Buton Üstü Yazı */}
            <p className="text-gray-600 font-medium mb-10 text-center text-lg md:text-xl max-w-xl">
              Connect with strangers worldwide in real-time video chat!
            </p>

            {/* GERÇEK VİDEO CHAT LINKI BAĞLANDI */}
            <Link 
              href="/chat/video" 
              className="flex items-center gap-3 bg-blue-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-sm hover:shadow-lg hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 font-bold text-xl md:text-2xl group w-full md:w-auto justify-center"
            >
              <svg className="w-8 h-8 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
              </svg>
              Video Chat
            </Link>
          </div>

          {/* Kartın Altına Alınan Büyük Başlık ve Slogan */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 text-center">
            Contact Us
          </h1>
          <p className="text-lg text-gray-500 text-center max-w-2xl leading-relaxed px-2">
            Got a question, feedback, or need help? Our team is here for you. We look forward to hearing from you.
          </p>

        </div>

        {/* Alt Kısım: 3 Kolonlu Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-2 sm:px-0">
          
          {/* Sol Kolon: Send Us A Message Formu */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us A Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"></textarea>
              </div>
              <button type="button" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Orta Kolon: Get In Touch */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Have questions, feedback, or need support? We'd love to hear from you. Reach out to our team using the contact details below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email Support</p>
                  <p className="font-semibold text-gray-800 break-all">support@omegletest.online</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Privacy Matters</p>
                  <p className="font-semibold text-gray-800 break-all">privacy@omegletest.online</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Why Choose Us (Emojili) */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <span className="text-2xl leading-none shrink-0">🛡️</span>
                <div>
                  <h4 className="font-bold text-gray-800">Secure & Safe</h4>
                  <p className="text-sm text-gray-500">Our AI moderation keeps the environment clean and safe for everyone.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl leading-none shrink-0">⚡</span>
                <div>
                  <h4 className="font-bold text-gray-800">Instant Matching</h4>
                  <p className="text-sm text-gray-500">Connect with strangers around the globe in a matter of milliseconds.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl leading-none shrink-0">🎭</span>
                <div>
                  <h4 className="font-bold text-gray-800">100% Anonymous</h4>
                  <p className="text-sm text-gray-500">No logs, no saved data, and absolute privacy during your chats.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}