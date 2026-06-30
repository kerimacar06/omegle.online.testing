"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateNewPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleGenerateSlug = () => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      
      {/* Üst Menü (Navbar) */}
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
        <div className="text-sm font-medium text-gray-500">
          <Link href="/admin" className="hover:text-red-600 transition">Sign Out</Link>
        </div>
      </nav>

      {/* Ana İçerik */}
      <main className="p-8 max-w-5xl mx-auto mt-4">
        
        {/* Üst Başlık ve Kaydet Butonu */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              <Link href="/admin/dashboard" className="hover:underline">Admin</Link> / <Link href="/admin/posts" className="hover:underline">Posts</Link> / New
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Save Post
          </button>
        </div>

        <div className="space-y-6">
          
          {/* 1. Basic Information */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <div className="flex">
                  <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-l-md outline-none focus:border-blue-500" placeholder="uhmingle" />
                  <button onClick={handleGenerateSlug} className="bg-gray-100 border border-l-0 border-gray-300 px-4 text-sm text-gray-600 rounded-r-md hover:bg-gray-200">Generate</button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                <input type="file" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none bg-gray-50" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Or use image URL:</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="https://example.com/image.jpg" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Author (İsteğe Bağlı)</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="Blog yazarının adı" />
              </div>
            </div>
          </div>

          {/* 2. Content */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Content</h2>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 mb-4">EN - English</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title * (Required)</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description * (Required)</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content * (Required)</label>
                  {/* Buraya React Quill eklenecek */}
                  <div className="w-full h-48 border border-gray-300 rounded-md bg-white flex items-center justify-center text-gray-400">
                    [Zengin Metin Editörü (React Quill) Buraya Gelecek]
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. FAQ */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">FAQ (İsteğe Bağlı)</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">FAQ Ekle</button>
          </div>

          {/* 4. Alternative Apps */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Alternative Apps (İsteğe Bağlı)</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Alternative App Ekle</button>
          </div>

          {/* 5. Rating */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Rating (Değerlendirme)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yıldız Sayısı (1-5)</label>
                <input type="number" min="1" max="5" defaultValue="5" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Oy Sayısı</label>
                <input type="number" defaultValue="0" className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* 6. Pros & Cons */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Pros & Cons (İsteğe Bağlı)</h2>
            <p className="text-sm text-gray-500 mb-6">Her satıra bir artı/eksi özellik yazın. Boş bırakılabilir.</p>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 mb-4">EN - English</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-600 mb-1">Pros (Artılar)</label>
                  <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-green-500 resize-none" placeholder="- Hızlı performans&#10;- Kolay kullanım" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-1">Cons (Eksiler)</label>
                  <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-red-500 resize-none" placeholder="- Sınırlı özellikler&#10;- Reklam içeriyor" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}