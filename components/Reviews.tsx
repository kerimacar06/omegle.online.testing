'use client';

import { useRef, useEffect } from 'react';

const reviewsData = [
  {
    text: "Omegle is the best video chat platform for meeting strangers online. The gender filtering and instant connection features work perfectly!",
    name: "Sarah Johnson",
    username: "@sarah_j",
    date: "2 days ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4"
  },
  {
    text: "I've been using Omegle for anonymous video chat and it's amazing. The HD video quality and secure messaging are top-notch!",
    name: "David Chen",
    username: "@davidc99",
    date: "1 week ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede"
  },
  {
    text: "Omegle's one-on-one video chat with girls feature is fantastic. The platform is safe, moderated, and user-friendly!",
    name: "Emily Rodriguez",
    username: "@emily_rod",
    date: "2 weeks ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=ffdfbf"
  },
  {
    text: "Best free Omegle alternative I've found! The random chat rooms and face-to-face interactions are incredible!",
    name: "Alex Thompson",
    username: "@alex_t",
    date: "3 weeks ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=d1d4f9"
  },
  {
    text: "Omegle online has revolutionized how I meet new people. The live chat and anonymous messaging features are outstanding!",
    name: "Maria Garcia",
    username: "@mariag_xo",
    date: "1 month ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=ffd5dc"
  },
  {
    text: "I love how fast the matchmaking is. No boring sign-ups, just straight to chatting with cool people worldwide.",
    name: "James Wilson",
    username: "@james_w91",
    date: "1 month ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=c0aede"
  },
  {
    text: "Great experience so far! Met some really interesting folks from different cultures. Highly recommend this site.",
    name: "Linda Smith",
    username: "@linda_smth",
    date: "2 months ago",
    rating: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda&backgroundColor=ffdfbf"
  },
  {
    text: "The anonymity makes it so much easier to open up and just have fun conversations without any pressure. Love it!",
    name: "Michael Brown",
    username: "@mike_b_77",
    date: "2 months ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=b6e3f4"
  },
  {
    text: "Finally a random chat app that doesn't constantly drop connections! Video is super crisp even on mobile data.",
    name: "Chloe Davis",
    username: "@chloee_d",
    date: "3 months ago",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe&backgroundColor=ffd5dc"
  },
  {
    text: "It's like the golden days of internet chat rooms but modernized and much safer. Great job to the devs!",
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
    
    // 10 elemanlık tek bir setin tam genişliğini hesapla
    const child0 = container.children[0] as HTMLElement;
    const child10 = container.children[10] as HTMLElement;
    const setWidth = child10.offsetLeft - child0.offsetLeft;

    // Eğer sola kaydırdığımızda 1. sete (en başa) çok yaklaşırsak, 
    // gizlice anında (animasyonsuz) 2. sete atla ve ardından kaydırma animasyonunu yap.
    if (container.scrollLeft - 360 < child0.offsetLeft + setWidth / 4) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft += setWidth;
      
      requestAnimationFrame(() => {
        container.style.scrollBehavior = 'smooth';
        container.scrollBy({ left: -360 });
      });
    } else {
      container.style.scrollBehavior = 'smooth';
      container.scrollBy({ left: -360 });
    }
  };

  const scrollRightBtn = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    const child10 = container.children[10] as HTMLElement;
    const child20 = container.children[20] as HTMLElement;
    const setWidth = child20.offsetLeft - child10.offsetLeft;

    // Eğer sağa kaydırdığımızda 3. sete (en sona) çok yaklaşırsak, 
    // gizlice anında (animasyonsuz) geriye 2. sete atla ve ardından kaydırma animasyonunu yap.
    if (container.scrollLeft + container.clientWidth + 360 > child20.offsetLeft + setWidth - (setWidth / 4)) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft -= setWidth;
      
      requestAnimationFrame(() => {
        container.style.scrollBehavior = 'smooth';
        container.scrollBy({ left: 360 });
      });
    } else {
      container.style.scrollBehavior = 'smooth';
      container.scrollBy({ left: 360 });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 px-4 pb-16">
      
      {/* Bölüm Başlığı & Oklar */}
      <div className="flex flex-col items-center justify-center mb-10 gap-6 relative">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Omegle User Reviews
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Don't just take our word for it.</p>
        </div>
        
        {/* Yön Tuşları */}
        <div className="flex items-center gap-2 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
          <button 
            onClick={scrollLeftBtn}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
            aria-label="Previous reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={scrollRightBtn}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
            aria-label="Next reviews"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Yatay Kaydırılabilir Carousel Container (Sonsuz Döngü İçin Relative eklendi) */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto relative gap-5 snap-x snap-mandatory pb-4 pt-2 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {infiniteReviews.map((review, index) => {
          return (
            <div 
              key={index}
              className="snap-center shrink-0 w-[280px] md:w-[340px] bg-gray-50/80 rounded-3xl p-6 flex flex-col border border-gray-100 hover:bg-gray-100/80 transition-colors"
            >
              {/* Üst Kısım: Avatar, İsim ve @Username */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-bold text-[15px] leading-tight">
                      {review.name}
                    </span>
                    <span className="text-gray-500 text-[14px]">
                      {review.username}
                    </span>
                  </div>
                </div>
              </div>

              {/* Yorum / Tweet İçeriği */}
              <p className="text-gray-800 text-[15px] leading-relaxed mb-5 mt-1 font-medium">
                {review.text}
              </p>

              {/* Alt Kısım: Yıldızlar */}
              <div className="mt-auto flex items-center justify-start border-t border-gray-200/60 pt-4">
                {/* Yıldızlar */}
                <div className="flex items-center gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}