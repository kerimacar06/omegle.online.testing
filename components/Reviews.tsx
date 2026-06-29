// Çeşitli dillerde daha gerçekçi yorumlar
const reviewsData = [
  {
    text: "Gece sıkıldığımda giriyorum, bazen çok kafa insanlara denk geliyorum. Arayüzü de diğerlerine göre çok daha temiz.",
    author: "Can",
    language: "tr"
  },
  {
    text: "I usually prefer text chat over video. The connection is fast, but sometimes it takes a few tries to find someone with shared interests.",
    author: "Mark S.",
    language: "en"
  },
  {
    text: "Es bastante entretenido. Me gusta que no tienes que registrarte para empezar a hablar.",
    author: "Elena",
    language: "es"
  },
  {
    text: "Einfach und schnell. Die Videoqualität ist gut, aber man muss halt aufpassen, mit wem man spricht. Typisch Omegle-Alternative eben.",
    author: "Lukas",
    language: "de"
  },
  {
    text: "Molto carino per passare il tempo. Il design è moderno e si carica subito.",
    author: "Giulia",
    language: "it"
  }
];

export default function Reviews() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-16 px-4 pb-16">
      
      {/* Bölüm Başlığı */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Omegle User Reviews
        </h2>
        <p className="text-gray-500 text-sm">
          What people are saying about Omegletest Online
        </p>
      </div>

      {/* Yorum Kartları (Flexbox ile sarılmış ve ortalanmış) */}
      <div className="flex flex-wrap justify-center gap-6">
        {reviewsData.map((review, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
          >
            {/* Tırnak İşareti ve Yorum Metni */}
            <div>
              <span className="text-4xl text-blue-200 font-serif leading-none">&ldquo;</span>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-1 mb-6">
                {review.text}
              </p>
            </div>

            {/* Yazar İsmi */}
            <div className="flex items-center gap-3 mt-auto">
              {/* Küçük anonim avatar yuvarlağı (opsiyonel ama boşluk doldurur) */}
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs">
                {review.author.charAt(0)}
              </div>
              <span className="font-semibold text-gray-800 text-sm">
                - {review.author}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}