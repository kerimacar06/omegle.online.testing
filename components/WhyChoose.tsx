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
    <div className="w-full max-w-5xl mx-auto mt-16 px-4 pb-12 text-center">
      
      {/* Bölüm Başlığı */}
      <h2 className="text-3xl font-bold text-gray-800 mb-12">
        Why Choose Omegletest Online?
      </h2>

      {/* md:grid-cols-3 ile yan yana 3'lü dizilim */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

    </div>
  );
}