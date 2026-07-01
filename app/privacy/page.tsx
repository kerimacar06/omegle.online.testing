import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { connectMongoDB } from '@/lib/mongodb';
import Seo from '@/models/Seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  try {
    await connectMongoDB();
    const seoData = await Seo.findOne({ pageKey: 'privacy' });
    
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
  } catch (error) {
    console.error("SEO çekilemedi:", error);
  }
  
  return {
    title: 'Privacy Policy - Omegle Test',
    description: 'Read the privacy policy for using Omegletest.online.',
  };
}

async function getSeoJsonLd() {
  try {
    await connectMongoDB();
    const seoData = await Seo.findOne({ pageKey: 'privacy' });
    return seoData?.jsonLd || null;
  } catch (error) {
    return null;
  }
}

export default async function PrivacyPage() {
  const jsonLd = await getSeoJsonLd();

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      {/* Ana İçerik Alanı */}
      <div className="w-full max-w-4xl mx-auto px-4 py-16 flex-grow">
        
        {/* Üst Kısım: Logo Kartı */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col items-center bg-white p-10 md:p-16 rounded-3xl border border-gray-200 shadow-md w-full max-w-3xl text-center">
            
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

            <p className="text-gray-600 font-medium mb-10 text-center text-lg md:text-xl max-w-xl">
              Connect with strangers worldwide in real-time video chat!
            </p>

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
        {/* Sayfa Başlığı */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500">
            Last updated: June 2026
          </p>
        </div>

        {/* Metin Kutusu (Sanki beyaz bir kağıtmış gibi gölgeli ve temiz) */}
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm text-gray-700">
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-0">
            1. Introduction
          </h2>
          <p className="leading-relaxed mb-8">
            Welcome to Omegletest Online. We respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you use our anonymous chat platform. By using our website, you consent to the data practices described in this statement.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Information We Do NOT Collect
          </h2>
          <p className="leading-relaxed mb-8">
            Our core philosophy is total anonymity. We do <strong>not</strong> require you to register, create an account, or provide personal details such as your name, email address, or phone number. We do not store your chat history or video streams on our servers. Once a chat ends, it is gone forever.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Technical Data and Cookies
          </h2>
          <p className="leading-relaxed mb-8">
            To make the connection work (matchmaking you with a stranger), we temporarily process technical data such as your IP address and standard web browser information. We also use essential cookies to maintain your session and save your site preferences (like language choices). We do not use tracking cookies to sell your data to advertisers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Security and AI Moderation
          </h2>
          <p className="leading-relaxed mb-8">
            Your security is our priority. We use real-time AI moderation tools that temporarily scan video streams and text inputs to prevent harmful, illegal, or explicit content. These scans are automated and are not saved, recorded, or reviewed by humans unless flagged for a severe violation of our Terms of Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. User Responsibility
          </h2>
          <p className="leading-relaxed mb-8">
            While we provide the platform, your privacy is also in your hands. We strongly advise against sharing personal information (like social media profiles, exact location, or real names) with strangers you meet on Omegletest Online.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Changes to This Policy
          </h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our privacy practices.
          </p>

        </div>
      </div>

      <Footer />
    </main>
    </>
  );
}