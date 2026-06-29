import Link from 'next/link';

// Listeden seçtiğimiz en popüler 4 alternatif uygulama ve özel logoları
const appsData = [
  { 
    name: 'Uhmingle', 
    slug: 'uhmingle',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
    )
  },
  { 
    name: 'Camgo', 
    slug: 'camgo',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    )
  },
  { 
    name: 'Thundr', 
    slug: 'thundr',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    )
  },
  { 
    name: 'Joingy', 
    slug: 'joingy',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    )
  },
];

export default function Alternatives() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-16 px-4 pb-12">
      
      {/* Bölüm Başlığı */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Best Omegle Alternatives & Reviews
        </h2>
        <p className="text-gray-500 text-sm">
          Find the top Omegletest alternatives for anonymous video chat with strangers worldwide
        </p>
      </div>

      {/* 2x2 Grid Sistemi */}
      <div className="grid grid-cols-2 gap-4">
        {appsData.map((app) => (
          <Link 
            key={app.slug} 
            href={`/apps/${app.slug}`}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-300 group"
          >
            {/* Kart İçeriği - Yeni Renkli SVG Logolar */}
            <div className="mb-4">
               {app.logo}
            </div>
            
            <h3 className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors text-center">
              {app.name}
            </h3>
            <span className="text-xs text-gray-400 mt-2 font-medium">Read More &rarr;</span>
          </Link>
        ))}
      </div>

    </div>
  );
}