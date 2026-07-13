import { NextResponse } from "next/server";
import { postService } from "@/services/postService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const newPost = await postService.createPost(body);

    // RAM cache DB ile otomatik senkronize olmadığı için, yeni post anında görünsün diye elle temizliyoruz
    clearCache();
    revalidatePath('/', 'layout');

    return NextResponse.json({ message: "Post başarıyla oluşturuldu!", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json({ message: "Kayıt sırasında bir hata oluştu" }, { status: 500 });
  }
}