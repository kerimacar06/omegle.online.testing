const reasonsData = [
  {
    icon: (
      // 3 Maymun İkonu (Complete Anonymity) - Daire fonu kaldırıldı, yan yana dizildi
      <div className="flex items-center justify-center p-3">
        <span className="text-5xl" role="img" aria-label="3 monkeys">
          🙉🙈🙊
        </span>
      </div>
    ),
    title: 'Complete Anonymity',
    description: 'We prioritize your privacy. No registration or personal details are required.',
  },
  {
    icon: (
      // Alev Almış Roket İkonu (Instant Connection) - Daire fonu kaldırıldı
      <div className="flex items-center justify-center p-3">
        <span className="text-5xl" role="img" aria-label="rocket speed">
          🚀🔥
        </span>
      </div>
    ),
    title: 'Instant Connection',
    description: 'Our advanced matchmaking connects you with strangers worldwide in milliseconds.',
  },
  {
    icon: (
      // Sohbet Balonu İkonu (Classic Chat Experience) - Daire fonu kaldırıldı
      <div className="flex items-center justify-center p-3">
        <span className="text-5xl" role="img" aria-label="chat bubbles">
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
    <div className="w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-16">
      <div className="w-full max-w-5xl mx-auto px-4 text-center">

        {/* Bölüm Başlığı */}
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Why Choose Omegletest Online?
        </h2>

        {/* md:grid-cols-3 ile yan yana 3'lü dizilim */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reasonsData.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col items-center hover:-translate-y-1 transition-transform duration-300"
            >
              {/* İkon Konteyneri */}
              <div className="mb-6">
                {reason.icon}
              </div>

              {/* Metin İçeriği */}
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Ortadaki Yönlendirme Butonu */}
        <div className="flex justify-center mt-4">
          <a href="https://chathub.cam/" target="_blank" rel="noopener noreferrer" className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 animate-soft-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Start Video Chat Now
          </a>
        </div>

      </div>
    </div>
  );
}