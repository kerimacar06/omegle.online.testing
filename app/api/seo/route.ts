import { NextResponse } from "next/server";
import { seoService } from "@/services/seoService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const seos = await seoService.getAllSeo();
    return NextResponse.json({ seos }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Veriler getirilirken hata oluştu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    await seoService.createSeo(body);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "SEO ayarı başarıyla oluşturuldu!" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Kayıt sırasında hata oluştu" }, { status: 500 });
  }
}