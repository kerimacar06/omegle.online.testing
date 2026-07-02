import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";

// Yeni Post Ekleme İşlemi
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Ön yüzden gelen verileri al
    
    await connectMongoDB(); // Veritabanına bağlan
    const newPost = await Post.create(body); // Veriyi MongoDB'ye kaydet

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