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
    <div id="faq" className="w-full scroll-mt-24 py-8 sm:py-16 border-t-2 border-dashed border-pc-line">
      <div className="w-full max-w-3xl mx-auto px-4">

        {/* Ortalanmış Başlık */}
        <div className="text-center mb-12">
          <h2 className="pc-display text-2xl sm:text-3xl md:text-4xl text-pc-ink mb-2 leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-pc-ink-2 text-xs sm:text-lg leading-none">
            Everything you need to know about our service.
          </p>
        </div>

        {/* SSS Listesi — kartpostal kutuları */}
        <div className="space-y-4">
          {faqs.map((faq: FaqItem) => (
            <details
              key={faq._id.toString()}
              className="group pc-card-static [&_summary::-webkit-details-marker]:hidden"
            >
              {/* Soru */}
              <summary className="flex cursor-pointer items-center justify-between px-6 sm:px-8 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-rust">
                <span className="font-bold text-pc-ink text-xs sm:text-[16px] pr-4">{faq.question}</span>

                <span className="pc-stamp shrink-0 w-8 h-8 bg-pc-card text-pc-rust flex items-center justify-center transition-transform duration-300 group-open:rotate-45">
                  <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </span>
              </summary>

              {/* Cevap */}
              <div className="px-6 sm:px-8 pb-5 pt-0 text-pc-ink-2 text-xs sm:text-[15px] leading-relaxed whitespace-pre-wrap border-t-2 border-dashed border-pc-line">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </div>
  );
}
