import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const appsList = [
  {
    name: 'Uhmingle',
    slug: 'uhmingle',
    description: 'Instant anonymous video chat with thousands of active users worldwide. One of the best places to meet new people.',
    rating: '4.8',
    color: 'from-pink-500 to-purple-500',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    name: 'Camgo',
    slug: 'camgo',
    description: 'Safe and secure webcam chat powered by smart AI moderation. Clean environment for meaningful connections.',
    rating: '4.7',
    color: 'from-blue-500 to-teal-400',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    name: 'Thundr',
    slug: 'thundr',
    description: 'Ultra-fast video connections globally with a minimalist design. Connect with strangers in milliseconds.',
    rating: '4.6',
    color: 'from-amber-400 to-orange-500',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    name: 'Joingy',
    slug: 'joingy',
    description: 'Classic roulette-style text and video chat for full anonymity. No logs and no registration required.',
    rating: '4.5',
    color: 'from-indigo-500 to-blue-600',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />
      <div className="w-full max-w-5xl mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Omegle Alternatives & Reviews</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Expert reviews for the best random chat platforms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appsList.map((app) => (
            <Link key={app.slug} href={`/apps/${app.slug}`} className="group">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full justify-between group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300">
                <div className="flex gap-4 items-start mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${app.color} flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform`}>
                    {app.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{app.name}</h2>
                    <div className="text-amber-500 text-sm font-bold">★ {app.rating} / 5</div>
                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">{app.description}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-2 flex justify-end text-blue-500 font-bold text-sm">
                  Read Full Review &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}