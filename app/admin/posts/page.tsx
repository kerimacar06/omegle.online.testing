import Link from "next/link";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import DeleteButton from "@/components/DeleteButton"; // YENİ: Silme butonumuzu çağırdık

export const dynamic = 'force-dynamic';

async function getPosts() {
  try {
    await connectMongoDB();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    console.error("Postlar çekilemedi:", error);
    return []; 
  }
}

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/admin/dashboard" className="text-blue-600 font-bold text-xl tracking-tight hover:text-blue-700 transition">Omegle Online Admin</Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600 mt-1">
            <Link href="/admin/dashboard" className="hover:text-blue-600 transition pb-5">Dashboard</Link>
            <Link href="/admin/posts" className="text-blue-600 border-b-2 border-blue-600 pb-5">Posts</Link>
            <Link href="/admin/bots" className="hover:text-blue-600 transition pb-5">Bot</Link>
            <Link href="/admin/faqs" className="hover:text-blue-600 transition pb-5">FAQs</Link>
            <Link href="/admin/seo" className="hover:text-blue-600 transition pb-5">Page SEO</Link>
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-5xl mx-auto mt-4">
        <div className="mb-8 flex justify-between items-end">
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <Link href="/admin/posts/new" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition shadow-sm">
            Add New Post
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-white">
            <h2 className="text-sm font-bold text-gray-900">All Posts</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Henüz hiç post eklenmemiş. "Add New Post" butonuna tıklayarak ilk içeriğinizi oluşturun.
              </div>
            ) : (
              posts.map((post) => (
                <div key={post._id.toString()} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{post.title}</h3>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="text-green-600 font-medium">Status: published</span>
                      <span>|</span>
                      <span>Updated: {new Date(post.updatedAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/posts/edit/${post._id}`} className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition">
                      Edit
                    </Link>
                    
                    {/* YENİ: Kırmızı Silme Butonumuz */}
                    <DeleteButton id={post._id.toString()} />

                    <Link href={`/apps/${post.slug}`} target="_blank" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition">
                      View
                    </Link>
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