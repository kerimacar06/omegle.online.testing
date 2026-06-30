import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { connectMongoDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import Seo from '@/models/Seo'; // YENİ: SEO modelimizi içeri aktarıyoruz

export const dynamic = 'force-dynamic';

// 1. YENİ: SEO (Meta Tag) Üretici Fonksiyon
// Bu fonksiyon sayfa yüklenmeden önce çalışır ve sekmeye adını (Title) verir.
export async function generateMetadata() {
  try {
    await connectMongoDB();
    // Admin panelinden girdiğimiz pageKey: 'apps' olan ayarı bul
    const seoData = await Seo.findOne({ pageKey: 'apps' });
    
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
    const seoData = await Seo.findOne({ pageKey: 'apps' });
    return seoData?.jsonLd || null;
  } catch (error) {
    return null;
  }
}

// Veritabanından postları çeken fonksiyon
async function getPosts() {
  try {
    await connectMongoDB();
    const posts = await Post.find({}).sort({ createdAt: -1 });
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Omegle Alternatives & Reviews</h1>
            <p className="text-gray-500 text-lg md:text-xl">Expert reviews for the best random chat platforms.</p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">Henüz hiç uygulama eklenmemiş. Lütfen admin panelinden yeni bir Post ekleyin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, index) => {
                const color = gradients[index % gradients.length];
                
                return (
                  <Link key={post._id.toString()} href={`/apps/${post.slug}`} className="group block h-full">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full justify-between hover:border-blue-500 hover:shadow-md transition-all duration-300">
                      
                      <div className="flex gap-4 items-start mb-4">
                        {/* Sol taraftaki kapak fotoğrafı veya ikon */}
                        {post.coverImage ? (
                           <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                             <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                           </div>
                        ) : (
                           <div className={`w-16 h-16 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        )}

                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{post.title}</h2>
                          <div className="text-amber-500 text-sm font-bold mt-1">★ {post.rating} / 5</div>
                          <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                            {post.description}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-center">
                        <span className="text-gray-400 text-sm font-medium">Free & Safe</span>
                        <span className="text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform inline-block">Read Full Review &rarr;</span>
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