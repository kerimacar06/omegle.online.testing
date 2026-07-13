"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditBotPage() {
  const router = useRouter();
  const params = useParams();
  const botId = params?.id;

  const [formData, setFormData] = useState({
    name: "",
    country: "United States",
    gender: "Female",
    character: "Normal",
    status: "Active",
    autoMessage: "",
    timing: 3000,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState("");
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!botId) return;

    const fetchBot = async () => {
      try {
        const response = await fetch(`/api/bots/${botId}`, { cache: "no-store" });
        const data = await response.json();

        if (response.ok && data.bot) {
          const bot = data.bot;
          setFormData({
            name: bot.name || "",
            country: bot.country || "United States",
            gender: bot.gender || "Female",
            character: bot.character || "Normal",
            status: bot.status || "Active",
            autoMessage: bot.autoMessage || "",
            timing: bot.timing || 3000,
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
    
    fetchBot();
  }, [botId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/bots/${botId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Bot başarıyla güncellendi! Yönlendiriliyorsunuz...");
        redirectTimeoutRef.current = setTimeout(() => router.push("/admin/bots"), 1500);
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
        Bot bilgileri getiriliyor, lütfen bekleyin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">

      <main className="p-8 max-w-5xl mx-auto mt-4">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              <Link href="/admin/dashboard" className="hover:underline">Admin</Link> / <Link href="/admin/bots" className="hover:underline">Bots</Link> / Edit
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Bot</h1>
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
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <select required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white">
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Brazil">Brazil</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Couple">Couple</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white">
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
                <select value={formData.character} onChange={(e) => setFormData({...formData, character: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white">
                  <option value="Normal">Normal</option>
                  <option value="Romantic">Romantic</option>
                  <option value="Flirty">Flirty</option>
                  <option value="Funny">Funny</option>
                  <option value="Adult">Adult</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timing (Milliseconds) *</label>
                <input required type="number" min="0" value={formData.timing} onChange={(e) => setFormData({...formData, timing: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
                <p className="text-xs text-gray-500 mt-1">1000 ms = 1 second</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auto Welcome Message</label>
                <textarea value={formData.autoMessage} onChange={(e) => setFormData({...formData, autoMessage: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-lg font-bold text-white transition shadow-sm ${isLoading ? "bg-amber-400 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"}`}>
              {isLoading ? "Updating..." : "Update Bot"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}