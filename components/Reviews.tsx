'use client';

import { useRef, useEffect } from 'react';

const reviewsData = [
  {
    text: "Omegle is the best video chat platform for meeting strangers. The gender filtering and instant connection features work great! Highly recommended.",
    name: "Sarah Johnson",
    username: "@sarah_j",
    date: "2 days ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4"
  },
  {
    text: "I've been using Omegle for anonymous video chat and it's amazing. The HD video quality and secure messaging are top-notch! I haven't seen anything like it.",
    name: "David Chen",
    username: "@davidc99",
    date: "1 week ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede"
  },
  {
    text: "Omegle's one-on-one video chat with girls feature is fantastic. The platform is safe, moderated, and incredibly user-friendly! You can easily find like-minded friends.",
    name: "Emily Rodriguez",
    username: "@emily_rod",
    date: "2 weeks ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=ffdfbf"
  },
  {
    text: "Best free Omegle alternative I've ever found! The random chat rooms and face-to-face interactions are truly incredible! It's super fast and always connects instantly.",
    name: "Alex Thompson",
    username: "@alex_t",
    date: "3 weeks ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=d1d4f9"
  },
  {
    text: "Omegle online has changed how I meet new people. The live chat and anonymous messaging features are great! The community here is always welcoming.",
    name: "Maria Garcia",
    username: "@mariag_xo",
    date: "1 month ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=ffd5dc"
  },
  {
    text: "I love how fast the matchmaking is. No boring sign-ups, just straight to chatting with cool people worldwide. It feels so natural and the overall interface is clean.",
    name: "James Wilson",
    username: "@james_w91",
    date: "1 month ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=c0aede"
  },
  {
    text: "Great experience so far! Met some really interesting folks from different cultures. Highly recommend this site for anyone looking to pass time and have meaningful chats.",
    name: "Linda Smith",
    username: "@linda_smth",
    date: "2 months ago",
    rating: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda&backgroundColor=ffdfbf"
  },
  {
    text: "The anonymity makes it so much easier to open up and just have fun conversations without any pressure. Love it! It's the perfect place to safely express yourself.",
    name: "Michael Brown",
    username: "@mike_b_77",
    date: "2 months ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=b6e3f4"
  },
  {
    text: "Finally a random chat app that doesn't constantly drop connections! Video is super crisp even on mobile data. I can talk for hours without a single glitch at all.",
    name: "Chloe Davis",
    username: "@chloee_d",
    date: "3 months ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe&backgroundColor=ffd5dc"
  },
  {
    text: "It's like the golden days of internet chat rooms but modernized and much safer. Great job to the devs! I will definitely keep coming back to meet wonderful strangers.",
    name: "Robert Taylor",
    username: "@rob_taylor",
    date: "3 months ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert&backgroundColor=d1d4f9"
  }
];

// Sonsuz döngü (infinite loop) yanılsaması için yorumları 3 kere arka arkaya ekliyoruz
const infiniteReviews = [...reviewsData, ...reviewsData, ...reviewsData];

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sayfa yüklendiğinde gizlice 2. setin (ortadaki array) başına kaydırıyoruz.
  // Böylece kullanıcı ilk açtığında hem sağa hem sola kaydırma alanına sahip oluyor.
  useEffect(() => {
    if (scrollRef.current && scrollRef.current.children[10]) {
      const child = scrollRef.current.children[10] as HTMLElement;
      scrollRef.current.scrollTo({ left: child.offsetLeft, behavior: 'auto' });
    }
  }, []);

  const scrollLeftBtn = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const child0 = container.children[0] as HTMLElement;
    const child10 = container.children[10] as HTMLElement;
    const setWidth = child10.offsetLeft - child0.offsetLeft;
    const itemWidth = child0.clientWidth;

    if (container.scrollLeft - itemWidth < child0.offsetLeft + setWidth / 4) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft += setWidth;

      requestAnimationFrame(() => {
        container.style.scrollBehavior = 'smooth';
        container.scrollBy({ left: -itemWidth });
      });
    } else {
      container.style.scrollBehavior = 'smooth';
      container.scrollBy({ left: -itemWidth });
    }
  };

  const scrollRightBtn = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const child10 = container.children[10] as HTMLElement;
    const child20 = container.children[20] as HTMLElement;
    const setWidth = child20.offsetLeft - child10.offsetLeft;
    const itemWidth = child10.clientWidth;

    if (container.scrollLeft + container.clientWidth + itemWidth > child20.offsetLeft + setWidth - (setWidth / 4)) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft -= setWidth;

      requestAnimationFrame(() => {
        container.style.scrollBehavior = 'smooth';
        container.scrollBy({ left: itemWidth });
      });
    } else {
      container.style.scrollBehavior = 'smooth';
      container.scrollBy({ left: itemWidth });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-16">

      {/* Bölüm Başlığı */}
      <div className="flex flex-col items-center justify-center mb-10 gap-2">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Omegle User Reviews
          </h2>
          <p className="text-gray-500 text-lg font-medium">Don't just take our word for it.</p>
        </div>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full flex items-center group">
        
        {/* Sol Tuş */}
        <button
          onClick={scrollLeftBtn}
          className="absolute left-1 md:left-0 z-10 md:-ml-12 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          aria-label="Previous review"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Yatay Kaydırılabilir Carousel Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {infiniteReviews.map((review, index) => {
            return (
              <div
                key={index}
                className="snap-center shrink-0 w-full md:w-1/3 px-12 md:px-3"
              >
                <div className="w-full bg-gray-50/80 rounded-xl p-6 md:p-8 flex flex-col border border-gray-100 hover:bg-gray-100/80 transition-colors mx-auto h-full shadow-sm">
                  {/* Üst Kısım: Avatar, İsim ve @Username */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border border-gray-200">
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-bold text-[16px] md:text-[18px] leading-tight">
                          {review.name}
                        </span>
                        <span className="text-gray-500 text-[14px] md:text-[15px]">
                          {review.username}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Yorum İçeriği */}
                  <p className="text-gray-800 text-[9px] md:text-[16px] leading-relaxed mt-2 font-medium md:text-justify line-clamp-5 min-h-[76px] md:min-h-[130px]">
                    "{review.text}"
                  </p>

                  {/* Alt Kısım: Yıldızlar */}
                  <div className="mt-0 md:mt-3 flex items-center justify-start border-t border-gray-200/60 pt-0.5 md:pt-3">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sağ Tuş */}
        <button
          onClick={scrollRightBtn}
          className="absolute right-1 md:right-0 z-10 md:-mr-12 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          aria-label="Next review"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

      </div>
    </div>
  );
}