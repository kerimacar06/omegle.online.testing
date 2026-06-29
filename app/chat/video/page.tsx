'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function VideoChatPage() {
  const [messages, setMessages] = useState<{ sender: 'You' | 'Stranger' | 'System', text: string }[]>([
    { sender: 'System', text: 'Looking for someone you can chat with...' },
    { sender: 'System', text: "You're now chatting with a random stranger. Say hi!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function startCamera() {
      try {
        // Tarayıcıdan video ve ses izni iste (Mikrofon iznini test için 'false' yapabilirsin)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        setCameraError("Camera access denied or no camera found.");
        console.error("Kamera hatası:", err);
      }
    }

    startCamera();

    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { sender: 'You', text: inputValue }]);
    setInputValue('');

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'Stranger', text: 'Hey, nice to meet you!' }]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      
      {/* Üst Bar */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:block text-white">omegletest.online</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
            Stop
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
            Next
          </button>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* SOL TARAF: Video Kameraları */}
        <div className="flex-1 flex flex-col gap-3 p-3 bg-black border-r border-gray-800 overflow-y-auto">
          
          {/* Stranger Kamerası (Sahte - YAKALANDI: Artık daha geniş) */}
          <div className="flex-1 bg-gray-800 rounded-xl relative overflow-hidden flex items-center justify-center border border-gray-700 group min-h-[30vh]">
            <span className="text-gray-500 font-medium text-sm">Stranger's Camera Loading...</span>
            <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg text-xs font-bold text-white backdrop-blur-sm z-10">
              Stranger
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all"></div>
          </div>

          {/* Senin Kameran (GERÇEK KAMERA BAĞLANTISI - GÜNCELLENDİ: Artık daha geniş ve esnek) */}
          <div className="flex-1 bg-gray-800 rounded-xl relative overflow-hidden flex items-center justify-center border border-gray-700 aspect-[4/3] min-h-[30vh]">
            {cameraError ? (
              <span className="text-red-500 font-medium text-sm text-center px-4">{cameraError}</span>
            ) : (
              <video 
                ref={localVideoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover object-center scale-x-[-1]" 
              />
            )}
            <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg text-xs font-bold text-white backdrop-blur-sm z-10">
              You
            </div>
          </div>

        </div>

        {/* SAĞ TARAF: Mesajlaşma Alanı */}
        <div className="w-full md:w-96 flex flex-col bg-gray-900 shrink-0 border-t md:border-t-0 md:border-l border-gray-700">
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="text-sm leading-relaxed">
                {msg.sender === 'System' && (
                    <div className="text-gray-500 font-medium my-3 text-center text-xs uppercase tracking-wider bg-gray-800 p-2 rounded-lg border border-gray-700">
                        {msg.text}
                    </div>
                )}
                {msg.sender === 'You' && (
                  <div>
                    <span className="text-blue-400 font-bold mr-2">You:</span>
                    <span className="text-gray-200">{msg.text}</span>
                  </div>
                )}
                {msg.sender === 'Stranger' && (
                  <div>
                    <span className="text-red-400 font-bold mr-2">Stranger:</span>
                    <span className="text-gray-200">{msg.text}</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-500 text-sm"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Send
              </button>
            </form>
          </div>
          
        </div>
      </main>

    </div>
  );
}