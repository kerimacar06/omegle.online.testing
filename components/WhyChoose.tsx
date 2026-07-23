import Link from 'next/link';

const reasonsData = [
  {
    icon: '🙉🙈🙊',
    label: '3 monkeys',
    title: 'Complete Anonymity',
    description: 'We prioritize your privacy. No registration or personal details are required.',
    tilt: '-rotate-1',
  },
  {
    icon: '🚀🔥',
    label: 'rocket speed',
    title: 'Instant Connection',
    description: 'Our advanced matchmaking connects you with strangers worldwide in milliseconds.',
    tilt: '',
  },
  {
    icon: '💬✨',
    label: 'chat bubbles',
    title: 'Classic Chat Experience',
    description: 'Enjoy the same randomized chat vibe you love, with enhanced stability and speed.',
    tilt: 'rotate-1',
  },
];

export default function WhyChoose() {
  return (
    <div className="w-full py-8 sm:py-16">
      <div className="w-full max-w-5xl mx-auto px-4 text-center md:text-center">

        <h2 className="pc-display text-2xl sm:text-3xl md:text-4xl text-pc-ink mb-8 md:mb-12">
          Why Choose Omegletest Online?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
          {reasonsData.map((reason, index) => (
            <div
              key={index}
              className={`pc-card p-4 sm:p-6 flex flex-col items-center justify-start h-full text-center ${reason.tilt}`}
            >
              <span className="text-3xl sm:text-5xl mb-3 sm:mb-5" role="img" aria-label={reason.label}>{reason.icon}</span>
              <h3 className="pc-display text-sm sm:text-lg text-pc-ink mb-1 sm:mb-3 leading-tight">
                {reason.title}
              </h3>
              <p className="text-xs sm:text-sm text-pc-ink-2 leading-relaxed sm:max-w-xs sm:mx-auto sm:text-justify">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 px-2">
          <Link href="/live-video" className="pc-btn w-auto font-bold py-2.5 md:py-4 px-6 md:px-12 text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 animate-soft-bounce">
            <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <span className="truncate">Start Video Chat Now</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
