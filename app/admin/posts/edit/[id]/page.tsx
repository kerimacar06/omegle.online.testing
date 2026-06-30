"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Editor from "@/components/Editor"; 

export default function EditPost() {
  const router = useRouter();
  const params = useParams(); 
  const postId = params?.id;

  const [formData, setFormData] = useState({
    title: "", slug: "", description: "", coverImage: "", content: "", rating: 5, pros: "", cons: "",
    faqs: [] as { question: string, answer: string }[] // YENİ: SSS Alanı eklendi
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`, { cache: "no-store" });
        const data = await response.json();

        if (response.ok && data.post) {
          const post = data.post;
          setFormData({
            title: post.title || "",
            slug: post.slug || "",
            description: post.description || "",
            coverImage: post.coverImage || "",
            content: post.content || "",
            rating: post.rating || 5,
            pros: post.pros ? post.pros.join(", ") : "",
            cons: post.cons ? post.cons.join(", ") : "",
            faqs: post.faqs || [] // YENİ: Veritabanındaki eski SSS'leri çekiyoruz
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
    
    fetchPost();
  }, [postId]);

  // Dinamik SSS Ekleme Fonksiyonu
  const handleAddFaq = () => {
    setFormData({ ...formData, faqs: [...formData.faqs, { question: "", answer: "" }] });
  };

  // SSS Silme Fonksiyonu
  const handleRemoveFaq = (index: number) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: newFaqs });
  };

  // SSS İçeriğini Güncelleme Fonksiyonu
  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][field] = value;
    setFormData({ ...formData, faqs: newFaqs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Boş bırakılmış soruları göndermemek için temizliyoruz
    const validFaqs = formData.faqs.filter(faq => faq.question.trim() !== "" && faq.answer.trim() !== "");

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pros: formData.pros.split(",").map(item => item.trim()).filter(Boolean),
          cons: formData.cons.split(",").map(item => item.trim()).filter(Boolean),
          faqs: validFaqs // YENİ: SSS'leri veritabanına yolluyoruz
        }),
      });

      if (response.ok) {
        setMessage("✅ Post başarıyla güncellendi! Yönlendiriliyorsunuz...");
        setTimeout(() => router.push("/admin/posts"), 2000);
      } else {
        setMessage("❌ Güncelleme sırasında bir hata oluştu.");
      }
    } catch (error) {
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
        Eski bilgiler veritabanından getiriliyor, lütfen bekleyin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-blue-600 font-bold text-xl tracking-tight">Omegle Online Admin</span>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600 mt-1">
            <Link href="/admin/dashboard" className="hover:text-blue-600 transition pb-5">Dashboard</Link>
            <Link href="/admin/posts" className="text-blue-600 border-b-2 border-blue-600 pb-5">Posts</Link>
            <Link href="/admin/bots" className="hover:text-blue-600 transition pb-5">Bot</Link>
            <Link href="/admin/faqs" className="hover:text-blue-600 transition pb-5">FAQs</Link>
            <Link href="/admin/seo" className="hover:text-blue-600 transition pb-5">Page SEO</Link>
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-5xl mx-auto mt-4">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              <Link href="/admin/dashboard" className="hover:underline">Admin</Link> / <Link href="/admin/posts" className="hover:underline">Posts</Link> / Edit
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          </div>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
              <p className="text-sm text-gray-500 mt-1">Title, description and permalink settings.</p>
            </div>
            <div className="md:w-2/3 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Title *</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="e.g. Omegle Alternative Apps" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
                <input 
                  required 
                  type="text" 
                  value={formData.slug} 
                  onChange={(e) => {
                    const formattedSlug = e.target.value.toLowerCase().replace(/\s+/g, '-');
                    setFormData({...formData, slug: formattedSlug});
                  }} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" 
                  placeholder="e.g. omegle-alternatives" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none" placeholder="Brief summary of the article..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input type="text" value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="https://example.com/image.jpg" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Content</h2>
            <div className="h-[400px] mb-12">
              <Editor value={formData.content} onChange={(value) => setFormData({...formData, content: value})} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-lg font-bold text-gray-900">Review Details</h2>
              <p className="text-sm text-gray-500 mt-1">Pros, cons and overall rating.</p>
            </div>
            <div className="md:w-2/3 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pros (Comma separated)</label>
                <input type="text" value={formData.pros} onChange={(e) => setFormData({...formData, pros: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-green-500" placeholder="Fast interface, Free to use, No registration..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cons (Comma separated)</label>
                <input type="text" value={formData.cons} onChange={(e) => setFormData({...formData, cons: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-red-500" placeholder="Many ads, Connection drops..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})} className="w-32 px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* YENİ EKLENEN SSS (FAQS) BÖLÜMÜ */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">FAQs (Frequently Asked Questions)</h2>
                <p className="text-sm text-gray-500 mt-1">Add dynamic questions and answers to the bottom of your post.</p>
              </div>
              <button type="button" onClick={handleAddFaq} className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition shadow-sm">
                + Add New FAQ
              </button>
            </div>

            <div className="space-y-6">
              {formData.faqs.map((faq, index) => (
                <div key={index} className="flex gap-4 items-start p-5 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex-grow space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Question {index + 1}</label>
                      <input type="text" value={faq.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="e.g. Is this app completely free?" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Answer {index + 1}</label>
                      <textarea value={faq.answer} onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none" placeholder="Type your answer here..." />
                    </div>
                  </div>
                  <button type="button" onClick={() => handleRemoveFaq(index)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg mt-7 transition" title="Remove FAQ">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
              
              {formData.faqs.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                  <p className="text-gray-500">No FAQs added yet. Click the "+ Add New FAQ" button above to start.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-sm ${isLoading ? "bg-amber-400 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"}`}>
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}