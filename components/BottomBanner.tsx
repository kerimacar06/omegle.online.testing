import Link from 'next/link';

export default function BottomBanner() {
  return (
    <div className="w-full py-8 sm:py-14 md:py-20">
      <div className="max-w-2xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="pop-card-static bg-gradient-to-br from-white to-pop-bg px-6 py-8 sm:px-10 sm:py-12 -rotate-1 w-full">
          <h2 className="pop-display text-2xl sm:text-3xl md:text-4xl text-pop-ink mb-2 leading-tight">
            Ready to meet strangers worldwide?
          </h2>
          <p className="text-pop-ink-2 text-xs sm:text-lg font-medium leading-snug mb-6 md:mb-8">
            Omegletest Online is the best free video chat platform for anonymous conversations. No sign-up required. Start chatting now!
          </p>
          <Link href="/live-video" className="pop-btn inline-flex w-auto font-bold py-2 md:py-4 px-6 md:px-12 text-sm md:text-xl items-center justify-center gap-2 md:gap-3 animate-soft-bounce">
            <svg className="w-4 h-4 md:w-6 md:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <span className="truncate">Start Video Chat Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
