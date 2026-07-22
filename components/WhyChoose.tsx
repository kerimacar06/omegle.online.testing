import Link from 'next/link';

const reasonsData = [
  {
    icon: (
      // 3 Maymun İkonu (Complete Anonymity)
      <div className="flex items-center justify-center p-1 md:p-3">
        <span className="text-xl sm:text-3xl md:text-5xl" role="img" aria-label="3 monkeys">
          🙉🙈🙊
        </span>
      </div>
    ),
    title: 'Complete Anonymity',
    description: 'We prioritize your privacy. No registration or personal details are required.',
  },
  {
    icon: (
      // Alev Almış Roket İkonu (Instant Connection)
      <div className="flex items-center justify-center p-1 md:p-3">
        <span className="text-xl sm:text-3xl md:text-5xl" role="img" aria-label="rocket speed">
          🚀🔥
        </span>
      </div>
    ),
    title: 'Instant Connection',
    description: 'Our advanced matchmaking connects you with strangers worldwide in milliseconds.',
  },
  {
    icon: (
      // Sohbet Balonu İkonu (Classic Chat Experience)
      <div className="flex items-center justify-center p-1 md:p-3">
        <span className="text-xl sm:text-3xl md:text-5xl" role="img" aria-label="chat bubbles">
          💬✨
        </span>
      </div>
    ),
    title: 'Classic Chat Experience',
    description: 'Enjoy the same randomized chat vibe you love, with enhanced stability and speed.',
  },
];

export default function WhyChoose() {
  return (
    <div className="w-full py-8 sm:py-16 border-t border-neon-line">
      <div className="w-full max-w-5xl mx-auto px-4 text-center md:text-center">

        {/* Bölüm Başlığı */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold md:font-extrabold text-neon-ink mb-8 md:mb-12">
          Why Choose Omegletest Online?
        </h2>

        {/* Mobilde 3'lü Grid Dizilimi (Kompakt), Masaüstünde Orijinal Boyut */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12">
          {reasonsData.map((reason, index) => (
            <div
              key={index}
              className="neon-card p-2 sm:p-4 md:p-6 rounded-md flex flex-col items-center justify-start gap-1 sm:gap-2 md:gap-0 h-full"
            >
              {/* İkon Konteyneri */}
              <div className="shrink-0 flex justify-center mb-1 md:mb-6">
                {reason.icon}
              </div>

              {/* Metin İçeriği (Her Ekranda Ortalanmış) */}
              <div className="flex flex-col text-center w-full">
                <h3 className="text-xs sm:text-sm md:text-lg font-bold text-neon-ink mb-1 md:mb-3 leading-tight">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-sm text-neon-ink-2 leading-tight md:leading-relaxed md:max-w-xs md:mx-auto text-center md:text-justify">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ortadaki Yönlendirme Butonu */}
        <div className="flex justify-center mt-4 px-2">
          <Link href="/live-video" className="w-auto bg-gradient-to-r from-neon-cyan to-neon-violet text-neon-bg font-bold py-2 md:py-4 px-6 md:px-12 rounded-full text-sm md:text-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 md:gap-3 animate-soft-bounce neon-pulse-glow">
            <svg className="w-4 h-4 md:w-6 md:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <span className="truncate">Start Video Chat Now</span>
          </Link>
        </div>

      </div>
    </div>
  );
}