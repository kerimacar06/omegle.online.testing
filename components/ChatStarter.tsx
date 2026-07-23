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
    <div className="w-full max-w-2xl mx-auto px-0 relative z-10 flex justify-center">

      {/* Kart/çerçeve yok — içerik doğrudan koyu bant zemininin üzerinde oturuyor */}
      <div className="relative w-full text-center">

        {/* Canlı (Live) Rozeti */}
        <div className="inline-flex items-center gap-2 border border-white/20 px-4 py-1.5 rounded-full mb-5">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-v6-coral opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-v6-coral"></span>
          </span>
          <span className="text-sm font-semibold text-white/90">
            {onlineUsers ? `${onlineUsers.toLocaleString()} Online` : 'Connecting...'}
          </span>
        </div>

        {/* Başlık ve Slogan */}
        <h1 className="ch-display break-words text-[clamp(28px,7vw,56px)] font-bold text-white mb-4 leading-[1.05]">
          Start Chatting <span className="text-v6-coral">Anonymously</span>
        </h1>
        <p className="break-words text-white/70 font-medium text-base sm:text-lg mb-8 max-w-md mx-auto leading-snug">
          Meet new people instantly. Safe, private, and no registration required.
        </p>

        {/* Çalışan Yönlendirme Butonları */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <Link
            href="/live-text"
            className="ch-btn-outline group flex-1 sm:flex-none sm:min-w-[160px] text-white font-bold py-3 px-6 text-sm sm:text-base text-center flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            Text Chat
          </Link>

          <Link
            href="/live-video"
            className="ch-btn group flex-1 sm:flex-none sm:min-w-[160px] font-bold py-3 px-6 text-sm sm:text-base text-center flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            Video Chat
          </Link>

        </div>

      </div>
    </div>
  );
}
