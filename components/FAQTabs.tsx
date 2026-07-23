'use client';

import { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQTabs({ faqs }: { faqs: FaqItem[] }) {
  const [activeId, setActiveId] = useState(faqs[0]?.id);
  const active = faqs.find((f) => f.id === activeId) || faqs[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10">

      {/* SOL: Soru listesi (sekmeler) */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {faqs.map((faq) => (
          <button
            key={faq.id}
            onClick={() => setActiveId(faq.id)}
            className={`text-left shrink-0 md:shrink px-4 py-3 rounded-xl text-sm font-semibold transition-colors border ${
              faq.id === active?.id
                ? 'bg-v6-coral text-white border-v6-coral'
                : 'bg-white text-v6-ink-2 border-v6-line hover:border-v6-coral/40'
            }`}
          >
            {faq.question}
          </button>
        ))}
      </div>

      {/* SAĞ: Seçili cevap */}
      <div className="bg-white rounded-2xl border border-v6-line p-6 sm:p-8 min-h-[160px]">
        <h3 className="ch-display text-lg sm:text-xl font-bold text-v6-ink mb-3">{active?.question}</h3>
        <p className="text-sm sm:text-base text-v6-ink-2 leading-relaxed whitespace-pre-wrap">{active?.answer}</p>
      </div>

    </div>
  );
}
