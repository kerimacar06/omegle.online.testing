import { NextResponse } from "next/server";
import { postService } from "@/services/postService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

// Yeni Post Ekleme İşlemi (POST İsteği)
export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    // Admin panelindeki formdan gönderilen veriyi alıyoruz
    const body = await request.json();
    
    // Veriyi Service katmanından kaydediyoruz
    const newPost = await postService.createPost(body);

    // YENİ: RAM Cache'i temizliyoruz ki yeni eklenen post anında görünsün
    clearCache();
    
    // YENİ: Next.js'in kendi önbelleğini (Data/Route Cache) temizliyoruz
    revalidatePath('/', 'layout');

    return NextResponse.json({ message: "Post başarıyla oluşturuldu!", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json({ message: "Kayıt sırasında bir hata oluştu" }, { status: 500 });
  }
}