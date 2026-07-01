import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { connectMongoDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// SEO için dinamik sayfa başlığı ve açıklaması oluşturma
export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  
  await connectMongoDB();
  const post = await Post.findOne({ slug: params.slug });
  
  if (!post) return { title: 'Sayfa Bulunamadı' };
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

// Ana sayfa bileşeni
export default async function BlogPostPage(props: any) {
  const params = await props.params;

  // Veritabanına bağlan ve URL'deki slug ile eşleşen postu bul
  await connectMongoDB();
  const post = await Post.findOne({ slug: params.slug });

  if (!post) {
    notFound();
  }

  // Pros ve Cons dizilerinin en uzun olanını bulup tablo satır sayısını belirliyoruz
  const prosLength = post.pros ? post.pros.length : 0;
  const consLength = post.cons ? post.cons.length : 0;
  const maxRows = Math.max(prosLength, consLength);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />
      
      <article className="w-full max-w-4xl mx-auto px-4 py-12 flex-grow">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-900">{post.title}</span>
        </div>

        {/* YENİ: Video Chat Yönlendirme Banner'ı */}
        <div className="w-full bg-gradient-to-r from-orange-50/50 via-orange-50 to-orange-50/50 rounded-2xl p-6 md:p-10 flex items-center justify-center mb-10 border border-orange-100 shadow-sm">
          <Link 
            href="/chat/video" 
            className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 md:px-10 py-4 rounded-full shadow-lg hover:shadow-orange-500/20 hover:scale-105 transition-all duration-300 font-bold text-lg md:text-xl"
          >
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
               <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
            </svg>
            Start Video Chat Now!
          </Link>
        </div>

        {/* Üst Kısım: Başlık */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Kapak Fotoğrafı */}
        {post.coverImage ? (
          <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-12 shadow-lg border border-gray-100">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-12 shadow-lg border border-gray-100 bg-gradient-to-tr from-blue-500 to-teal-400 flex flex-col items-center justify-center">
            <svg className="w-24 h-24 text-white opacity-80 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-white text-2xl font-bold opacity-90">{post.title}</span>
          </div>
        )}

        {/* Artılar ve Eksiler TABLOSU */}
        {(prosLength > 0 || consLength > 0) && (
          <div className="bg-[#fdf9f1] rounded-2xl p-8 mb-12 shadow-sm border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h3>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 font-bold text-gray-900 w-1/2 border-r border-gray-200">Pros</th>
                    <th className="py-4 px-6 font-bold text-gray-900 w-1/2">Cons</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: maxRows }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-600 border-r border-gray-200 align-top">
                        {post.pros && post.pros[index] ? post.pros[index] : ""}
                      </td>
                      <td className="py-4 px-6 text-gray-600 align-top">
                        {post.cons && post.cons[index] ? post.cons[index] : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Asıl Blog İçeriği */}
        {post.content && (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200 mb-12 w-full overflow-hidden">
             <div 
              className="w-full text-gray-700 leading-relaxed break-words
              [&>p]:mb-6 [&>p:empty]:min-h-[1.5rem] 
              [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-8
              [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-8
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:mt-6
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 
              [&>strong]:font-bold [&>em]:italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        )}

        {/* SSS (FAQs) BÖLÜMÜ - Turuncu Arka Plan ve Beyaz Akordiyon Kutuları */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="bg-[#fdf9f1] rounded-2xl p-8 mb-12 shadow-sm border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {post.faqs.map((faq: any, index: number) => (
                <details 
                  key={index} 
                  className="group border border-gray-200 rounded-xl bg-white [&_summary::-webkit-details-marker]:hidden shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-gray-900 focus:outline-none">
                    <span className="pr-4">{faq.question}</span>
                    <span className="transition duration-300 group-open:-rotate-180 shrink-0 text-orange-500">
                      <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 mt-2">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

          </div>
        )}

      </article>

      <Footer />
    </main>
  );
}