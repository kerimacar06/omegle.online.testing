"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewSeoPage() {
  const router = useRouter();
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
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ SEO ayarı başarıyla eklendi! Yönlendiriliyorsunuz...");
        setTimeout(() => router.push("/admin/seo"), 1500);
      } else {
        setMessage("❌ Kayıt sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Sunucuya bağlanılamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <main className="p-8 max-w-4xl mx-auto mt-4">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-1">
            <Link href="/admin/dashboard" className="hover:underline">Admin</Link> / <Link href="/admin/seo" className="hover:underline">Sayfa SEO</Link> / Yeni Ekle
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Yeni SEO Ekle</h1>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* TEMEL BİLGİLER */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Temel Bilgiler</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sayfa Adı (Sadece panelde görünür) *</label>
                <input required type="text" value={formData.pageName} onChange={(e) => setFormData({...formData, pageName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="Örn: Uygulamalar" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sayfa Anahtarı (URL tanımlayıcısı) *</label>
                <input required type="text" value={formData.pageKey} onChange={(e) => setFormData({...formData, pageKey: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-gray-50" placeholder="Örn: apps" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                <input type="text" value={formData.canonicalUrl} onChange={(e) => setFormData({...formData, canonicalUrl: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="https://omegle.online/apps" />
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

          {/* İÇERİK (Sadece İngilizce) */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">İçerik (EN - English)</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (Title) *</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="Best Live Chat App Alternatives | Omegle.Online" />
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
                <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none" placeholder="Discover top apps like Omegle for live chat..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anahtar Kelimeler (Keywords)</label>
                <input type="text" value={formData.keywords} onChange={(e) => setFormData({...formData, keywords: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="live chat apps, Omegle alternatives, best chat platforms..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">JSON-LD Structured Data</label>
                <textarea value={formData.jsonLd} onChange={(e) => setFormData({...formData, jsonLd: e.target.value})} rows={8} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 font-mono text-sm bg-gray-50" placeholder='{ "@context": "https://schema.org", ... }' />
                <p className="text-xs text-gray-500 mt-1">Sadece geçerli JSON formatında olmalıdır. Google zengin arama sonuçları için kullanılır.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-sm ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
              {isLoading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}