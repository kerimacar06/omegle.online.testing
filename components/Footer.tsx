import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 pb-8 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Üst Kısım: 3 Kolonlu Yapı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* 1. Kolon: About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">About</h3>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/apps" className="hover:text-blue-600 transition-colors">Apps</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* 2. Kolon: Categories */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Categories</h3>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li><Link href="/chat/video" className="hover:text-blue-600 transition-colors">Video Chat</Link></li>
              <li><Link href="/chat/text" className="hover:text-blue-600 transition-colors">Text Chat</Link></li>
            </ul>
          </div>

          {/* 3. Kolon: Omegletest Online Tanıtım & Sosyal Medya */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Omegletest Online</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Connect with people worldwide through secure video chat. Discover new friendships and meaningful conversations.
            </p>
            {/* Sosyal Medya İkonları (Ana Sayfaya Yönlendirildi) */}
            <div className="flex gap-4">
              <Link href="/" className="text-gray-500 hover:text-blue-400 transition-colors" title="Go to Homepage">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>

        </div>

        {/* Ayırıcı Alt Çizgi */}
        <hr className="border-gray-200 mb-8" />

        {/* En Alt Kısım: Telif Hakkı ve Sözleşme Linkleri */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
          <p>© 2026 Omegletest Online. All rights reserved</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}