import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const appDetails = {
  uhmingle: {
    name: 'Uhmingle',
    rating: '4.8',
    color: 'from-pink-500 to-purple-500',
    description: 'Uhmingle stands at the forefront of modern anonymous video chat. Unlike older platforms, it offers a refined user interface combined with high-speed server connections that make matching with strangers nearly instantaneous.',
    longText: 'Uhmingle has revolutionized the way we think about random video chat by implementing a mobile-first approach. Whether you are using a desktop or a smartphone, the experience remains seamless. The platform focuses on high-quality video streams and low latency, ensuring that your conversations are never interrupted by technical glitches. With thousands of active users at any given time, Uhmingle provides a global stage where you can meet people from different cultures, practice new languages, or simply find a friendly face to talk to after a long day. Its commitment to privacy and anonymity makes it a safe haven for those who want to chat without the pressure of creating a public profile.',
    features: ['Instant Matching', 'Mobile Friendly', 'Global User Base', 'High Quality Video'],
    faq: [
      { q: 'Is Uhmingle free to use?', a: 'Yes, Uhmingle is completely free for all users. You can start chatting instantly without paying any fees.' },
      { q: 'Do I need an account for Uhmingle?', a: 'No, registration is not required. You can jump straight into a video chat anonymously.' },
      { q: 'Can I use Uhmingle on my phone?', a: 'Absolutely! Uhmingle is fully optimized for mobile browsers on both iOS and Android.' }
    ]
  },
  camgo: {
    name: 'Camgo',
    rating: '4.7',
    color: 'from-blue-500 to-teal-400',
    description: 'Camgo is a next-generation webcam chat platform that uses artificial intelligence to ensure a safe and enjoyable environment for everyone.',
    longText: 'Security is the biggest concern in anonymous chatting, and Camgo addresses this head-on with its advanced AI-based moderation system. This technology works in real-time to filter out inappropriate content, ensuring that your chat experience remains clean and respectful. Beyond safety, Camgo offers unique features like the "Go" search, which allows you to narrow down matches based on shared interests. This adds a layer of personalization to the randomness of the platform, helping you find more meaningful connections. Whether you are looking for a casual chat or a deep conversation, Camgo’s secure environment makes it the perfect place to start.',
    features: ['AI Moderation', 'Interest Matching', 'Secure Environment', 'No Logs Policy'],
    faq: [
      { q: 'How does Camgo keep users safe?', a: 'Camgo uses real-time AI moderation to scan and block inappropriate content automatically.' },
      { q: 'Can I find people with similar interests?', a: 'Yes, you can use the interest search feature to match with people who share your hobbies.' },
      { q: 'Is my data saved on Camgo?', a: 'No, Camgo follows a strict no-logs policy to protect user anonymity.' }
    ]
  },
  thundr: {
    name: 'Thundr',
    rating: '4.6',
    color: 'from-amber-400 to-orange-500',
    description: 'Thundr is built for speed. It is a minimalist platform designed for users who want to connect with strangers as fast as possible.',
    longText: 'In a world of complex apps, Thundr takes a step back and focuses on what truly matters: the connection. The interface is stripped of all unnecessary buttons and distractions, leaving you with a clean window to the world. Thundr’s servers are distributed globally, which means you get paired with people using the fastest possible route, reducing lag significantly. It’s the ideal platform for users who appreciate simplicity and efficiency. Just click start, and within seconds, you are talking to someone new from across the globe. No fluff, no registration, just pure conversation.',
    features: ['Minimalist UI', 'Ultra-Fast Servers', 'Easy to Use', 'Worldwide Matching'],
    faq: [
      { q: 'Why is Thundr so fast?', a: 'Thundr uses a distributed server network to pair users via the most efficient technical path.' },
      { q: 'Is Thundr anonymous?', a: 'Yes, Thundr requires no personal information or account creation.' },
      { q: 'Are there any ads on Thundr?', a: 'Thundr maintains a clean, minimalist UI with very minimal ad interference.' }
    ]
  },
  joingy: {
    name: 'Joingy',
    rating: '4.5',
    color: 'from-indigo-500 to-blue-600',
    description: 'Joingy is a classic random chat application that offers both text and video chat options, providing flexibility for all types of users.',
    longText: 'Joingy brings back the classic "roulette" feel of the early internet chat days. It is a versatile platform that caters to both camera-shy users and those who love being on video. The text chat option is perfect for a quick, low-pressure conversation, while the video chat allows for a more immersive face-to-face experience. Joingy has a massive user base, ensuring that there is always someone ready to talk, no matter what time of day it is. Its straightforward approach to random chatting has made it a staple in the community for years, proving that sometimes the original formula is still the best.',
    features: ['Dual Chat Modes', 'Large Community', 'Classic Roulette Style', 'Private Chats'],
    faq: [
      { q: 'Does Joingy have a text-only mode?', a: 'Yes, Joingy allows you to choose between text-only chat or video chat.' },
      { q: 'Is Joingy moderated?', a: 'Yes, Joingy has active moderation to ensure users follow the community guidelines.' },
      { q: 'Do I need to download an app?', a: 'No, Joingy works directly in your web browser without any downloads.' }
    ]
  }
};

export default async function AppReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const appData = appDetails[slug as keyof typeof appDetails];

  if (!appData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <div className="w-full max-w-4xl mx-auto px-4 py-16 flex-grow">
        
        {/* Ana İnceleme Kartı */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm mb-12 text-gray-800">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
            <div className={`w-32 h-32 rounded-3xl bg-gradient-to-tr ${appData.color} flex items-center justify-center shadow-lg shrink-0`}>
              <span className="text-white font-black text-6xl">{appData.name.charAt(0)}</span>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{appData.name} Review</h1>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-lg">★ {appData.rating} / 5</span>
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-4">{appData.description}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{appData.longText}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 text-xl">Why {appData.name} is Great:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appData.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <span className="text-green-500 font-bold text-xl">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center border-t border-gray-100 pt-10">
            <p className="text-gray-500 font-medium mb-6 text-center text-lg">
              Start meeting people instantly with our top recommended platform.
            </p>
            <Link 
              href="/chat/video" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 px-16 rounded-2xl transition-all duration-300 text-2xl shadow-md hover:-translate-y-1"
            >
              Start Video Chat
            </Link>
          </div>
        </div>

        {/* Tıklanabilir SSS (Accordion) Bölümü */}
        <div className="w-full max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">{appData.name} Frequently Asked Questions</h2>
          <div className="space-y-4">
            {appData.faq.map((item, index) => (
              <details key={index} className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer">
                {/* Soru Kısmı (Summary) */}
                <summary className="flex items-center justify-between p-6 font-bold text-gray-900 text-lg list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  {/* Dönen Ok İkonu */}
                  <span className="transition-transform duration-300 group-open:rotate-180 text-blue-500 shrink-0 ml-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </summary>
                {/* Cevap Kısmı */}
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 mt-2">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}