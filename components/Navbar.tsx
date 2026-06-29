import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 shadow-sm shrink-0">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Sol Üst: Logo ve İsim */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-sm">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            omegletest.online
          </span>
        </Link>

        {/* Sağ Üst: Mobil Uyumlu Stacklenmiş Linkler */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-gray-600 font-semibold text-sm w-full sm:w-auto">
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <Link href="/" className="hover:text-black transition-colors duration-200">
              Home
            </Link>
            <Link href="/apps" className="hover:text-black transition-colors duration-200">
              Apps
            </Link>
            <Link href="/privacy" className="hover:text-black transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors duration-200">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-black transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* DİL SEÇİCİ */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-black transition-colors pl-0 sm:pl-6 border-0 sm:border-l border-gray-200 group relative">
            <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-bold">EN</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

      </div>
    </nav>
  );
}