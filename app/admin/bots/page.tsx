"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminBotsPage() {
  const [bots, setBots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Veritabanından botları çekme
  const fetchBots = async () => {
    try {
      const res = await fetch("/api/bots", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setBots(data.bots);
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBots();
  }, []);

  // Bot Silme İşlemi
  const handleDelete = async (id: string) => {
    if (!confirm("Bu botu kalıcı olarak silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/bots/${id}`, { method: "DELETE" });
      if (res.ok) fetchBots(); // Silme başarılıysa tabloyu yenile
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <main className="p-8 max-w-5xl mx-auto mt-4">
        <div className="mb-8 flex justify-between items-end">
          <h1 className="text-3xl font-bold text-gray-900">Bot Management</h1>
          <Link href="/admin/bots/new" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition shadow-sm">
            + Add New Bot
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-white">
            <h2 className="text-sm font-bold text-gray-900">Active & Inactive Bots</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
            ) : bots.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Henüz hiç bot eklenmemiş. "+ Add New Bot" butonuna tıklayarak ilk botunuzu oluşturun.</div>
            ) : (
              bots.map((bot) => (
                <div key={bot._id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                      {bot.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {bot.name} <span className="text-sm font-normal text-gray-500">({bot.gender}, {bot.country})</span>
                      </h3>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span className={`font-medium ${bot.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                          Status: {bot.status}
                        </span>
                        <span>|</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{bot.character}</span>
                        <span>|</span>
                        <span>Timing: {bot.timing}ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/bots/edit/${bot._id}`} className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-200 rounded-md hover:bg-blue-50 transition">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(bot._id)} className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-md hover:bg-red-50 transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}