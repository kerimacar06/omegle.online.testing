import { faqService } from "@/services/faqService";

async function getFaqs() {
  return await faqService.getActiveFaqs();
}

export default async function FAQ() {
  const faqs = await getFaqs();

  // Eğer veritabanında henüz hiç SSS yoksa bölümü gizle
  if (faqs.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Everything you need to know about our service.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq: any) => (
          <details 
            key={faq._id.toString()} 
            className="group border border-gray-200 rounded-xl bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-gray-900 focus:outline-none">
              <span className="pr-4 text-lg">{faq.question}</span>
              <span className="transition duration-300 group-open:-rotate-180 shrink-0 text-blue-600">
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 mt-2 whitespace-pre-wrap">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}