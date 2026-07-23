import Link from 'next/link';

const reasonsData = [
  {
    icon: '🙉🙈🙊',
    label: '3 monkeys',
    title: 'Complete Anonymity',
    description: 'We prioritize your privacy. No registration or personal details are required.',
  },
  {
    icon: '🚀🔥',
    label: 'rocket speed',
    title: 'Instant Connection',
    description: 'Our advanced matchmaking connects you with strangers worldwide in milliseconds.',
  },
  {
    icon: '💬✨',
    label: 'chat bubbles',
    title: 'Classic Chat Experience',
    description: 'Enjoy the same randomized chat vibe you love, with enhanced stability and speed.',
  },
];

export default function WhyChoose() {
  return (
    <div className="band-white w-full py-10 sm:py-16 border-b border-v6-line">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">

        <h2 className="ch-display text-2xl sm:text-3xl md:text-4xl font-bold text-v6-ink mb-8 md:mb-12 text-center">
          Why Choose Omegletest Online?
        </h2>

        {/* Dikey ayraçlı, kart yok — sadece ince çizgilerle bölünmüş bir sıra */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-v6-line mb-8 md:mb-12">
          {reasonsData.map((reason, index) => (
            <div key={index} className="flex flex-row sm:flex-col items-center gap-4 sm:gap-0 py-5 sm:py-0 sm:px-6 text-left sm:text-center">
              <span className="text-3xl sm:text-5xl shrink-0 sm:mb-5" role="img" aria-label={reason.label}>{reason.icon}</span>
              <div className="min-w-0">
                <h3 className="ch-display text-sm sm:text-lg font-bold text-v6-ink mb-1 sm:mb-3 leading-tight">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-v6-ink-2 leading-relaxed sm:max-w-xs sm:mx-auto">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/live-video" className="ch-btn w-auto font-bold py-3 md:py-4 px-8 md:px-12 text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 animate-soft-bounce">
            <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <span className="truncate">Start Video Chat Now</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
