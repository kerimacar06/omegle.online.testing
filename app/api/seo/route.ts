import { NextResponse } from "next/server";
import { seoService } from "@/services/seoService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

// GET: Tüm sayfa SEO ayarlarını listele
export async function GET() {
  try {
    const seos = await seoService.getAllSeo();
    return NextResponse.json({ seos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Veriler getirilirken hata oluştu" }, { status: 500 });
  }
}

// POST: Yeni sayfa SEO ayarı ekle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await seoService.createSeo(body);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "SEO ayarı başarıyla oluşturuldu!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Kayıt sırasında hata oluştu" }, { status: 500 });
  }
}