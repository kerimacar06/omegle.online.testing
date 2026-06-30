import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";

// Yeni Post Ekleme İşlemi
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Ön yüzden gelen verileri al
    
    await connectMongoDB(); // Veritabanına bağlan
    await Post.create(body); // Veriyi MongoDB'ye kaydet

    return NextResponse.json({ message: "Post başarıyla oluşturuldu!" }, { status: 201 });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json({ message: "Kayıt sırasında bir hata oluştu" }, { status: 500 });
  }
}