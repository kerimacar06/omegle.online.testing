import Link from "next/link";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Bot from "@/models/Bot";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    await connectMongoDB();
    const totalPosts = await Post.countDocuments();
    const activeBots = await Bot.countDocuments({ status: "Active" });

    return {
      totalPosts,
      published: totalPosts, // Şu an tüm postlar direkt yayında sayılıyor
      drafts: 0, // Taslak sistemi olmadığı için 0
      activeUsers: activeBots // Botlar aktif kullanıcı gibi gösteriliyor
    };
  } catch (error) {
    console.error("Dashboard stats hatası:", error);
    return { totalPosts: 0, published: 0, drafts: 0, activeUsers: 0 };
  }
}

export default async function Dashboard() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Üst Menü (Navbar) */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/admin/dashboard" className="text-blue-600 font-bold text-xl tracking-tight hover:text-blue-700 transition">Omegle Online Admin</Link>
          
          {/* Linkler - İhtiyaca göre güncellendi */}
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600 mt-1">
            <Link href="/admin/dashboard" className="text-blue-600 border-b-2 border-blue-600 pb-5">Dashboard</Link>
            <Link href="/admin/posts" className="hover:text-blue-600 transition pb-5">Posts</Link>
            <Link href="/admin/bots" className="hover:text-blue-600 transition pb-5">Bots</Link>
            <Link href="/admin/faqs" className="hover:text-blue-600 transition pb-5">FAQs</Link>
            <Link href="/admin/seo" className="hover:text-blue-600 transition pb-5">Page SEO</Link>
          </div>
        </div>
        
        <div className="text-sm font-medium text-gray-500">
          <LogoutButton />
        </div>
      </nav>

      {/* Ana İçerik Alanı */}
      <main className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to your admin panel</p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-3">Active Users</h3>
            <p className="text-4xl font-bold text-blue-600 mb-2">{stats.activeUsers}</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Live (Bots)
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-3">Total Posts</h3>
            <p className="text-4xl font-bold text-blue-600">{stats.totalPosts}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-3">Published</h3>
            <p className="text-4xl font-bold text-green-500">{stats.published}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-3">Drafts</h3>
            <p className="text-4xl font-bold text-yellow-600">{stats.drafts}</p>
          </div>
        </div>

        {/* Hızlı İşlemler (Quick Actions) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/posts/new">
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
                Create New Post
              </button>
            </Link>
            <Link href="/admin/posts">
              <button className="bg-gray-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-700 transition">
                Manage Posts
              </button>
            </Link>
            <Link href="/admin/seo">
              <button className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-600 transition">
                Manage Page SEO
              </button>
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}