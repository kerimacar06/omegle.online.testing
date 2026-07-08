import { NextResponse } from "next/server";
import { botService } from "@/services/botService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

// GET: Tüm botları veritabanından çek (En son eklenen en üstte)
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const bots = await botService.getAllBots();
    return NextResponse.json({ bots }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Botlar getirilirken hata oluştu" }, { status: 500 });
  }
}

// POST: Yeni bot ekle
export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    await botService.createBot(body);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Bot başarıyla oluşturuldu!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Bot eklenirken hata oluştu" }, { status: 500 });
  }
}