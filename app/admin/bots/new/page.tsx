"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddEditBot() {
  // Form verilerini tutacağımız state
  const [botData, setBotData] = useState({
    name: "Guest-QUBCXQ",
    country: "Brazil",
    gender: "Female",
    isActive: true,
    characterType: "romantik",
    minRes: 3,
    maxRes: 12,
    minNext: 15,
    maxNext: 25,
    sendMessage: true,
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      
      {/* Üst Menü (Navbar) */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-blue-600 font-bold text-xl tracking-tight">Omegle Online Admin</span>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600 mt-1">
            <Link href="/admin/dashboard" className="hover:text-blue-600 transition pb-5">Dashboard</Link>
            <Link href="/admin/posts" className="hover:text-blue-600 transition pb-5">Posts</Link>
            <Link href="/admin/bot" className="text-blue-600 border-b-2 border-blue-600 pb-5">Bot</Link>
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
        
        {/* Üst Başlık */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-1">
            <Link href="/admin/dashboard" className="hover:underline">Admin</Link> / <Link href="/admin/bots" className="hover:underline">Bots</Link> / Edit
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Bot</h1>
          <p className="text-gray-500 mt-1 text-sm">Update bot settings and personality configuration.</p>
        </div>

        <div className="space-y-6">
          
          {/* 1. Bot Details */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-lg font-bold text-gray-900">Bot Details</h2>
              <p className="text-sm text-gray-500 mt-1">Basic information about the bot's identity.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bot Name</label>
                <input type="text" value={botData.name} onChange={(e) => setBotData({...botData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select value={botData.country} onChange={(e) => setBotData({...botData, country: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white">
                  <option value="Brazil">Brazil</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Turkey">Turkey</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select value={botData.gender} onChange={(e) => setBotData({...botData, gender: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <div className="flex items-center mt-6">
                <input type="checkbox" id="isActive" checked={botData.isActive} onChange={(e) => setBotData({...botData, isActive: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 font-medium">Bot is active (available for matching)</label>
              </div>
            </div>
          </div>

          {/* 2. Character Type */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-lg font-bold text-gray-900">Character Type</h2>
              <p className="text-sm text-gray-500 mt-1">Choose the bot's conversation style and personality.</p>
            </div>
            <div className="md:w-2/3 space-y-4">
              {[
                { id: "normal", title: "Normal Sohbet", desc: "Genel konular, günlük sohbet" },
                { id: "flortoz", title: "Flörtöz", desc: "Hafif flört, çekici sohbet" },
                { id: "adult", title: "+18 İçerik", desc: "Yetişkin içerik, açık konuşma" },
                { id: "entelektuel", title: "Entelektüel", desc: "Derin konular, felsefi tartışmalar" },
                { id: "komik", title: "Komik/Eğlenceli", desc: "Espri, eğlenceli sohbet" },
                { id: "romantik", title: "Romantik", desc: "Romantik konuşma, duygusal bağ" },
              ].map((char) => (
                <div key={char.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input 
                      type="radio" 
                      name="characterType" 
                      id={char.id} 
                      value={char.id}
                      checked={botData.characterType === char.id}
                      onChange={(e) => setBotData({...botData, characterType: e.target.value})}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5" 
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor={char.id} className="text-sm font-medium text-gray-700">{char.title}</label>
                    <p className="text-xs text-gray-500">{char.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Timing Settings */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-lg font-bold text-gray-900">Timing Settings</h2>
              <p className="text-sm text-gray-500 mt-1">Configure how quickly the bot responds and when it moves to next chat.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Response Time (seconds)</label>
                <input type="number" value={botData.minRes} onChange={(e) => setBotData({...botData, minRes: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Response Time (seconds)</label>
                <input type="number" value={botData.maxRes} onChange={(e) => setBotData({...botData, maxRes: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Next Chat Time (seconds)</label>
                <input type="number" value={botData.minNext} onChange={(e) => setBotData({...botData, minNext: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Next Chat Time (seconds)</label>
                <input type="number" value={botData.maxNext} onChange={(e) => setBotData({...botData, maxNext: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* 4. Message Settings & Buttons */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <h2 className="text-lg font-bold text-gray-900">Message Settings</h2>
              <p className="text-sm text-gray-500 mt-1">Configure whether the bot should send messages or just wait.</p>
            </div>
            <div className="md:w-2/3 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
              <div className="flex items-center">
                <input type="checkbox" id="sendMessage" checked={botData.sendMessage} onChange={(e) => setBotData({...botData, sendMessage: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <label htmlFor="sendMessage" className="ml-2 text-sm text-gray-700 font-medium">Bot mesaj göndersin mi? (İşaretli değilse sadece bekler)</label>
              </div>
              
              <div className="flex space-x-3 w-full sm:w-auto">
                <Link href="/admin/bots" className="w-full sm:w-auto">
                  <button className="w-full bg-white text-gray-700 border border-gray-300 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm">
                    Cancel
                  </button>
                </Link>
                <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
                  Update Bot
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}