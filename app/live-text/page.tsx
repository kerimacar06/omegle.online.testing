'use client'; 

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function TextChatPage() {
  const [messages, setMessages] = useState<{ sender: 'You' | 'Stranger' | 'System', text: string, senderName?: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [currentBot, setCurrentBot] = useState<any>(null);
  const [isDisconnected, setIsDisconnected] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatSessionIdRef = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Yeni biriyle eşleşme fonksiyonu
  const findStranger = async () => {
    const currentSessionId = ++chatSessionIdRef.current;
    setIsSearching(true);
    setIsDisconnected(false);
    setCurrentBot(null);
    setMessages([
      { sender: 'System', text: 'Connecting to server...' },
      { sender: 'System', text: 'Looking for someone you can chat with...' }
    ]);
    
    // Varsa önceki botun mesaj gönderme süresini iptal et
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

        // Botun otomatik mesajını timing süresi kadar sonra gönder
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

  // Sayfa yüklendiğinde bir bot bul
  useEffect(() => {
    findStranger();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isDisconnected || isSearching) return;

    setMessages((prev) => [...prev, { sender: 'You', text: inputValue }]);
    setInputValue('');

    // Sahte rastgele bot cevabı (Demo amaçlı ek olarak tutulabilir, ancak ilk mesaj veritabanından geliyor)
    // Şimdilik ikinci cevap atmayacak, gerçekçi olması için ileride yapay zeka bağlanabilir.
  };

  const handleStop = () => {
    if (isDisconnected) return;
    setIsDisconnected(true);
    chatSessionIdRef.current++; // Invalidate current session
    setMessages(prev => [...prev, { sender: 'System', text: 'You have disconnected.' }]);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      {/* Üst Bar (Header) */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
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

        <div className="flex items-center gap-2">
          {isDisconnected || isSearching ? (
             <button onClick={findStranger} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                Next
             </button>
          ) : (
            <>
              <button onClick={handleStop} className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                Stop
              </button>
              <button onClick={findStranger} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                Next
              </button>
            </>
          )}
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
                  <span className="text-red-500 font-bold mr-2">{msg.senderName || 'Stranger'}:</span>
                  <span className="text-gray-800">{msg.text}</span>
                </div>
              )}
            </div>
          ))}
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
            placeholder={isSearching ? "Searching..." : isDisconnected ? "Disconnected." : "Type your message..."}
            disabled={isSearching || isDisconnected}
            className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-800 disabled:bg-gray-100 disabled:text-gray-400"
            autoFocus
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isSearching || isDisconnected}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center"
          >
            Send
          </button>
        </form>
      </footer>

    </div>
  );
}