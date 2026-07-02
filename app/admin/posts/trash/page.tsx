import Link from "next/link";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { RestoreButton, PermanentDeleteButton } from "@/components/TrashButtons";

export const dynamic = 'force-dynamic';

async function getDeletedPosts() {
  try {
    await connectMongoDB();
    // Sadece silinmiş olan (isDeleted: true) postları getir
    const posts = await Post.find({ isDeleted: true }).sort({ updatedAt: -1 });
    return posts;
  } catch (error) {
    console.error("Çöp kutusu çekilemedi:", error);
    return []; 
  }
}

export default async function AdminTrashPage() {
  const posts = await getDeletedPosts();

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/admin/dashboard" className="text-blue-600 font-bold text-xl tracking-tight hover:text-blue-700 transition">Omegle Online Admin</Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600 mt-1">
            <Link href="/admin/dashboard" className="hover:text-blue-600 transition pb-5">Dashboard</Link>
            <Link href="/admin/posts" className="hover:text-blue-600 transition pb-5">Posts</Link>
            <Link href="/admin/bots" className="hover:text-blue-600 transition pb-5">Bot</Link>
            <Link href="/admin/faqs" className="hover:text-blue-600 transition pb-5">FAQs</Link>
            <Link href="/admin/seo" className="hover:text-blue-600 transition pb-5">Page SEO</Link>
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-5xl mx-auto mt-4">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trash Bin</h1>
            <p className="text-gray-500 mt-2">Bu sayfadaki postlar sitenizde görünmez. İstediğiniz zaman geri yükleyebilirsiniz.</p>
          </div>
          <Link href="/admin/posts" className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition shadow-sm">
            Back to Active Posts
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
            <h2 className="text-sm font-bold text-red-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Deleted Posts
            </h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Çöp Kutusu Boş</h3>
                <p className="text-gray-500 mt-1">Şu an silinmiş herhangi bir post bulunmuyor.</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post._id.toString()} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="opacity-70">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 line-through">{post.title}</h3>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="text-red-600 font-medium">Deleted</span>
                      <span>|</span>
                      <span>Deleted at: {new Date(post.updatedAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RestoreButton id={post._id.toString()} />
                    <PermanentDeleteButton id={post._id.toString()} />
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
