'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChatStarter() {
  const [onlineUsers, setOnlineUsers] = useState<number | null>(null);

  useEffect(() => {
    // Sayfa yüklendiğinde daha gerçekçi olması için 1.200 ile 3.500 arası rastgele bir sayı oluşturur
    const randomUsers = Math.floor(Math.random() * (3500 - 1200 + 1)) + 1200;
    setOnlineUsers(randomUsers);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-[clamp(4px,2vw,32px)] px-0 xl:mt-8 relative z-10 flex justify-center">

      <div className="relative xl:-left-[5px] bg-gray-50/70 backdrop-blur-2xl p-[clamp(10px,3vw,40px)] xl:p-10 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-white/60 border border-gray-200 text-center overflow-hidden w-full">

        {/* İçeriklerin üstte kalması için relative container */}
        <div className="relative z-10">

          {/* Canlı (Live) Rozeti */}
          <div className="inline-flex items-center gap-[clamp(3px,0.8vw,8px)] xl:gap-2 bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm px-[clamp(7px,1.6vw,16px)] py-[clamp(3px,0.6vw,6px)] xl:px-4 xl:py-1.5 rounded-full mb-[clamp(7px,1.6vw,20px)] xl:mb-5">
            <span className="relative flex size-[clamp(7px,1.2vw,12px)] xl:size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-[clamp(7px,1.2vw,12px)] xl:size-3 bg-emerald-500"></span>
            </span>
            <span className="text-[clamp(9px,1.8vw,14px)] xl:text-sm font-semibold text-gray-700">
              {onlineUsers ? `${onlineUsers.toLocaleString()} Online` : 'Connecting...'}
            </span>
          </div>

          {/* Başlık ve Slogan */}
          <h1 className="break-words text-[clamp(13px,3.6vw,30px)] xl:text-3xl font-extrabold text-gray-800 mb-2 xl:mb-4 leading-none">
            Start Chatting Anonymously
          </h1>
          <p className="break-words text-gray-600 font-medium text-[clamp(10px,2.4vw,18px)] xl:text-lg mb-[clamp(11px,3vw,32px)] xl:mb-8 max-w-md mx-auto leading-none">
            Meet new people instantly. Safe, private, and no registration required.
          </p>

          {/* Çalışan Yönlendirme Butonları */}
          <div className="flex flex-col xl:flex-row gap-[clamp(5px,1.6vw,12px)] xl:gap-3">

            {/* TEXT SOHBET BUTONU */}
            <Link
              href="/live-text"
              className="group flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-[clamp(5px,1.4vw,12px)] px-[clamp(6px,1.6vw,20px)] xl:py-3 xl:px-4 rounded-md transition-colors duration-300 text-[clamp(10px,2vw,16px)] xl:text-[14px] shadow-md hover:shadow-lg text-center flex items-center justify-center gap-[clamp(4px,1.1vw,8px)] xl:gap-1.5 border border-blue-700/20"
            >
              <div className="bg-white/20 p-[clamp(2px,0.7vw,4px)] xl:p-1 rounded-md">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-[clamp(13px,2.4vw,20px)] xl:size-4 text-white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              Text Chat
            </Link>

            {/* VİDEO SOHBET BUTONU */}
            <Link
              href="/live-video"
              className="group flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-[clamp(5px,1.4vw,12px)] px-[clamp(6px,1.6vw,20px)] xl:py-3 xl:px-4 rounded-md transition-colors duration-300 text-[clamp(10px,2vw,16px)] xl:text-[14px] shadow-md hover:shadow-lg text-center flex items-center justify-center gap-[clamp(4px,1.1vw,8px)] xl:gap-1.5 border border-slate-900/20"
            >
              <div className="bg-white/20 p-[clamp(2px,0.7vw,4px)] xl:p-1 rounded-md">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-[clamp(13px,2.4vw,20px)] xl:size-4 text-white">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </div>
              Video Chat
            </Link>

          </div>

        </div>{/* relative z-10 Bitişi */}
      </div>
    </div>
  );
}