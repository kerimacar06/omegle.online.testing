import { NextResponse } from "next/server";
import { postService } from "@/services/postService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, context: any) {
  try {
    const { id } = await context.params;
    
    // isDeleted bayrağını false yaparak geri yüklüyoruz
    await postService.restorePost(id);
    
    // RAM Cache'i temizliyoruz ki geri yüklenen veri hemen listelensin
    clearCache();
    
    // Next.js'in kendi önbelleğini (Data/Route Cache) temizliyoruz
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ message: "Post başarıyla geri yüklendi!" }, { status: 200 });
  } catch (error) {
    console.error("Geri yükleme hatası:", error);
    return NextResponse.json({ message: "Geri yükleme hatası" }, { status: 500 });
  }
}
