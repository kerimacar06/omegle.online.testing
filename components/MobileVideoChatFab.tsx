'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MobileVideoChatFab({ watchId }: { watchId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sadece buton yukarı doğru kaydırılıp geçildiğinde (viewport'un üstünde kaldığında)
        // FAB'ı göster. Henüz ulaşılmamışsa (buton hâlâ aşağıda, ekrana girmemiş) gösterme.
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setVisible(scrolledPast);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <Link
      href="/live-video"
      aria-label="Start Video Chat"
      className={`lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg border border-blue-700/20 transition-all duration-300 ${
        visible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
      </svg>
    </Link>
  );
}
