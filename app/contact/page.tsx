import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';
import PopBackground from '@/components/PopBackground';
import { resolveCanonical, getSiteUrl } from '@/lib/canonical';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await seoService.getSeoData('contact');

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: await resolveCanonical('/contact', seoData.canonicalUrl),
      },
      robots: seoData.robots,
    };
  }

  return {
    title: 'Contact - Omegle Test',
    description: 'Contact us for any questions regarding Omegletest.online.',
    alternates: {
      canonical: await resolveCanonical('/contact'),
    },
  };
}



export default async function ContactPage() {
  const seoData = await seoService.getSeoData('contact');
  const jsonLd = await seoService.getSeoJsonLd('contact');
  const homeSeoData = await seoService.getSeoData('home');

  const siteUrl = await getSiteUrl();
  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Contact';
  const homeBreadcrumbName = homeSeoData?.breadcrumb && homeSeoData.breadcrumb.trim() !== "" ? homeSeoData.breadcrumb : 'Home';

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: homeBreadcrumbName, url: siteUrl },
    { name: breadcrumbName, url: `${siteUrl}/contact` }
  ]);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="relative min-h-screen pop-page flex flex-col">
        <PopBackground />
        <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />

        {/* HEADER BÖLÜMÜ */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-8 pb-12">
          {/* Visual Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-pop-ink-3 mb-8 font-semibold">
            <Link href="/" className="hover:text-pop-pink transition-colors">{homeBreadcrumbName}</Link>
            <span>›</span>
            <span className="text-pop-ink">{breadcrumbName}</span>
          </div>

          {/* Panel */}
          <div className="relative pop-card-static p-6 sm:p-8 text-center max-w-xl mx-auto mb-10 -rotate-1">
            <p className="text-pop-ink-2 text-base md:text-lg font-medium max-w-xl mx-auto mb-6 leading-relaxed">
              Prefer talking over typing? Skip the form and jump straight into a live conversation.
            </p>

            <Link
              href="/live-video"
              className="pop-btn inline-flex items-center gap-2 font-bold py-3 px-6"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
              </svg>
              Start Video Chat
            </Link>
          </div>

          {/* Sayfa Başlığı */}
          <div className="text-center">
            <h1 className="pop-display text-2xl sm:text-3xl md:text-4xl text-pop-ink mb-3 leading-tight">
              Contact Us
            </h1>
            <p className="text-pop-ink-2 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              Got a question, feedback, or need help? Our team is here for you.
            </p>
          </div>
        </div>

        {/* İÇERİK BÖLÜMÜ */}
        <div className="w-full flex-grow">
          <div className="w-full max-w-5xl mx-auto px-4 py-10 sm:py-16">
            <div className="space-y-6 sm:space-y-8">

              {/* Üst Sıra: Get In Touch + Diğer Yollar, yan yana */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

                {/* Get In Touch */}
                <div className="pop-card-static p-5 sm:p-8 rotate-1">
                  <h2 className="pop-display text-lg sm:text-2xl text-pop-ink mb-4 sm:mb-6">Get In Touch</h2>
                  <p className="text-pop-ink-2 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Have questions, feedback, or need support? Reach out to our team using the details below.
                  </p>

                  <div className="space-y-5 sm:space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-pop-pink to-pop-purple rounded-2xl flex items-center justify-center text-white shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-pop-ink-3 font-medium">Email Support</p>
                        <p className="font-semibold text-pop-ink text-sm sm:text-base break-all">support@omegletest.online</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-pop-teal to-pop-purple rounded-2xl flex items-center justify-center text-white shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-pop-ink-3 font-medium">Privacy Matters</p>
                        <p className="font-semibold text-pop-ink text-sm sm:text-base break-all">privacy@omegletest.online</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diğer Yollar */}
                <div className="pop-card-static p-5 sm:p-8 -rotate-1">
                  <h2 className="pop-display text-lg sm:text-2xl text-pop-ink mb-4 sm:mb-6">Other Ways to Reach Us</h2>

                  <ul className="space-y-5 sm:space-y-6">
                    <li className="flex items-start gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-pop-yellow to-pop-pink rounded-2xl flex items-center justify-center text-white shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-pop-ink text-sm sm:text-base">Response Time</h4>
                        <p className="text-sm sm:text-base text-pop-ink-2">We typically reply within 24 hours on business days.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-pop-purple to-pop-pink rounded-2xl flex items-center justify-center text-white shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-pop-ink text-sm sm:text-base">Quick Answers</h4>
                        <p className="text-sm sm:text-base text-pop-ink-2">
                          Check our <Link href="/#faq" className="text-pop-pink font-bold hover:underline">FAQ section</Link> — most common questions are already covered there.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-pop-pink to-pop-purple rounded-2xl flex items-center justify-center text-white shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-pop-ink text-sm sm:text-base">Report a Safety Issue</h4>
                        <p className="text-sm sm:text-base text-pop-ink-2">Ran into abusive or inappropriate behavior? Email us above and our moderation team will act on it.</p>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Alt Sıra: Send Us A Message, daraltılmış ve ortalanmış */}
              <div className="pop-card-static p-6 sm:p-10 max-w-2xl mx-auto">
                <h2 className="pop-display text-xl sm:text-2xl text-pop-ink mb-5 sm:mb-6">Send Us A Message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-pop-ink-2 mb-1">Name</label>
                      <input type="text" className="w-full bg-white border-2 border-pop-line rounded-2xl px-4 py-2.5 text-sm sm:text-base text-pop-ink focus:ring-2 focus:ring-pop-pink focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pop-ink-2 mb-1">Email</label>
                      <input type="email" className="w-full bg-white border-2 border-pop-line rounded-2xl px-4 py-2.5 text-sm sm:text-base text-pop-ink focus:ring-2 focus:ring-pop-pink focus:border-transparent outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pop-ink-2 mb-1">Message</label>
                    <textarea rows={5} className="w-full bg-white border-2 border-pop-line rounded-2xl px-4 py-2.5 text-sm sm:text-base text-pop-ink focus:ring-2 focus:ring-pop-pink focus:border-transparent outline-none resize-none transition-all"></textarea>
                  </div>
                  <button type="button" className="pop-btn w-full sm:w-auto sm:px-12 font-bold py-3">
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>

      <Footer />
      </div>
    </main>
    </>
  );
}
