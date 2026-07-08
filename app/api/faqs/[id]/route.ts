import { NextResponse } from "next/server";
import { faqService } from "@/services/faqService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function PUT(request: Request, context: any) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const body = await request.json();
    await faqService.updateFaq(id, body);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Güncellendi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;
    await faqService.deleteFaq(id);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Silindi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}