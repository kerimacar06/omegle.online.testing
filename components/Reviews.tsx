'use client';

import { useRef, useEffect } from 'react';

const reviewsData = [
  {
    text: "Omegle is the best video chat platform for meeting strangers. The gender filtering and instant connection features work great! Highly recommended.",
    name: "Sarah Johnson",
    username: "@sarah_j",
    date: "2 days ago",
    rating: 5,
    avatar: "/reviews/sarah.png"
  },
  {
    text: "I've been using Omegle for anonymous video chat and it's amazing. The HD video quality and secure messaging are top-notch! I haven't seen anything like it.",
    name: "David Chen",
    username: "@davidc99",
    date: "1 week ago",
    rating: 5,
    avatar: "/reviews/david.png"
  },
  {
    text: "Omegle's one-on-one video chat with girls feature is fantastic. The platform is safe, moderated, and incredibly user-friendly! You can easily find like-minded friends.",
    name: "Emily Rodriguez",
    username: "@emily_rod",
    date: "2 weeks ago",
    rating: 5,
    avatar: "/reviews/emily.png"
  },
  {
    text: "Best free Omegle alternative I've ever found! The random chat rooms and face-to-face interactions are truly incredible! It's super fast and always connects instantly.",
    name: "Alex Thompson",
    username: "@alex_t",
    date: "3 weeks ago",
    rating: 5,
    avatar: "/reviews/alex.png"
  },
  {
    text: "Omegle online has changed how I meet new people. The live chat and anonymous messaging features are great! The community here is always welcoming.",
    name: "Maria Garcia",
    username: "@mariag_xo",
    date: "1 month ago",
    rating: 5,
    avatar: "/reviews/maria.png"
  },
  {
    text: "I love how fast the matchmaking is. No boring sign-ups, just straight to chatting with cool people worldwide. It feels so natural and the overall interface is clean.",
    name: "James Wilson",
    username: "@james_w91",
    date: "1 month ago",
    rating: 5,
    avatar: "/reviews/james.png"
  },
  {
    text: "Great experience so far! Met some really interesting folks from different cultures. Highly recommend this site for anyone looking to pass time and have meaningful chats.",
    name: "Linda Smith",
    username: "@linda_smth",
    date: "2 months ago",
    rating: 4,
    avatar: "/reviews/linda.png"
  },
  {
    text: "The anonymity makes it so much easier to open up and just have fun conversations without any pressure. Love it! It's the perfect place to safely express yourself.",
    name: "Michael Brown",
    username: "@mike_b_77",
    date: "2 months ago",
    rating: 5,
    avatar: "/reviews/michael.png"
  },
  {
    text: "Finally a random chat app that doesn't constantly drop connections! Video is super crisp even on mobile data. I can talk for hours without a single glitch at all.",
    name: "Chloe Davis",
    username: "@chloee_d",
    date: "3 months ago",
    rating: 5,
    avatar: "/reviews/chloe.png"
  },
  {
    text: "It's like the golden days of internet chat rooms but modernized and much safer. Great job to the devs! I will definitely keep coming back to meet wonderful strangers.",
    name: "Robert Taylor",
    username: "@rob_taylor",
    date: "3 months ago",
    rating: 5,
    avatar: "/reviews/robert.png"
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
          <h2 className="pc-display text-2xl sm:text-3xl md:text-4xl text-pc-ink mb-2 leading-none">
            Omegle User Reviews
          </h2>
          <p className="text-pc-ink-2 text-xs sm:text-lg leading-none">Don&apos;t just take our word for it.</p>
        </div>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full flex items-center group">

        {/* Sol Tuş */}
        <button
          type="button"
          onClick={scrollLeftBtn}
          className="pc-stamp absolute left-1 md:left-0 z-10 md:-ml-12 w-8 h-8 md:w-12 md:h-12 bg-pc-card flex items-center justify-center text-pc-ink-2 hover:text-pc-rust transition-colors touch-manipulation"
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
                {/* Her yorum küçük bir kartpostal olarak gösteriliyor */}
                <div className="pc-card-static relative w-full p-5 md:p-7 flex flex-col mx-auto h-full">

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 border-2 border-pc-line">
                      <img src={review.avatar} alt={review.name} className="w-full h-full object-cover sepia-[0.2]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-pc-ink font-bold text-sm md:text-base leading-tight truncate">
                        {review.name}
                      </span>
                      <span className="text-pc-ink-3 text-xs md:text-sm">
                        {review.username}
                      </span>
                    </div>
                  </div>

                  <p className="pc-display text-pc-ink-2 text-xs md:text-sm leading-relaxed mt-1 md:text-justify line-clamp-5 min-h-[80px] md:min-h-[130px]">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="mt-3 flex items-center gap-2.5 justify-start border-t-2 border-dashed border-pc-line pt-3">
                    <span className="pc-stamp shrink-0 w-9 h-9 bg-pc-card flex items-center justify-center text-pc-mustard text-[11px] font-bold">
                      {review.rating.toFixed(1)}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-pc-mustard" fill="currentColor" viewBox="0 0 20 20">
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
          type="button"
          onClick={scrollRightBtn}
          className="pc-stamp absolute right-1 md:right-0 z-10 md:-mr-12 w-8 h-8 md:w-12 md:h-12 bg-pc-card flex items-center justify-center text-pc-ink-2 hover:text-pc-rust transition-colors touch-manipulation"
          aria-label="Next review"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

      </div>
    </div>
  );
}
