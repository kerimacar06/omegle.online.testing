'use client';

import Link from 'next/link';

export default function ChatStarter() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4 sm:px-6">
      {/* Giriş Kartı */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
        
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
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-sm text-center transform hover:scale-[1.02]"
          >
            Text
          </Link>
          
          {/* VİDEO SOHBET BUTONU */}
          <Link 
            href="/chat/video" 
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-sm text-center transform hover:scale-[1.02]"
          >
            Video
          </Link>
          
        </div>

      </div>
    </div>
  );
}