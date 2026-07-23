'use client';

import { useRef, useState } from 'react';

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

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Belirli bir slayta kaydır (gerçek yatay kaydırma hissi için native scroll kullanıyoruz)
  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + reviewsData.length) % reviewsData.length;
    const item = track.children[clamped] as HTMLElement | undefined;
    if (item) {
      track.scrollTo({ left: item.offsetLeft, behavior: 'smooth' });
    }
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Kullanıcı elle kaydırdıkça (mobilde parmakla) aktif noktayı senkron tut
  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const dist = Math.abs(el.offsetLeft - track.scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setIndex(closest);
    }, 100);
  };

  return (
    <div className="band-teal w-full py-12 sm:py-20 border-b border-v6-line">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

        <span className="text-white/70 font-bold text-xs tracking-[0.2em] uppercase mb-2 block">Reviews</span>
        <h2 className="ch-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 sm:mb-14 leading-none">
          Omegle User Reviews
        </h2>

        {/* Yatay kaydırılabilir "spotlight" şeridi — parmakla/native scroll ile gerçek kayma hissi */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {reviewsData.map((review, i) => (
            <div key={i} className="snap-center shrink-0 w-full flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 mb-5">
                {[...Array(review.rating)].map((_, star) => (
                  <svg key={star} className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <div className="h-[130px] sm:h-[160px] md:h-[190px] flex items-center mb-8 px-2">
                <p className="ch-display text-lg sm:text-2xl md:text-3xl text-white font-semibold leading-snug max-w-2xl text-justify line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-sm">{review.name}</div>
                  <div className="text-white/60 text-xs">{review.username}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kontroller: ok butonları + nokta göstergeleri */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="flex items-center gap-1.5">
            {reviewsData.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>
    </div>
  );
}
