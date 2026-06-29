'use client'; 

import { useState } from 'react';

const faqData = [
  {
    question: "What is Omegletest.online?",
    answer: "Omegletest.online is a free online chat website that allows you to talk to strangers around the world without registration. It's a modern alternative to classic chat platforms."
  },
  {
    question: "Is Omegletest.online completely free?",
    answer: "Yes! You can use both text and video chat features without paying any fees or subscriptions."
  },
  {
    question: "Do I need to create an account?",
    answer: "No. We believe in anonymity. You can start chatting instantly without sharing your email or phone number."
  },
  {
    question: "Is it safe to use?",
    answer: "While we use AI moderation to keep the community clean, we always recommend users to stay anonymous and never share personal information with strangers."
  }
];

export default function FAQ() {
  // ARTIK TEK BİR SAYI DEĞİL, AÇIK OLANLARIN İNDEKSLERİNİ TUTAN BİR LİSTE/DİZİ KULLANIYORUZ
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) => {
      // Eğer tıklanan indeks zaten listedeyse, onu listeden çıkar (Kapat)
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      // Eğer listede yoksa, onu listeye ekle (Aç)
      return [...prev, index];
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-16 px-4 pb-20">
      
      {/* Bölüm Başlığı */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Frequently Asked Questions
      </h2>

      {/* SSS Listesi */}
      <div className="space-y-4">
        {faqData.map((faq, index) => {
          // Bu sorunun indeksi açıklar listesinde var mı diye kontrol ediyoruz
          const isOpen = openIndexes.includes(index);

          return (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all"
            >
              {/* Soru Kısmı (Tıklanabilir Alan) */}
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>{faq.question}</span>
                {/* Açık/Kapalı oku */}
                <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  &darr;
                </span>
              </button>

              {/* Cevap Kısmı (Sadece isOpen true ise görünür) */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-500 text-sm sm:text-base border-t border-gray-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}