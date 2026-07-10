import Link from "next/link";
import { dashboardService } from "@/services/dashboardService";

export const dynamic = 'force-dynamic';

async function getStats() {
  const stats = await dashboardService.getDashboardStats();
  return {
    totalPosts: stats.posts.total,
    published: stats.posts.published,
    drafts: stats.posts.draft,
    activeUsers: stats.bots.active
  };
}

export default async function Dashboard() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

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