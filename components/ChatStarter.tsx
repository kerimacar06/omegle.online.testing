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
    <div className="w-full max-w-2xl mx-auto mt-[clamp(4px,2vw,32px)] px-0 xl:mt-8 relative z-10 flex justify-center">

      <div className="relative pop-card p-[clamp(10px,3vw,40px)] xl:p-10 text-center overflow-hidden w-full xl:-rotate-1">

        {/* İçeriklerin üstte kalması için relative container */}
        <div className="relative z-10">

          {/* Canlı (Live) Rozeti */}
          <div className="inline-flex items-center gap-[clamp(3px,0.8vw,8px)] xl:gap-2 pop-badge px-[clamp(7px,1.6vw,16px)] py-[clamp(3px,0.6vw,6px)] xl:px-4 xl:py-1.5 mb-[clamp(7px,1.6vw,20px)] xl:mb-5">
            <span className="relative flex size-[clamp(7px,1.2vw,12px)] xl:size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pop-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full size-[clamp(7px,1.2vw,12px)] xl:size-3 bg-pop-teal"></span>
            </span>
            <span className="text-[clamp(9px,1.8vw,14px)] xl:text-sm font-bold text-pop-ink-2">
              {onlineUsers ? `${onlineUsers.toLocaleString()} Online` : 'Connecting...'}
            </span>
          </div>

          {/* Başlık ve Slogan */}
          <h1 className="pop-display break-words text-[clamp(15px,4vw,32px)] xl:text-4xl text-pop-ink mb-2 xl:mb-4 leading-[1.05]">
            Start Chatting <span className="bg-gradient-to-r from-pop-pink to-pop-purple bg-clip-text text-transparent">Anonymously</span>
          </h1>
          <p className="break-words text-pop-ink-2 font-medium text-[clamp(10px,2.4vw,18px)] xl:text-lg mb-[clamp(11px,3vw,32px)] xl:mb-8 max-w-md mx-auto leading-snug">
            Meet new people instantly. Safe, private, and no registration required.
          </p>

          {/* Çalışan Yönlendirme Butonları */}
          <div className="flex flex-col xl:flex-row gap-[clamp(5px,1.6vw,12px)] xl:gap-3">

            {/* TEXT SOHBET BUTONU */}
            <Link
              href="/live-text"
              className="pop-btn-outline group flex-1 font-bold py-[clamp(5px,1.4vw,12px)] px-[clamp(6px,1.6vw,20px)] xl:py-3 xl:px-4 text-[clamp(10px,2vw,16px)] xl:text-[14px] text-center flex items-center justify-center gap-[clamp(4px,1.1vw,8px)] xl:gap-1.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[clamp(13px,2.4vw,20px)] xl:size-4 text-pop-purple">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              Text Chat
            </Link>

            {/* VİDEO SOHBET BUTONU */}
            <Link
              href="/live-video"
              className="pop-btn group flex-1 font-bold py-[clamp(5px,1.4vw,12px)] px-[clamp(6px,1.6vw,20px)] xl:py-3 xl:px-4 text-[clamp(10px,2vw,16px)] xl:text-[14px] text-center flex items-center justify-center gap-[clamp(4px,1.1vw,8px)] xl:gap-1.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[clamp(13px,2.4vw,20px)] xl:size-4 text-white">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              Video Chat
            </Link>

          </div>

        </div>{/* relative z-10 Bitişi */}
      </div>
    </div>
  );
}
