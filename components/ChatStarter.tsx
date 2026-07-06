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
    <div className="w-full max-w-2xl mx-auto mt-8 px-4 sm:px-6">
      {/* Giriş Kartı */}
      <div className="relative bg-white/60 backdrop-blur-2xl p-6 sm:p-10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-2 border-white text-center overflow-hidden">
        
        {/* İnce Arka Plan Deseni (Noktalı Izgara) */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

        {/* İçeriklerin üstte kalması için relative container */}
        <div className="relative z-10">

          {/* Canlı (Live) Rozeti */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm px-4 py-1.5 rounded-full mb-5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {onlineUsers ? `${onlineUsers.toLocaleString()} Online Now` : 'Connecting...'}
            </span>
          </div>

          {/* Başlık ve Slogan */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
          Start Chatting Anonymously
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
          Meet new people instantly using your webcam or text chat. Safe, private, and no registration required.
        </p>

        {/* Çalışan Yönlendirme Butonları */}
        <div className="flex flex-col sm:flex-row gap-4">

          {/* TEXT SOHBET BUTONU */}
          <Link
            href="/chat/text"
            className="group flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-lg shadow-md hover:shadow-lg text-center flex items-center justify-center gap-3 border border-blue-600/20"
          >
            <div className="bg-white/20 p-1.5 rounded-md">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            Text Chat
          </Link>

          {/* VİDEO SOHBET BUTONU */}
          <Link
            href="/chat/video"
            className="group flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-lg shadow-md hover:shadow-lg text-center flex items-center justify-center gap-3 border border-rose-600/20"
          >
            <div className="bg-white/20 p-1.5 rounded-md">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
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