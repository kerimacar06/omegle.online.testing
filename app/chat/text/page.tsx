'use client'; // Bu sayfa kullanıcı etkileşimi (mesaj yazma) içerdiği için Client Component yapıyoruz.

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function TextChatPage() {
  // Mesajları tuttuğumuz state (Başlangıçta sistem mesajları var)
  const [messages, setMessages] = useState<{ sender: 'You' | 'Stranger' | 'System', text: string }[]>([
    { sender: 'System', text: 'Connecting to server...' },
    { sender: 'System', text: 'Looking for someone you can chat with...' },
    { sender: 'System', text: "You're now chatting with a random stranger. Say hi!" }
  ]);
  
  // Input alanındaki yazıyı tuttuğumuz state
  const [inputValue, setInputValue] = useState('');
  
  // Yeni mesaj geldiğinde otomatik en alta kaydırmak için referans
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mesaj gönderme fonksiyonu
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Boş mesaj gönderilmesini engelle

    // Kullanıcının mesajını ekle
    setMessages((prev) => [...prev, { sender: 'You', text: inputValue }]);
    setInputValue(''); // Inputu temizle

    // (SİMÜLASYON) 1.5 saniye sonra karşıdan sahte bir cevap gelsin
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'Stranger', text: 'Hello there!' }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      {/* Üst Bar (Header) */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          {/* Ana Sayfaya Dönüş / Logo Linki */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:block">omegletest.online</span>
          </Link>
        </div>

        {/* Aksiyon Butonları (Stop / Next) */}
        <div className="flex items-center gap-2">
          <button className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
            Stop
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
            Next
          </button>
        </div>
      </header>

      {/* Mesajların Aktığı Ana Alan */}
      <main className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="text-base sm:text-lg leading-relaxed">
              {msg.sender === 'System' && (
                <div className="text-gray-400 font-medium text-sm my-4 text-center">
                  {msg.text}
                </div>
              )}
              {msg.sender === 'You' && (
                <div>
                  <span className="text-blue-600 font-bold mr-2">You:</span>
                  <span className="text-gray-800">{msg.text}</span>
                </div>
              )}
              {msg.sender === 'Stranger' && (
                <div>
                  <span className="text-red-500 font-bold mr-2">Stranger:</span>
                  <span className="text-gray-800">{msg.text}</span>
                </div>
              )}
            </div>
          ))}
          {/* Otomatik kaydırma hedefi */}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Alt Kısım: Mesaj Yazma Alanı (Input & Buton) */}
      <footer className="bg-gray-50 border-t border-gray-200 p-4 shrink-0">
        <form 
          onSubmit={handleSendMessage} 
          className="max-w-4xl mx-auto flex gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-800"
            autoFocus
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center"
          >
            Send
          </button>
        </form>
      </footer>

    </div>
  );
}