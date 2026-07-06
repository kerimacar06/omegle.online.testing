import { faqService } from "@/services/faqService";

async function getFaqs() {
  return await faqService.getActiveFaqs();
}

export default async function FAQ() {
  const faqs = await getFaqs();

  if (faqs.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-16">
      <div className="w-full max-w-3xl mx-auto px-4">
        
        {/* Ortalanmış Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[16px] text-gray-500 max-w-2xl mx-auto font-medium">
            Everything you need to know about our service.
          </p>
        </div>

        {/* Chat Balonu Tarzı SSS Listesi */}
        <div className="space-y-4">
          {faqs.map((faq: any) => (
            <details 
              key={faq._id.toString()} 
              className="group bg-white rounded-[32px] shadow-sm hover:shadow-md transition-all duration-300 [&_summary::-webkit-details-marker]:hidden border border-white/50"
            >
              {/* Soru (Mesaj Balonu) */}
              <summary className="flex cursor-pointer items-center justify-between px-8 py-5 focus:outline-none">
                <span className="font-bold text-gray-800 text-[16px] pr-4">{faq.question}</span>
                
                {/* Yumuşak Ok İkonu */}
                <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform duration-300 group-open:-rotate-180">
                  <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              
              {/* Cevap */}
              <div className="px-8 pb-7 pt-1 text-gray-600 text-[15px] leading-relaxed font-medium whitespace-pre-wrap border-t border-gray-100/50 mt-1 mx-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </div>
  );
}