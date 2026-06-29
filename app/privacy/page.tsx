import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      {/* Ana İçerik Alanı */}
      <div className="w-full max-w-4xl mx-auto px-4 py-16 flex-grow">
        
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
  );
}