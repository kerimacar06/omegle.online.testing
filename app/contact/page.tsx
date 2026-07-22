import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';
import SiteBackground from '@/components/SiteBackground';
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
      <main className="relative min-h-screen bg-neon-bg neon-page flex flex-col">
        <SiteBackground />
        <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />

        {/* HEADER BÖLÜMÜ */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-8 pb-12">
          {/* Visual Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neon-ink-3 mb-8 font-medium">
            <Link href="/" className="hover:text-neon-cyan transition-colors">{homeBreadcrumbName}</Link>
            <span>›</span>
            <span className="text-neon-ink">{breadcrumbName}</span>
          </div>

          {/* Cam Panel: ChatStarter / Apps sayfası ile aynı görsel dil */}
          <div className="relative bg-neon-surface/70 backdrop-blur-2xl p-6 sm:p-8 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.4)] ring-1 ring-white/5 border border-neon-line text-center max-w-xl mx-auto mb-10">
            <p className="text-neon-ink-2 text-base md:text-lg font-medium max-w-xl mx-auto mb-6 leading-relaxed">
              Prefer talking over typing? Skip the form and jump straight into a live conversation.
            </p>

            <Link
              href="/live-video"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-violet text-neon-bg font-bold py-3 px-6 rounded-md transition-transform duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg neon-pulse-glow"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
              </svg>
              Start Video Chat
            </Link>
          </div>

          {/* Sayfa Başlığı */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold md:font-extrabold text-neon-ink mb-3 leading-tight">
              Contact Us
            </h1>
            <p className="text-neon-ink-2 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              Got a question, feedback, or need help? Our team is here for you.
            </p>
          </div>
        </div>

        {/* İÇERİK BÖLÜMÜ */}
        <div className="w-full bg-neon-surface/40 border-t border-neon-line flex-grow">
          <div className="w-full max-w-5xl mx-auto px-4 py-10 sm:py-16">
            <div className="space-y-4 sm:space-y-6">

              {/* Üst Sıra: Get In Touch + Diğer Yollar, yan yana */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                {/* Get In Touch */}
                <div className="neon-card-static p-5 sm:p-8 rounded-md">
                  <h2 className="text-lg sm:text-2xl font-bold text-neon-ink mb-4 sm:mb-6">Get In Touch</h2>
                  <p className="text-neon-ink-2 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Have questions, feedback, or need support? Reach out to our team using the details below.
                  </p>

                  <div className="space-y-5 sm:space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-neon-surface-2 rounded-full flex items-center justify-center text-neon-cyan shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-neon-ink-3 font-medium">Email Support</p>
                        <p className="font-semibold text-neon-ink text-sm sm:text-base break-all">support@omegletest.online</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-neon-surface-2 rounded-full flex items-center justify-center text-emerald-400 shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-neon-ink-3 font-medium">Privacy Matters</p>
                        <p className="font-semibold text-neon-ink text-sm sm:text-base break-all">privacy@omegletest.online</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diğer Yollar */}
                <div className="neon-card-static p-5 sm:p-8 rounded-md">
                  <h2 className="text-lg sm:text-2xl font-bold text-neon-ink mb-4 sm:mb-6">Other Ways to Reach Us</h2>

                  <ul className="space-y-5 sm:space-y-6">
                    <li className="flex items-start gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-neon-surface-2 rounded-full flex items-center justify-center text-amber-400 shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-neon-ink text-sm sm:text-base">Response Time</h4>
                        <p className="text-sm sm:text-base text-neon-ink-2">We typically reply within 24 hours on business days.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-neon-surface-2 rounded-full flex items-center justify-center text-neon-violet shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-neon-ink text-sm sm:text-base">Quick Answers</h4>
                        <p className="text-sm sm:text-base text-neon-ink-2">
                          Check our <Link href="/#faq" className="text-neon-cyan font-semibold hover:underline">FAQ section</Link> — most common questions are already covered there.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-neon-surface-2 rounded-full flex items-center justify-center text-rose-400 shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-neon-ink text-sm sm:text-base">Report a Safety Issue</h4>
                        <p className="text-sm sm:text-base text-neon-ink-2">Ran into abusive or inappropriate behavior? Email us above and our moderation team will act on it.</p>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Alt Sıra: Send Us A Message, daraltılmış ve ortalanmış */}
              <div className="neon-card-static p-6 sm:p-10 rounded-md max-w-2xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-neon-ink mb-5 sm:mb-6">Send Us A Message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neon-ink-2 mb-1">Name</label>
                      <input type="text" className="w-full bg-neon-surface-2 border border-neon-line rounded-md px-4 py-2.5 text-sm sm:text-base text-neon-ink focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neon-ink-2 mb-1">Email</label>
                      <input type="email" className="w-full bg-neon-surface-2 border border-neon-line rounded-md px-4 py-2.5 text-sm sm:text-base text-neon-ink focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neon-ink-2 mb-1">Message</label>
                    <textarea rows={5} className="w-full bg-neon-surface-2 border border-neon-line rounded-md px-4 py-2.5 text-sm sm:text-base text-neon-ink focus:ring-2 focus:ring-neon-cyan focus:border-transparent outline-none resize-none transition-all"></textarea>
                  </div>
                  <button type="button" className="w-full sm:w-auto sm:px-12 bg-gradient-to-r from-neon-cyan to-neon-violet text-neon-bg font-bold py-3 rounded-md shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-0.5 neon-pulse-glow">
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