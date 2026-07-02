import { NextResponse } from "next/server";
import { seoService } from "@/services/seoService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: any) {
  try {
    const { id } = await context.params;
    const seo = await seoService.getSeoById(id);
    if (!seo) return NextResponse.json({ message: "Bulunamadı" }, { status: 404 });
    return NextResponse.json({ seo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: any) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    await seoService.updateSeo(id, body);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Başarıyla güncellendi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { id } = await context.params;
    await seoService.deleteSeo(id);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Başarıyla silindi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}