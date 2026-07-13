import { NextResponse } from "next/server";
import { faqService } from "@/services/faqService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const faqs = await faqService.getAllFaqs();
    return NextResponse.json({ faqs }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    await faqService.createFaq(body);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Başarıyla eklendi" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}