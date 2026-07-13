import { NextResponse } from "next/server";
import { postService } from "@/services/postService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;

    await postService.permanentDeletePost(id);
    clearCache();
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ message: "Post kalıcı olarak silindi!" }, { status: 200 });
  } catch (error) {
    console.error("Kalıcı silme hatası:", error);
    return NextResponse.json({ message: "Kalıcı silme hatası" }, { status: 500 });
  }
}
