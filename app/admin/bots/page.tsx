import Link from "next/link";

export default function BotManagement() {
  // Şimdilik tasarım amaçlı statik bot verileri. (Veritabanı aşamasında değişecek)
  const sampleBots = [
    { id: 1, name: "Guest-QUBCXQ", country: "Brazil", gender: "female", type: "romantik", minRes: 3, maxRes: 12, minNext: 15, maxNext: 25, status: "Active" },
    { id: 2, name: "Guest-PMNCXR", country: "France", gender: "female", type: "normal", minRes: 3, maxRes: 12, minNext: 15, maxNext: 25, status: "Active" },
    { id: 3, name: "Guest-OOIKJSQ", country: "France", gender: "female", type: "adult", minRes: 3, maxRes: 12, minNext: 15, maxNext: 25, status: "Active" },
    { id: 4, name: "Guest-OCAQX", country: "France", gender: "male", type: "normal", minRes: 3, maxRes: 12, minNext: 15, maxNext: 25, status: "Active" },
    { id: 5, name: "Guest-OQWBSVC", country: "Spain", gender: "male", type: "adult", minRes: 3, maxRes: 12, minNext: 15, maxNext: 25, status: "Active" },
  ];

  // Karakter tipine göre renk belirleme fonksiyonu
  const getTypeColor = (type: string) => {
    switch (type) {
      case "romantik": return "text-purple-600 bg-purple-50";
      case "normal": return "text-green-600 bg-green-50";
      case "adult": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

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
      <main className="p-8 max-w-6xl mx-auto mt-4">
        
        {/* Üst Başlık ve Butonlar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bot Management</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage chat bots that users will be matched with when no real users are available.</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition shadow-sm">
              Refresh Bots
            </button>
            <Link href="/admin/bots/new">
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
                Add Bot
              </button>
            </Link>
          </div>
        </div>

        {/* Bot Listesi Tablosu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">BOT DETAILS</th>
                  <th className="px-6 py-4">CHARACTER TYPE</th>
                  <th className="px-6 py-4">TIMING SETTINGS</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sampleBots.map((bot) => (
                  <tr key={bot.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 flex items-center space-x-4">
                      {/* Avatar (Baş harf) */}
                      <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                        {bot.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{bot.name}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{bot.country} • {bot.gender}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(bot.type)}`}>
                        {bot.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs space-y-1">
                      <div>Response: {bot.minRes}-{bot.maxRes}s</div>
                      <div>Next: {bot.minNext}-{bot.maxNext}s</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-500 font-medium text-xs">{bot.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-4 font-medium">
                      <Link href={`/admin/bots/edit/${bot.id}`} className="text-blue-600 hover:underline">Edit</Link>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}