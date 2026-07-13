import { NextResponse } from "next/server";
import { botService } from "@/services/botService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

// Düzenleme formunu doldurmak için tek bir botun bilgilerini getirir
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const bot = await botService.getBotById(id);
    if (!bot) return NextResponse.json({ message: "Bot bulunamadı" }, { status: 404 });
    return NextResponse.json({ bot }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const body = await request.json();
    await botService.updateBot(id, body);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Bot başarıyla güncellendi!" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Güncelleme hatası" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;
    await botService.deleteBot(id);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Bot başarıyla silindi!" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Silme hatası" }, { status: 500 });
  }
}