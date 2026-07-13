"use client";

import { useState, useEffect } from "react";

interface Faq {
  _id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [formData, setFormData] = useState({ question: "", answer: "", order: 0, isActive: true });
  const [editId, setEditId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/faqs", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setFaqs(data.faqs);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  useEffect(() => {
    // Mount'ta bir kerelik veri çekme deseni; React'in yeni "set-state-in-effect" kuralı
    // bunu işaretliyor ama mimariyi (ör. Server Component'e taşımayı) değiştirmeden
    // düzeltilemiyor, o yüzden bilinçli olarak susturuluyor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFaqs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editId ? `/api/faqs/${editId}` : "/api/faqs";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ question: "", answer: "", order: 0, isActive: true });
        setEditId(null);
        fetchFaqs();
      }
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      if (res.ok) fetchFaqs();
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleEdit = (faq: Faq) => {
    setEditId(faq._id);
    setFormData({ question: faq.question, answer: faq.answer, order: faq.order, isActive: faq.isActive });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <main className="p-8 max-w-5xl mx-auto mt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Homepage FAQs</h1>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{editId ? "Edit FAQ" : "Add New FAQ"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
              <input required type="text" value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="e.g. Is this service free?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
              <textarea required value={formData.answer} onChange={(e) => setFormData({...formData, answer: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none" placeholder="Type the answer..." />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Order:</label>
                <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: Number(e.target.value)})} className="w-20 px-3 py-1 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Active:</label>
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setFormData({ question: "", answer: "", order: 0, isActive: true }); }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
              )}
              <button type="submit" disabled={isLoading} className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                {isLoading ? "Saving..." : editId ? "Update FAQ" : "Add FAQ"}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          {faqs.length === 0 ? (
            <p className="text-center text-gray-500 py-8 bg-white border border-gray-200 rounded-xl">No FAQs found. Add one above.</p>
          ) : (
            faqs.map((faq) => (
              <div key={faq._id} className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-start justify-between gap-4 ${!faq.isActive && 'opacity-60'}`}>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {faq.question} <span className="text-xs font-normal text-gray-400 ml-2">(Order: {faq.order})</span>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(faq)} className="px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition">Edit</button>
                  <button onClick={() => handleDelete(faq._id)} className="px-3 py-1 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}