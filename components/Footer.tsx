import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="band-white w-full text-v6-ink-2 py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Sadece Linkler ve Telif Hakkı (Inline Minimal Footer) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="ch-display text-xl font-bold text-v6-ink tracking-wide">Omegle<span className="text-v6-coral">test</span></span>
            <div className="hidden md:block w-px h-4 bg-v6-line"></div>
            <div className="flex flex-nowrap justify-center gap-x-2.5 gap-y-2 md:gap-x-6 text-xs md:text-sm font-medium whitespace-nowrap">
              <Link href="/" className="hover:text-v6-coral transition-colors">Home</Link>
              <Link href="/apps" className="hover:text-v6-coral transition-colors">Apps</Link>
              <Link href="/live-video" className="hover:text-v6-coral transition-colors">Video Chat</Link>
              <Link href="/privacy" className="hover:text-v6-coral transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-v6-coral transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-v6-coral transition-colors">Contact</Link>
            </div>
          </div>

          <div className="text-sm text-v6-ink-3 flex items-center gap-4">
            <span>© 2026 Omegletest Online.</span>
            {/* Sosyal Medya İkonu */}
            <Link href="/" className="text-v6-ink-3 hover:text-v6-coral transition-colors" title="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
