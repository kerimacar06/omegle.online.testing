import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { seoService } from '@/services/seoService';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await seoService.getSeoData('terms');
  
  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: seoData.canonicalUrl,
      },
      robots: seoData.robots,
    };
  }
  
  return {
    title: 'Terms and Conditions - Omegle Test',
    description: 'Read the terms and conditions for using Omegletest.online.',
  };
}



export default async function TermsPage() {
  const seoData = await seoService.getSeoData('terms');
  const jsonLd = seoData?.jsonLd || null;

  const breadcrumbName = seoData?.breadcrumb && seoData.breadcrumb.trim() !== "" ? seoData.breadcrumb : 'Terms of Service';

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: 'Omegle Test Online', url: 'https://omegletest.online' },
    { name: breadcrumbName, url: 'https://omegletest.online/terms' }
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
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex-grow">
        {/* Visual Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-900">{breadcrumbName}</span>
        </div>
        
        {/* Üst Kısım: Logo ve Buton Kartı */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col items-center bg-white p-8 md:p-16 rounded-3xl border border-gray-200 shadow-md w-full max-w-3xl text-center">
            
            {/* Logo ve İsim */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 w-full">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-sm shrink-0">
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight break-all sm:break-normal px-2">
                omegletest.online
              </span>
            </div>

            {/* Buton Üstü Yazı */}
            <p className="text-gray-600 font-medium mb-10 text-center text-lg md:text-xl max-w-xl">
              Connect with strangers worldwide in real-time video chat!
            </p>

            {/* GERÇEK VİDEO CHAT LINKI BAĞLANDI */}
            <Link 
              href="/chat/video" 
              className="flex items-center gap-3 bg-blue-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-sm hover:shadow-lg hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 font-bold text-xl md:text-2xl group w-full md:w-auto justify-center"
            >
              <svg className="w-8 h-8 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
              </svg>
              Video Chat
            </Link>
          </div>
        </div>

        {/* Alt Kısım: Terms and Conditions Metni */}
        <div className="bg-white p-6 md:p-12 rounded-2xl border border-gray-200 shadow-sm text-gray-700 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
            Terms and Conditions
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-0">
            1. Acceptance of Terms
          </h2>
          <p className="leading-relaxed mb-8">
            By accessing and using Omegletest Online, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services. These terms apply to all visitors, users, and others who access the platform.
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            2. Age Restriction
          </h2>
          <p className="leading-relaxed mb-8">
            You must be at least 18 years old to use Omegletest Online. By using this platform, you represent and warrant that you are of legal age to form a binding contract and meet all of the foregoing eligibility requirements.
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            3. User Conduct and Rules
          </h2>
          <p className="leading-relaxed mb-8">
            We strive to maintain a safe environment. You agree <strong>not</strong> to use the platform to:
            <br/><br/>
            • Broadcast, share, or type any illegal, abusive, or explicit content.<br/>
            • Harass, bully, or intimidate other users.<br/>
            • Spam, advertise, or sell products and services.<br/>
            • Attempt to bypass our AI and human moderation systems.
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            4. Moderation and Bans
          </h2>
          <p className="leading-relaxed mb-8">
            Omegletest Online uses automated AI moderation and human oversight to monitor behavior. We reserve the right to instantly terminate or suspend your access to the service, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            5. Disclaimer of Warranties
          </h2>
          <p className="leading-relaxed">
            The service is provided on an "AS IS" and "AS AVAILABLE" basis. Omegletest Online makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content, or materials included therein. You expressly agree that your use of the service is at your sole risk.
          </p>
        </div>

      </div>

      <Footer />
    </main>
    </>
  );
}