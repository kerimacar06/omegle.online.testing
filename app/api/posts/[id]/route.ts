import { NextResponse } from "next/server";
import { postService } from "@/services/postService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { isReservedSlug } from "@/lib/reservedSlugs";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    // App Router'da dynamic route params artık Promise döndürüyor, await gerekiyor
    const { id } = await context.params;

    const post = await postService.getPostById(id);
    
    if (!post) {
      return NextResponse.json({ message: "Post veritabanında bulunamadı!" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("API Veri Çekme Hatası:", error);
    return NextResponse.json({ message: "Post getirilirken sunucu hatası oluştu" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const body = await request.json();

    if (isReservedSlug(body.slug || "")) {
      return NextResponse.json({ message: `"${body.slug}" sistem tarafından kullanılan bir yol olduğu için slug olarak kullanılamaz.` }, { status: 400 });
    }

    await postService.updatePost(id, body);
    clearCache();
    revalidatePath('/', 'layout');

    return NextResponse.json({ message: "Post başarıyla güncellendi!" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Güncelleme hatası" }, { status: 500 });
  }
}

// Kalıcı silme değil: isDeleted bayrağını true yapar, post çöp kutusuna taşınır ve restore edilebilir kalır
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;
    await postService.softDeletePost(id);
    clearCache();
    revalidatePath('/', 'layout');

    return NextResponse.json({ message: "Post başarıyla silindi!" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Silme hatası" }, { status: 500 });
  }
}