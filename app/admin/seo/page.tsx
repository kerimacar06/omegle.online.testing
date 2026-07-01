"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminSeoPage() {
  const [seos, setSeos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSeos = async () => {
    try {
      const res = await fetch("/api/seo", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setSeos(data.seos);
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu SEO ayarını kalıcı olarak silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/seo/${id}`, { method: "DELETE" });
      if (res.ok) fetchSeos();
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/admin/dashboard" className="text-blue-600 font-bold text-xl tracking-tight hover:text-blue-700 transition">Omegle Online Admin</Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600 mt-1">
            <Link href="/admin/dashboard" className="hover:text-blue-600 transition pb-5">Dashboard</Link>
            <Link href="/admin/posts" className="hover:text-blue-600 transition pb-5">Posts</Link>
            <Link href="/admin/bots" className="hover:text-blue-600 transition pb-5">Bots</Link>
            <Link href="/admin/faqs" className="hover:text-blue-600 transition pb-5">FAQs</Link>
            <Link href="/admin/seo" className="text-blue-600 border-b-2 border-blue-600 pb-5">Page SEO</Link>
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-5xl mx-auto mt-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sayfa SEO Yönetimi</h1>
            <p className="text-gray-500 mt-1">Sayfa meta taglarını ve JSON-LD verilerini yönetin</p>
          </div>
          <Link href="/admin/seo/new" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition shadow-sm">
            Yeni Sayfa SEO Ekle
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider">SAYFA</th>
                <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider">BAŞLIK (EN)</th>
                <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">AÇIKLAMA (EN)</th>
                <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider text-center">JSON-LD</th>
                <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider text-right">İŞLEMLER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Yükleniyor...</td></tr>
              ) : seos.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Henüz SEO ayarı eklenmemiş.</td></tr>
              ) : (
                seos.map((seo) => (
                  <tr key={seo._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{seo.pageName}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{seo.pageKey}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      <div className="line-clamp-1 max-w-xs">{seo.title}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 hidden md:table-cell">
                      <div className="line-clamp-1 max-w-xs">{seo.description}</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {seo.jsonLd && seo.jsonLd.trim() !== "" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Var
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          Yok
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap text-sm font-medium">
                      <Link href={`/admin/seo/edit/${seo._id}`} className="text-blue-600 hover:text-blue-900 mr-4">Düzenle</Link>
                      <button onClick={() => handleDelete(seo._id)} className="text-red-600 hover:text-red-900">Sil</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}