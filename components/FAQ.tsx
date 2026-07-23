import { faqService } from "@/services/faqService";

interface FaqItem {
  _id: { toString(): string };
  question: string;
  answer: string;
}

async function getFaqs() {
  return await faqService.getActiveFaqs();
}

export default async function FAQ() {
  const faqs = await getFaqs();

  if (faqs.length === 0) return null;

  return (
    <div id="faq" className="w-full scroll-mt-24 py-8 sm:py-16 border-t-3 border-ink" style={{ borderTopWidth: 3 }}>
      <div className="w-full max-w-3xl mx-auto px-4">

        {/* Ortalanmış Başlık */}
        <div className="text-center mb-12">
          <h2 className="brut-display text-2xl sm:text-3xl md:text-4xl text-ink mb-2 leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-ink/70 text-xs sm:text-lg font-semibold leading-none">
            Everything you need to know about our service.
          </p>
        </div>

        {/* SSS Listesi */}
        <div className="space-y-4">
          {faqs.map((faq: FaqItem) => (
            <details
              key={faq._id.toString()}
              className="group brut-card-static [&_summary::-webkit-details-marker]:hidden"
            >
              {/* Soru */}
              <summary className="flex cursor-pointer items-center justify-between px-6 sm:px-8 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brut-pink">
                <span className="font-bold text-ink text-xs sm:text-[16px] pr-4">{faq.question}</span>

                {/* Artı/Çarpı İkonu */}
                <span className="shrink-0 w-8 h-8 brut-sticker bg-brut-yellow text-ink flex items-center justify-center transition-transform duration-300 group-open:rotate-45">
                  <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="16">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </span>
              </summary>

              {/* Cevap */}
              <div className="px-6 sm:px-8 pb-5 pt-0 text-ink/70 font-semibold text-xs sm:text-[15px] leading-relaxed whitespace-pre-wrap border-t-2 border-ink/15">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </div>
  );
}
