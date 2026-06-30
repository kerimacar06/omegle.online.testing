"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Şimdilik basit bir şifre kontrolü yapıyoruz. Şifremiz: "omegle123"
    // İleride bunu daha güvenli hale getirebiliriz.
    if (password === "omegle123") {
      // Şifre doğruysa asıl yönetim paneline yönlendir
      router.push("/admin/dashboard");
    } else {
      setError("Hatalı parola, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Omegle Online Admin
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yönetici Parolası
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Parolayı girin..."
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}