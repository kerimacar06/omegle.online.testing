import { NextResponse } from "next/server";
import { postService } from "@/services/postService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;

    // Çöp kutusundan geri alır: isDeleted bayrağını false'a çevirir, veri kalıcı olarak yeniden silinmedikçe kaybolmaz
    await postService.restorePost(id);
    clearCache();
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ message: "Post başarıyla geri yüklendi!" }, { status: 200 });
  } catch (error) {
    console.error("Geri yükleme hatası:", error);
    return NextResponse.json({ message: "Geri yükleme hatası" }, { status: 500 });
  }
}
