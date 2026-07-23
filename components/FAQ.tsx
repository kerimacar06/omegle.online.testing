import { faqService } from "@/services/faqService";
import FAQTabs from "./FAQTabs";

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

  const serializedFaqs = faqs.map((faq: FaqItem) => ({
    id: faq._id.toString(),
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <div id="faq" className="band-cream w-full scroll-mt-24 py-10 sm:py-16 border-b border-v6-line">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10">
          <h2 className="ch-display text-2xl sm:text-3xl md:text-4xl font-bold text-v6-ink mb-2 leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-v6-ink-2 text-xs sm:text-lg">
            Everything you need to know about our service.
          </p>
        </div>

        {/* İki kolonlu sekme düzeni — akordiyon yerine soldan seç, sağda oku */}
        <FAQTabs faqs={serializedFaqs} />

      </div>
    </div>
  );
}
