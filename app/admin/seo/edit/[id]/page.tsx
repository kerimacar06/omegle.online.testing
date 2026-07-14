"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditSeoPage() {
  const router = useRouter();
  const params = useParams();
  const seoId = params?.id;

  const [formData, setFormData] = useState({
    pageName: "",
    pageKey: "",
    title: "",
    breadcrumb: "",
    description: "",
    keywords: "",
    canonicalUrl: "",
    robots: "index, follow",
    jsonLd: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState("");
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!seoId) return;

    const fetchSeo = async () => {
      try {
        const response = await fetch(`/api/seo/${seoId}`, { cache: "no-store" });
        const data = await response.json();

        if (response.ok && data.seo) {
          const seo = data.seo;
          setFormData({
            pageName: seo.pageName || "",
            pageKey: seo.pageKey || "",
            title: seo.title || "",
            breadcrumb: seo.breadcrumb || "",
            description: seo.description || "",
            keywords: seo.keywords || "",
            canonicalUrl: seo.canonicalUrl || "",
            robots: seo.robots || "index, follow",
            jsonLd: seo.jsonLd || "",
          });
        } else {
          setMessage(`❌ Veri yüklenemedi: ${data.message || 'Bilinmeyen hata'}`);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setMessage("❌ Veritabanına ulaşılamadı. Lütfen internet bağlantınızı kontrol edin.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchSeo();
  }, [seoId]);

  const handleRegenerateJsonLd = () => {
    if (formData.jsonLd.trim() !== "" && !confirm("Mevcut JSON-LD içeriğinin üzerine yazılacak. Devam edilsin mi?")) return;

    const webPageJsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: formData.title || formData.pageName,
      description: formData.description,
      image: "https://omegletest.online/omegletest.online.jpeg",
      publisher: {
        "@type": "Organization",
        name: "Omegle Test",
        url: "https://omegletest.online",
        logo: {
          "@type": "ImageObject",
          url: "https://omegletest.online/omegletest.online.jpeg",
        },
      },
    };
    if (formData.canonicalUrl) webPageJsonLd.url = formData.canonicalUrl;

    setFormData({ ...formData, jsonLd: JSON.stringify(webPageJsonLd, null, 2) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/seo/${seoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ SEO ayarı başarıyla güncellendi! Yönlendiriliyorsunuz...");
        redirectTimeoutRef.current = setTimeout(() => router.push("/admin/seo"), 1500);
      } else {
        setMessage("❌ Güncelleme sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Sunucuya bağlanılamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-medium">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Eski bilgiler getiriliyor, lütfen bekleyin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <main className="p-8 max-w-4xl mx-auto mt-4">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-1">
            <Link href="/admin/dashboard" className="hover:underline">Admin</Link> / <Link href="/admin/seo" className="hover:underline">Sayfa SEO</Link> / Düzenle
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Düzenle</h1>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Temel Bilgiler</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sayfa Adı (Sadece panelde görünür) *</label>
                <input required type="text" value={formData.pageName} onChange={(e) => setFormData({...formData, pageName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sayfa Anahtarı (URL tanımlayıcısı) *</label>
                <input required type="text" value={formData.pageKey} onChange={(e) => setFormData({...formData, pageKey: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-gray-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                <input type="text" value={formData.canonicalUrl} onChange={(e) => setFormData({...formData, canonicalUrl: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Robots</label>
                <select value={formData.robots} onChange={(e) => setFormData({...formData, robots: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white">
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, follow">noindex, follow</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">İçerik (EN - English)</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (Title) *</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breadcrumb Name</label>
                <input 
                  type="text" 
                  value={formData.breadcrumb} 
                  onChange={(e) => setFormData({...formData, breadcrumb: e.target.value})} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" 
                  placeholder="Leave empty to use default name" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama (Description) *</label>
                <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anahtar Kelimeler (Keywords)</label>
                <input type="text" value={formData.keywords} onChange={(e) => setFormData({...formData, keywords: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">JSON-LD Structured Data</label>
                  <button type="button" onClick={handleRegenerateJsonLd} className="text-xs font-medium text-blue-600 hover:text-blue-800">
                    Title/Description/URL&apos;den yeniden oluştur
                  </button>
                </div>
                <textarea value={formData.jsonLd} onChange={(e) => setFormData({...formData, jsonLd: e.target.value})} rows={8} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 font-mono text-sm bg-gray-50" />
                <p className="text-xs text-gray-500 mt-1">Sadece geçerli JSON formatında olmalıdır. Google zengin arama sonuçları için kullanılır.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-sm ${isLoading ? "bg-amber-400 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"}`}>
              {isLoading ? "Güncelleniyor..." : "Güncelle"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}