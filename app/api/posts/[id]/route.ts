import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";

// Önbelleğe almayı kesinlikle kapatır (Her seferinde veritabanına gider)
export const dynamic = 'force-dynamic';

// GET: Mevcut postun bilgilerini getirme
export async function GET(request: Request, context: any) {
  try {
    // YENİ NEXT.JS SÜRÜMÜ İÇİN KRİTİK NOKTA: Params'ı await ile bekliyoruz
    const { id } = await context.params;

    await connectMongoDB();
    const post = await Post.findById(id);
    
    if (!post) {
      return NextResponse.json({ message: "Post veritabanında bulunamadı!" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("API Veri Çekme Hatası:", error);
    return NextResponse.json({ message: "Post getirilirken sunucu hatası oluştu" }, { status: 500 });
  }
}

// PUT: Düzenlenen postu veritabanında güncelleme
export async function PUT(request: Request, context: any) {
  try {
    // YENİ NEXT.JS SÜRÜMÜ İÇİN KRİTİK NOKTA: Params'ı await ile bekliyoruz
    const { id } = await context.params;
    const body = await request.json();
    
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, body);
    
    // YENİ: RAM Cache'i temizliyoruz ki güncel veriler anında yansısın
    clearCache();
    
    // YENİ: Next.js'in kendi önbelleğini (Data/Route Cache) temizliyoruz
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ message: "Post başarıyla güncellendi!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Güncelleme hatası" }, { status: 500 });
  }
}
// YENİ: Veritabanından postu kalıcı olarak silme (DELETE)
export async function DELETE(request: Request, context: any) {
  try {
    const { id } = await context.params;
    await connectMongoDB();
    // YENİ: Artık kalıcı olarak silmiyoruz, sadece isDeleted bayrağını true yapıyoruz (Çöp Kutusu)
    await Post.findByIdAndUpdate(id, { isDeleted: true });
    
    // YENİ: RAM Cache'i temizliyoruz ki silinen veri hemen kalksın
    clearCache();
    
    // YENİ: Next.js'in kendi önbelleğini (Data/Route Cache) temizliyoruz
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ message: "Post başarıyla silindi!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Silme hatası" }, { status: 500 });
  }
}