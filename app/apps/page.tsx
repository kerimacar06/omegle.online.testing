import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { connectMongoDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import Seo from '@/models/Seo'; // YENİ: SEO modelimizi içeri aktarıyoruz
import { getFromCache, setInCache } from '@/lib/ramCache';

export const dynamic = 'force-dynamic';

// 1. YENİ: SEO (Meta Tag) Üretici Fonksiyon
// Bu fonksiyon sayfa yüklenmeden önce çalışır ve sekmeye adını (Title) verir.
export async function generateMetadata() {
  try {
    await connectMongoDB();
    // Admin panelinden girdiğimiz pageKey: 'apps' olan ayarı bul
    const cacheKey = 'seo_apps';
    let seoData = getFromCache(cacheKey);
    if (!seoData) {
      seoData = await Seo.findOne({ pageKey: 'apps' }).lean();
      if (seoData) setInCache(cacheKey, seoData, 300);
    }
    
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
  
  // Veritabanında bir hata olursa veya veri girilmediyse görünecek yedek başlık
  return {
    title: 'Omegle Alternatives & Reviews',
    description: 'Expert reviews for the best random chat platforms.',
  };
}

// 2. YENİ: JSON-LD Verisini Çeken Fonksiyon
// Zengin Google arama sonuçları için eklediğin JSON kodunu çeker
async function getSeoJsonLd() {
  try {
    await connectMongoDB();
    const cacheKey = 'seo_apps';
    let seoData = getFromCache(cacheKey);
    if (!seoData) {
      seoData = await Seo.findOne({ pageKey: 'apps' }).lean();
      if (seoData) setInCache(cacheKey, seoData, 300);
    }
    return seoData?.jsonLd || null;
  } catch (error) {
    return null;
  }
}

// Veritabanından postları çeken fonksiyon
async function getPosts() {
  try {
    await connectMongoDB();
    
    const cacheKey = 'all_apps_posts';
    let posts = getFromCache(cacheKey);
    
    if (!posts) {
      posts = await Post.find({ status: { $ne: 'Draft' }, isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
      setInCache(cacheKey, posts, 300); // 5 dakika
    }

    return posts;
  } catch (error) {
    console.error("Postlar çekilemedi:", error);
    return [];
  }
}

export default async function AppsPage() {
  const posts = await getPosts();
  const jsonLd = await getSeoJsonLd(); // JSON-LD verimizi çekiyoruz

  const gradients = [
    'from-pink-500 to-purple-500',
    'from-blue-500 to-teal-400',
    'from-amber-400 to-orange-500',
    'from-indigo-500 to-blue-600',
    'from-emerald-400 to-green-500'
  ];

  return (
    <>
      {/* YENİ: JSON-LD Entegrasyonu */}
      {/* Eğer admin panelinden JSON kod yapıştırdıysan, bu kod onu Google botlarına okutur */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Navbar />
        
        <div className="w-full max-w-5xl mx-auto px-4 py-12 flex-grow">
          
          {/* Üst Kısım: Logo Kartı ve Altındaki Başlık */}
          <div className="flex flex-col items-center justify-center mb-16">
            
            <div className="flex flex-col items-center bg-white p-10 md:p-16 rounded-3xl border border-gray-200 shadow-md w-full max-w-3xl mb-12 text-center">
              
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

            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Omegle Alternatives & Reviews</h1>
              <p className="text-gray-500 text-lg md:text-xl">Expert reviews for the best random chat platforms.</p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">Henüz hiç uygulama eklenmemiş. Lütfen admin panelinden yeni bir Post ekleyin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, index: number) => {
                const color = gradients[index % gradients.length];
                const voteCount = post.voteCount !== undefined && post.voteCount !== null ? post.voteCount : 0;
                
                return (
                  <Link key={post._id.toString()} href={`/apps/${post.slug}`} className="group block h-full">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      
                      {/* Üst Fotoğraf Alanı */}
                      <div className="w-full h-48 md:h-52 relative overflow-hidden bg-gray-100 shrink-0 border-b border-gray-100">
                        {post.coverImage ? (
                          <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2" 
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-tr ${color} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                            <svg className="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* İçerik Alanı */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-6 flex-grow">
                          {post.description}
                        </p>
                        
                        {/* Tarih ve Yıldız / Oy */}
                        <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-6">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                              {new Date(post.createdAt || Date.now()).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <span>★ {post.rating} stars, {voteCount} votes</span>
                          </div>
                        </div>

                        {/* Buton */}
                        <div className="w-full bg-[#f26622] text-white text-center py-3.5 rounded-xl font-bold text-sm group-hover:bg-[#d9531e] transition-colors shadow-sm">
                          Read More &rarr;
                        </div>
                      </div>
                      
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}