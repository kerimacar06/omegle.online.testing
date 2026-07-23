import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { postService } from '@/services/postService';
import { seoService } from '@/services/seoService';
import MobileVideoChatFab from '@/components/MobileVideoChatFab';
import { sanitizePostHtml } from '@/lib/sanitizeHtml';
import { resolveCanonical, getSiteUrl } from '@/lib/canonical';

export const dynamic = 'force-dynamic';

interface PostFaq {
  question: string;
  answer: string;
}

// SEO için dinamik sayfa başlığı ve açıklaması oluşturma
export async function generateMetadata(props: PageProps<'/[slug]'>): Promise<Metadata> {
  const params = await props.params;
  const post = await postService.getPostBySlug(params.slug);

  if (!post) return { title: 'Sayfa Bulunamadı' };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: await resolveCanonical(`/${post.slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      authors: [post.author || 'Omegle Test'],
      images: post.coverImage ? [post.coverImage] : [],
    },
    other: {
      'article:author': post.author || 'Omegle Test',
    }
  };
}

export default async function BlogPostPage(props: PageProps<'/[slug]'>) {
  const params = await props.params;
  const post = await postService.getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Apps listeleme sayfasının admin panelindeki breadcrumb değeri — "Apps" adımının
  // hem JSON-LD hem görünen breadcrumb'da aynı, tek bir kaynaktan gelmesi için
  const appsSeoData = await seoService.getSeoData('apps');
  const appsBreadcrumbName = appsSeoData?.breadcrumb && appsSeoData.breadcrumb.trim() !== "" ? appsSeoData.breadcrumb : 'Omegle Alternatives';

  // Home sayfasının admin panelindeki breadcrumb değeri — aynı mantıkla tek kaynaktan
  const homeSeoData = await seoService.getSeoData('home');
  const homeBreadcrumbName = homeSeoData?.breadcrumb && homeSeoData.breadcrumb.trim() !== "" ? homeSeoData.breadcrumb : 'Home';

  const siteUrl = await getSiteUrl();

  const pros: string[] = post.pros || [];
  const cons: string[] = post.cons || [];
  const maxRows = Math.max(pros.length, cons.length);

  // Otomatik WebPage JSON-LD (staj şefinin gösterdiği örnekteki gibi, Article'ın yanında)
  const webPageJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: post.title,
    description: post.description,
    url: `${siteUrl}/${post.slug}`,
  };

  // Otomatik Article JSON-LD
  const articleJsonLd: {
    '@context': string;
    '@type': string;
    headline: string;
    description?: string;
    image: string;
    author: { '@type': string; name: string; url: string };
    publisher: { '@type': string; name: string; logo: { '@type': string; url: string } };
    datePublished: string;
    dateModified: string;
    aggregateRating?: {
      '@type': string;
      ratingValue: string;
      bestRating: string;
      worstRating: string;
      ratingCount: string;
    };
  } = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.coverImage || `${siteUrl}/default-cover.jpg`,
    author: {
      '@type': (!post.author || post.author === 'Omegle Test') ? 'Organization' : 'Person',
      name: post.author || 'Omegle Test',
      url: siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Omegle Test',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/omegletest-online.jpeg`
      }
    },
    // Mongoose { timestamps: true } bu alanları her zaman dolduruyor; boşsa (çok eski/bozuk kayıt)
    // render sırasında "şimdi"yi kullanmak yerine sabit bir epoch değeri kullanıyoruz (impure Date() render'da çağrılmasın diye)
    datePublished: post.createdAt || new Date(0).toISOString(),
    dateModified: post.updatedAt || new Date(0).toISOString(),
  };

  // Dinamik Oylama Sistemi JSON-LD
  if (post.voteCount && post.voteCount > 0) {
    articleJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": post.rating ? post.rating.toString() : "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": post.voteCount.toString()
    };
  }

  // Otomatik FAQ JSON-LD (Eğer SSS varsa)
  const faqJsonLd = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq: PostFaq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  // Otomatik Breadcrumb JSON-LD (Sayfa kaynağı için)
  // Eğer admin panelinden breadcrumb girildiyse onu kullan, girilmediyse slug'daki tireleri boşluk yapıp
  // her kelimenin ilk harfini büyütüyoruz (CSS "capitalize" yerine burada yapıyoruz ki JSON-LD ve görünen
  // breadcrumb birebir aynı metni içersin — CSS sadece görünümü değiştirir, JSON-LD'yi etkilemez)
  const breadcrumbName = post.breadcrumb && post.breadcrumb.trim() !== ""
    ? post.breadcrumb
    : post.slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

  const breadcrumbJsonLd = seoService.generateBreadcrumbJsonLd([
    { name: homeBreadcrumbName, url: siteUrl },
    { name: breadcrumbName, url: `${siteUrl}/${post.slug}` }
  ]);

  const createdAt = new Date(post.createdAt || 0);
  const updatedAt = post.updatedAt ? new Date(post.updatedAt) : createdAt;
  const isUpdated = updatedAt.getTime() > createdAt.getTime() + 60000; // 1 dakika fark varsa güncellenmiş say
  const displayDate = isUpdated ? updatedAt : createdAt;
  const dateLabel = isUpdated ? "Last Updated" : "Published";
  const rating = post.rating || 5;
  const voteCount = post.voteCount || 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen ch-page flex flex-col">
        <Navbar />

        {/* HEADER BANDI */}
        <div className="band-navy w-full">
          <div className="w-full max-w-5xl mx-auto px-4 pt-6 sm:pt-8 pb-8 sm:pb-10">
            <div className="flex items-center gap-2 text-sm text-white/50 mb-4 sm:mb-6 font-medium">
              <Link href="/" className="hover:text-v6-coral transition-colors">{homeBreadcrumbName}</Link>
              <span>›</span>
              <Link href="/apps" className="hover:text-v6-coral transition-colors">{appsBreadcrumbName}</Link>
              <span>›</span>
              <span className="text-white/80">{breadcrumbName}</span>
            </div>

            <h1 className="ch-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-white/70 text-base sm:text-lg font-medium mt-3 max-w-3xl leading-relaxed">
                {post.description}
              </p>
            )}
          </div>
        </div>

        {/* İÇERİK BÖLÜMÜ */}
        <div className="w-full flex-grow band-cream">
          <div className="w-full max-w-5xl mx-auto px-4 pt-6 sm:pt-8 pb-10 sm:pb-16">

            {/* Kapak Fotoğrafı */}
            {post.coverImage ? (
              <div className="w-full rounded-2xl overflow-hidden mb-4 sm:mb-8 border border-v6-line">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[480px] object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-[200px] sm:h-[360px] rounded-2xl overflow-hidden mb-4 sm:mb-8 border border-v6-line bg-gradient-to-tr from-blue-500 to-teal-400 flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-white opacity-80 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-white text-xl font-bold opacity-90">{post.title}</span>
              </div>
            )}

            {/* İKİ KOLON: İçerik (sol) + Hızlı Bilgi Kartı (sağ, masaüstünde sticky) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* SAĞ KOLON (mobilde üstte): Hızlı Bilgi Kartı */}
              <aside className="order-1 lg:order-2 lg:col-span-1">
                <div className="lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl border border-v6-line p-4 sm:p-6">

                  {/* Yazar (+ mobilde sağda kompakt yıldız/oy) */}
                  <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-v6-line">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-v6-line bg-v6-cream">
                        {post.authorImage ? (
                          <img
                            src={post.authorImage}
                            alt={post.author || 'Omegle Test'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-v6-cream text-v6-ink-3">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-4.418 0-9 2.239-9 5v3h18v-3c0-2.761-4.582-5-9-5z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-v6-ink-3 font-medium">Written by</p>
                        <p className="font-bold text-v6-ink text-sm truncate">{post.author || 'Omegle Test'}</p>
                      </div>
                    </div>

                    {/* Mobilde: kompakt yıldız + oy sayısı */}
                    <div className="text-right shrink-0 sm:hidden">
                      <div className="flex items-center justify-end gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-amber-400' : 'text-v6-line'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-v6-ink font-bold text-sm ml-1">{rating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs text-v6-ink-3">{voteCount.toLocaleString('en-US')} votes</p>
                    </div>
                  </div>

                  {/* Rating (masaüstü) */}
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-amber-400' : 'text-v6-line'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-v6-ink font-bold ml-1">{rating.toFixed(1)}</span>
                    </div>
                    <p className="text-sm text-v6-ink-3 mb-2">{voteCount.toLocaleString('en-US')} votes</p>
                  </div>

                  {/* Tarih — masaüstü */}
                  <div className="hidden sm:flex items-center gap-3 pt-2 border-t border-v6-line">
                    <div className="w-10 h-10 bg-v6-coral/10 text-v6-coral rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-v6-ink-3 font-medium">{dateLabel}</p>
                      <p className="text-v6-ink font-semibold text-sm">
                        {displayDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Tarih — mobil */}
                  <p className="sm:hidden text-center text-xs text-v6-ink-3 font-medium pt-2 border-t border-v6-line">
                    {dateLabel}: <span className="text-v6-ink font-bold">{displayDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</span>
                  </p>

                  {/* CTA */}
                  <Link
                    id="hero-video-cta"
                    href="/live-video"
                    className="ch-btn mt-3 w-full inline-flex items-center justify-center gap-2 font-bold py-3 px-4"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 4v-11l-4 4z" />
                    </svg>
                    Start Video Chat
                  </Link>
                </div>
                </div>
              </aside>

              {/* SOL KOLON: Ana İçerik */}
              <div className="order-2 lg:order-1 lg:col-span-2 min-w-0 space-y-4 sm:space-y-6">

                {/* Asıl Blog İçeriği */}
                {post.content && (
                  <div className="relative bg-white rounded-2xl border border-v6-line p-4 sm:p-6 w-full overflow-hidden">
                    <div
                      className="relative text-sm sm:text-base text-v6-ink-2 leading-relaxed break-words
                      [&>p]:mb-4 sm:[&>p]:mb-6 [&>p:empty]:min-h-[1.5rem]
                      [&>h1]:ch-display [&>h1]:text-xl sm:[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-v6-ink [&>h1]:mb-3 sm:[&>h1]:mb-4 [&>h1]:mt-6 sm:[&>h1]:mt-8
                      [&>h2]:ch-display [&>h2]:text-lg sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-v6-ink [&>h2]:mb-3 sm:[&>h2]:mb-4 [&>h2]:mt-6 sm:[&>h2]:mt-8
                      [&>h3]:ch-display [&>h3]:text-base sm:[&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-v6-ink [&>h3]:mb-2 sm:[&>h3]:mb-3 [&>h3]:mt-5 sm:[&>h3]:mt-6
                      [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 sm:[&>ul]:mb-6
                      [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 sm:[&>ol]:mb-6
                      [&>strong]:font-bold [&>strong]:text-v6-ink [&>em]:italic
                      [&_a]:text-v6-coral [&_a]:underline [&_a]:font-medium
                      [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-v6-line [&_table]:mb-6
                      [&_th]:border [&_th]:border-v6-line [&_th]:bg-v6-cream [&_th]:text-v6-ink [&_th]:p-3 [&_th]:font-bold [&_th]:text-left
                      [&_td]:border [&_td]:border-v6-line [&_td]:p-3
                      [&_.ql-align-center]:text-center [&_.ql-align-right]:text-right [&_.ql-align-justify]:text-justify"
                      dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.content) }}
                    />
                  </div>
                )}

                {/* Artılar ve Eksiler — tablo */}
                {(pros.length > 0 || cons.length > 0) && (
                  <div className="bg-white rounded-2xl border border-v6-line p-4 sm:p-6">
                    <h3 className="ch-display text-lg sm:text-2xl font-bold text-v6-ink mb-4 sm:mb-6">Pros & Cons</h3>
                    <div className="rounded-xl border border-v6-line overflow-hidden">
                      <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                          <tr className="bg-v6-cream border-b border-v6-line">
                            <th className="py-1.5 px-2.5 sm:py-2 sm:px-4 text-xs sm:text-sm font-bold text-v6-teal uppercase tracking-wide w-1/2 border-r border-v6-line">Pros</th>
                            <th className="py-1.5 px-2.5 sm:py-2 sm:px-4 text-xs sm:text-sm font-bold text-v6-coral uppercase tracking-wide w-1/2">Cons</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: maxRows }).map((_, index) => (
                            <tr key={index} className="border-b border-v6-line last:border-0">
                              <td className="py-[5px] px-2.5 sm:py-[7px] sm:px-4 align-top border-r border-v6-line">
                                {pros[index] && (
                                  <span className="block text-v6-ink-2 text-sm sm:text-base leading-normal sm:text-justify">{pros[index]}</span>
                                )}
                              </td>
                              <td className="py-[5px] px-2.5 sm:py-[7px] sm:px-4 align-top">
                                {cons[index] && (
                                  <span className="block text-v6-ink-2 text-sm sm:text-base leading-normal sm:text-justify">{cons[index]}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Alternative Apps Bölümü */}
                {post.alternativeAppsContent && (
                  <div className="bg-white rounded-2xl border border-v6-line p-4 sm:p-6">
                    <h3 className="ch-display text-lg sm:text-2xl font-bold text-v6-ink mb-4 sm:mb-6">Alternative Applications</h3>
                    <div
                      className="text-sm sm:text-base text-v6-ink-2 leading-relaxed break-words
                      [&>p]:mb-3 sm:[&>p]:mb-4 [&>p:empty]:min-h-[1.5rem]
                      [&>h1]:ch-display [&>h1]:text-lg sm:[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-v6-ink [&>h1]:mb-3 sm:[&>h1]:mb-4
                      [&>h2]:ch-display [&>h2]:text-base sm:[&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-v6-ink [&>h2]:mb-2 sm:[&>h2]:mb-3
                      [&>h3]:ch-display [&>h3]:text-sm sm:[&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-v6-ink [&>h3]:mb-2
                      [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-3 sm:[&>ul]:mb-4
                      [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-3 sm:[&>ol]:mb-4
                      [&>strong]:font-bold [&>strong]:text-v6-ink [&>em]:italic
                      [&_a]:text-v6-coral [&_a]:underline [&_a]:font-bold
                      [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-v6-line [&_table]:mb-6
                      [&_th]:border [&_th]:border-v6-line [&_th]:bg-v6-cream [&_th]:text-v6-ink [&_th]:p-3 [&_th]:font-bold [&_th]:text-left
                      [&_td]:border [&_td]:border-v6-line [&_td]:p-3
                      [&_.ql-align-center]:text-center [&_.ql-align-right]:text-right [&_.ql-align-justify]:text-justify"
                      dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.alternativeAppsContent) }}
                    />
                  </div>
                )}

                {/* SSS (FAQs) BÖLÜMÜ — anasayfadaki FAQ ile aynı görsel dil */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="bg-white rounded-2xl border border-v6-line p-4 sm:p-6">
                    <h3 className="ch-display text-lg sm:text-2xl font-bold text-v6-ink mb-4 sm:mb-6">Frequently Asked Questions</h3>

                    <div className="space-y-3">
                      {post.faqs.map((faq: PostFaq, index: number) => (
                        <details
                          key={index}
                          className="group bg-v6-cream rounded-xl border border-v6-line [&_summary::-webkit-details-marker]:hidden"
                        >
                          <summary className="flex cursor-pointer items-center justify-between px-4 sm:px-6 py-3 sm:py-4 focus:outline-none rounded-xl">
                            <span className="font-bold text-v6-ink text-sm sm:text-base pr-4">{faq.question}</span>
                            <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-v6-coral/10 text-v6-coral flex items-center justify-center transition-transform duration-300 group-open:-rotate-180">
                              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
                                <path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </span>
                          </summary>
                          <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0 text-v6-ink-2 text-xs sm:text-sm leading-relaxed border-t border-v6-line">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        <Footer />
        <MobileVideoChatFab watchId="hero-video-cta" />
      </main>
    </>
  );
}
