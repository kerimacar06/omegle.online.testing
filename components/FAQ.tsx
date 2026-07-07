import { faqService } from "@/services/faqService";

async function getFaqs() {
  return await faqService.getActiveFaqs();
}

export default async function FAQ() {
  const faqs = await getFaqs();

  if (faqs.length === 0) return null;

  return (
    <div className="w-full py-8 sm:py-16 border-t border-gray-100">
      <div className="w-full max-w-3xl mx-auto px-4">
        
        {/* Ortalanmış Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold md:font-extrabold text-gray-900 mb-2 leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg font-medium leading-none">
            Everything you need to know about our service.
          </p>
        </div>

        {/* Chat Balonu Tarzı SSS Listesi */}
        <div className="space-y-4">
          {faqs.map((faq: any) => (
            <details 
              key={faq._id.toString()} 
              className="group bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 [&_summary::-webkit-details-marker]:hidden border border-white/50"
            >
              {/* Soru (Mesaj Balonu) */}
              <summary className="flex cursor-pointer items-center justify-between px-8 py-2 focus:outline-none">
                <span className="font-bold text-gray-800 text-[16px] pr-4">{faq.question}</span>

                {/* Yumuşak Ok İkonu */}
                <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform duration-300 group-open:-rotate-180">
                  <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>

              {/* Cevap */}
              <div className="px-8 pb-5 pt-0 text-gray-600 text-[15px] leading-relaxed font-medium whitespace-pre-wrap border-t border-gray-100/50">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </div>
  );
}