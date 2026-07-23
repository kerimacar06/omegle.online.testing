import Link from 'next/link';

const reasonsData = [
  {
    icon: (
      // 3 Maymun İkonu (Complete Anonymity)
      <div className="flex items-center justify-center p-1 sm:p-1 md:p-3">
        <span className="text-lg sm:text-3xl md:text-5xl whitespace-nowrap" role="img" aria-label="3 monkeys">
          🙉🙈🙊
        </span>
      </div>
    ),
    title: 'Complete Anonymity',
    description: 'We prioritize your privacy. No registration or personal details are required.',
    tilt: '-rotate-2',
  },
  {
    icon: (
      // Alev Almış Roket İkonu (Instant Connection)
      <div className="flex items-center justify-center p-1 sm:p-1 md:p-3">
        <span className="text-3xl sm:text-3xl md:text-5xl whitespace-nowrap" role="img" aria-label="rocket speed">
          🚀🔥
        </span>
      </div>
    ),
    title: 'Instant Connection',
    description: 'Our advanced matchmaking connects you with strangers worldwide in milliseconds.',
    tilt: 'lg:-translate-y-3',
  },
  {
    icon: (
      // Sohbet Balonu İkonu (Classic Chat Experience)
      <div className="flex items-center justify-center p-1 sm:p-1 md:p-3">
        <span className="text-3xl sm:text-3xl md:text-5xl whitespace-nowrap" role="img" aria-label="chat bubbles">
          💬✨
        </span>
      </div>
    ),
    title: 'Classic Chat Experience',
    description: 'Enjoy the same randomized chat vibe you love, with enhanced stability and speed.',
    tilt: 'rotate-2',
  },
];

export default function WhyChoose() {
  return (
    <div className="w-full py-8 sm:py-16 border-t-3 border-ink" style={{ borderTopWidth: 3 }}>
      <div className="w-full max-w-5xl mx-auto px-4 text-center md:text-center">

        {/* Bölüm Başlığı */}
        <h2 className="brut-display text-2xl sm:text-3xl md:text-4xl text-ink mb-8 md:mb-12">
          Why Choose Omegletest Online?
        </h2>

        {/* Mobilde alt alta liste (ikon solda, metin sağda), masaüstünde 3'lü kolon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
          {reasonsData.map((reason, index) => (
            <div
              key={index}
              className={`brut-card p-4 sm:p-4 md:p-6 flex flex-row sm:flex-col items-center justify-start gap-4 sm:gap-2 md:gap-0 h-full text-left sm:text-center ${reason.tilt}`}
            >
              {/* İkon Konteyneri */}
              <div className="shrink-0 flex items-center justify-center w-14 h-10 sm:w-auto sm:h-auto mb-0 sm:mb-1 md:mb-6">
                {reason.icon}
              </div>

              {/* Metin İçeriği */}
              <div className="flex flex-col text-left sm:text-center w-full min-w-0">
                <h3 className="brut-display text-sm sm:text-sm md:text-lg text-ink mb-1 md:mb-3 leading-tight text-center">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-sm text-ink/70 font-semibold leading-relaxed md:max-w-xs md:mx-auto text-justify md:text-justify">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ortadaki Yönlendirme Butonu */}
        <div className="flex justify-center mt-4 px-2">
          <Link href="/live-video" className="brut-btn w-auto bg-brut-green text-ink font-bold py-2 md:py-4 px-6 md:px-12 rounded-full text-sm md:text-xl flex items-center justify-center gap-2 md:gap-3 animate-soft-bounce">
            <svg className="w-4 h-4 md:w-6 md:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <span className="truncate">Start Video Chat Now</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
