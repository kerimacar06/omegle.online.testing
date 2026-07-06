const reviewsData = [
  {
    text: "Omegle is the best video chat platform for meeting strangers online. The gender filtering and instant connection features work perfectly!",
    author: "Sarah Johnson",
    rating: 5
  },
  {
    text: "I've been using Omegle for anonymous video chat and it's amazing. The HD video quality and secure messaging are top-notch!",
    author: "David Chen",
    rating: 5
  },
  {
    text: "Omegle's one-on-one video chat with girls feature is fantastic. The platform is safe, moderated, and user-friendly!",
    author: "Emily Rodriguez",
    rating: 5
  },
  {
    text: "Best free Omegle alternative I've found! The random chat rooms and face-to-face interactions are incredible!",
    author: "Alex Thompson",
    rating: 5
  },
  {
    text: "Omegle online has revolutionized how I meet new people. The live chat and anonymous messaging features are outstanding!",
    author: "Maria Garcia",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4 pb-16">
      
      {/* Container matching the screenshot */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        
        {/* Bölüm Başlığı */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Omegle User Reviews
        </h2>

        {/* Dikey Yorum Listesi */}
        <div className="flex flex-col gap-4">
          {reviewsData.map((review, index) => (
            <div 
              key={index}
              className="bg-[#F9FAFB] rounded-2xl p-6 flex items-start gap-4 transition-all hover:bg-gray-50 border border-transparent hover:border-gray-200"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Yorum İçeriği */}
              <div className="flex flex-col">
                <p className="text-gray-700 leading-relaxed mb-3 font-medium">
                  &quot;{review.text}&quot;
                </p>
                
                <div className="flex flex-wrap items-center gap-2 mt-auto">
                  <span className="text-gray-500 text-sm font-medium">
                    - {review.author}
                  </span>
                  
                  {/* Yıldızlar */}
                  <div className="flex items-center gap-0.5 ml-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}