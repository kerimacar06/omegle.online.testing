'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChatStarter() {
  const [onlineUsers, setOnlineUsers] = useState<number | null>(null);

  useEffect(() => {
    // Sayfa yüklendiğinde daha gerçekçi olması için 1.200 ile 3.500 arası rastgele bir sayı oluşturur.
    // Bilerek effect içinde: sunucu ve istemci farklı rastgele değerler üretirse hydration mismatch
    // olur, bu yüzden ilk render null kalıp gerçek değer sadece istemcide (mount sonrası) atanıyor.
    const randomUsers = Math.floor(Math.random() * (3500 - 1200 + 1)) + 1200;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnlineUsers(randomUsers);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-[clamp(4px,2vw,32px)] px-0 xl:mt-8 relative z-10 flex justify-center">

      <div className="pc-card relative w-full p-[clamp(14px,3vw,36px)] xl:p-9 text-center overflow-visible xl:rotate-1">

        {/* Pasaport damgası — sağ üst köşede, kartpostal görünümü */}
        <div className="pc-stamp absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-pc-card flex flex-col items-center justify-center text-pc-teal rotate-12 shrink-0">
          <span className="relative flex size-2 mb-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pc-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-pc-teal"></span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide leading-tight text-center px-1">
            {onlineUsers ? onlineUsers.toLocaleString() : '...'}
          </span>
          <span className="text-[7px] sm:text-[8px] uppercase tracking-wide opacity-70">Online</span>
        </div>

        <div className="relative z-10 pt-2">
          {/* Başlık ve Slogan */}
          <h1 className="pc-display break-words text-[clamp(16px,4.2vw,30px)] xl:text-3xl text-pc-ink mb-3 xl:mb-4 leading-[1.15]">
            Start Chatting Anonymously
          </h1>
          <p className="break-words text-pc-ink-2 text-[clamp(10px,2.4vw,16px)] xl:text-base mb-[clamp(13px,3vw,32px)] xl:mb-8 max-w-sm mx-auto leading-snug">
            Meet new people instantly. Safe, private, and no registration required.
          </p>

          {/* Çalışan Yönlendirme Butonları */}
          <div className="flex flex-col xl:flex-row gap-[clamp(6px,1.6vw,12px)] xl:gap-3">

            <Link
              href="/live-text"
              className="pc-btn-outline group flex-1 font-bold py-[clamp(6px,1.4vw,12px)] px-[clamp(6px,1.6vw,20px)] xl:py-3 xl:px-4 text-[clamp(10px,2vw,15px)] xl:text-sm text-center flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-pc-ink-2">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              Text Chat
            </Link>

            <Link
              href="/live-video"
              className="pc-btn group flex-1 font-bold py-[clamp(6px,1.4vw,12px)] px-[clamp(6px,1.6vw,20px)] xl:py-3 xl:px-4 text-[clamp(10px,2vw,15px)] xl:text-sm text-center flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              Video Chat
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
