import Link from "next/link";

export default function PostsPage() {
  // Şimdilik tasarım amaçlı statik (sahte) veriler kullanıyoruz. 
  // Veritabanı aşamasına geçtiğimizde bunlar RSC ile veritabanından gelecek gerçek verilere dönüşecek.
  const samplePosts = [
    {
      id: 1,
      title: "Uhmingle - Best Free Omegle Alternative for Video Chat",
      status: "published",
      updatedAt: "1/22/2026",
      slug: "uhmingle"
    },
    {
      id: 2,
      title: "Vooz – The Best New Omegle Experience for Random Chat",
      status: "published",
      updatedAt: "11/24/2025",
      slug: "vooz"
    },
    {
      id: 3,
      title: "Camgo – Free Cam to Cam Chat & Safe Omegle Alternative",
      status: "published",
      updatedAt: "11/17/2025",
      slug: "camgo"
    },
    {
      id: 4,
      title: "Pink Video Chat – 1v1 Live Video Chat Online",
      status: "published",
      updatedAt: "11/17/2025",
      slug: "pink-video-chat"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      
      {/* Üst Menü (Navbar) */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-blue-600 font-bold text-xl tracking-tight">Omegle Online Admin</span>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600 mt-1">
            <Link href="/admin/dashboard" className="hover:text-blue-600 transition pb-5">Dashboard</Link>
            <Link href="/admin/posts" className="text-blue-600 border-b-2 border-blue-600 pb-5">Posts</Link>
            <Link href="/admin/bots" className="hover:text-blue-600 transition pb-5">Bot</Link>
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
        
        {/* Üst Başlık ve Yeni Ekle Butonu */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <Link href="/admin/posts/new">
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
              Add New Post
            </button>
          </Link>
        </div>

        {/* Gönderi Listesi (Liste Yapısı) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-semibold text-gray-700">All Posts</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {samplePosts.map((post) => (
              <div key={post.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition duration-150">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{post.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <span className="flex items-center">
                      Status: <span className="text-green-600 ml-1 font-medium">{post.status}</span>
                    </span>
                    <span>|</span>
                    <span>Updated: {post.updatedAt}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-100 transition">
                      Edit
                    </button>
                  </Link>
                  <Link href={`/apps/${post.slug}`} target="_blank">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}