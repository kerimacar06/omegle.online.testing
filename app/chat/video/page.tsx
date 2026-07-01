'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function VideoChatPage() {
  const [messages, setMessages] = useState<{ sender: 'You' | 'Stranger' | 'System', text: string, senderName?: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [currentBot, setCurrentBot] = useState<any>(null);
  const [isDisconnected, setIsDisconnected] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatSessionIdRef = useRef(0);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findStranger = async () => {
    const currentSessionId = ++chatSessionIdRef.current;
    setIsSearching(true);
    setIsDisconnected(false);
    setCurrentBot(null);
    setMessages([
      { sender: 'System', text: 'Connecting to server...' },
      { sender: 'System', text: 'Looking for someone you can chat with...' }
    ]);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      const res = await fetch('/api/bots/random');
      if (currentSessionId !== chatSessionIdRef.current) return;

      if (res.ok) {
        const bot = await res.json();
        setCurrentBot(bot);
        setIsSearching(false);
        
        setMessages(prev => [
          ...prev, 
          { sender: 'System', text: `You're now chatting with a random stranger. Say hi!` }
        ]);

        timeoutRef.current = setTimeout(() => {
          if (currentSessionId === chatSessionIdRef.current) {
            setMessages(prev => [
              ...prev, 
              { sender: 'Stranger', text: bot.autoMessage, senderName: bot.name }
            ]);
          }
        }, bot.timing || 2000);

      } else {
        setIsSearching(false);
        setMessages(prev => [...prev, { sender: 'System', text: 'No active strangers found right now.' }]);
      }
    } catch (error) {
      if (currentSessionId !== chatSessionIdRef.current) return;
      setIsSearching(false);
      setMessages(prev => [...prev, { sender: 'System', text: 'Connection failed.' }]);
    }
  };

  useEffect(() => {
    findStranger();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    async function startCamera() {
      try {
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
    if (!inputValue.trim() || isDisconnected || isSearching) return;

    setMessages((prev) => [...prev, { sender: 'You', text: inputValue }]);
    setInputValue('');
  };

  const handleStop = () => {
    if (isDisconnected) return;
    setIsDisconnected(true);
    chatSessionIdRef.current++; // Invalidate current session
    setMessages(prev => [...prev, { sender: 'System', text: 'You have disconnected.' }]);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
          {isDisconnected || isSearching ? (
             <button onClick={findStranger} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                Next
             </button>
          ) : (
            <>
              <button onClick={handleStop} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                Stop
              </button>
              <button onClick={findStranger} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                Next
              </button>
            </>
          )}
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* SOL TARAF: Video Kameraları */}
        <div className="flex-1 flex flex-col gap-3 p-3 bg-black border-r border-gray-800 overflow-y-auto">
          
          {/* Stranger Kamerası */}
          <div className="flex-1 bg-gray-800 rounded-xl relative overflow-hidden flex items-center justify-center border border-gray-700 group min-h-[30vh]">
            <span className="text-gray-500 font-medium text-sm">
              {isSearching ? "Searching for stranger..." : isDisconnected ? "Disconnected." : "Stranger's Camera Loading..."}
            </span>
            <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg text-xs font-bold text-white backdrop-blur-sm z-10">
              {currentBot ? currentBot.name : 'Stranger'}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all"></div>
          </div>

          {/* Senin Kameran */}
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
                    <span className="text-red-400 font-bold mr-2">{msg.senderName || 'Stranger'}:</span>
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
                placeholder={isSearching ? "Searching..." : isDisconnected ? "Disconnected." : "Type a message..."}
                disabled={isSearching || isDisconnected}
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-500 text-sm disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isSearching || isDisconnected}
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