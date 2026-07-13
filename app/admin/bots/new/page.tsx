"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewBotPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    gender: "Female",
    character: "Normal",
    status: "Active",
    autoMessage: "",
    timing: 3000,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/bots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Bot başarıyla eklendi! Yönlendiriliyorsunuz...");
        redirectTimeoutRef.current = setTimeout(() => router.push("/admin/bots"), 1500);
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

      <main className="p-8 max-w-5xl mx-auto mt-4">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              <Link href="/admin/dashboard" className="hover:underline">Admin</Link> / <Link href="/admin/bots" className="hover:underline">Bots</Link> / New
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Bot</h1>
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
              <h2 className="text-lg font-bold text-gray-900">Bot Identity</h2>
              <p className="text-sm text-gray-500 mt-1">Basic information about the bot.</p>
            </div>
            <div className="md:w-2/3 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bot Name *</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="e.g. Jessica" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <input required type="text" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="e.g. United States" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Couple">Couple</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-lg font-bold text-gray-900">Behavior & Chat</h2>
              <p className="text-sm text-gray-500 mt-1">How the bot behaves in the chat.</p>
            </div>
            <div className="md:w-2/3 space-y-5">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Character Type</label>
                <select value={formData.character} onChange={(e) => setFormData({...formData, character: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500">
                  <option value="Normal">Normal</option>
                  <option value="Romantic">Romantic</option>
                  <option value="Flirty">Flirty</option>
                  <option value="Funny">Funny</option>
                  <option value="Adult">Adult</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timing (Milliseconds) *</label>
                <input required type="number" min="0" value={formData.timing} onChange={(e) => setFormData({...formData, timing: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" placeholder="e.g. 3000" />
                <p className="text-xs text-gray-500 mt-1">1000 ms = 1 second</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auto Welcome Message</label>
                <textarea value={formData.autoMessage} onChange={(e) => setFormData({...formData, autoMessage: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none" placeholder="e.g. Hi there! Where are you from?" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-sm ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
              {isLoading ? "Saving..." : "Save Bot"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}