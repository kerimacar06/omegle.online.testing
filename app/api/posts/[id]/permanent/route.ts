import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, context: any) {
  try {
    const { id } = await context.params;
    await connectMongoDB();
    
    // Veritabanından kalıcı olarak siliyoruz
    await Post.findByIdAndDelete(id);
    
    // RAM Cache'i temizliyoruz
    clearCache();
    
    // Next.js'in kendi önbelleğini (Data/Route Cache) temizliyoruz
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ message: "Post kalıcı olarak silindi!" }, { status: 200 });
  } catch (error) {
    console.error("Kalıcı silme hatası:", error);
    return NextResponse.json({ message: "Kalıcı silme hatası" }, { status: 500 });
  }
}
