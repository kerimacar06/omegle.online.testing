import { NextResponse } from "next/server";
import { faqService } from "@/services/faqService";
import { clearCache } from "@/lib/ramCache";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const faqs = await faqService.getAllFaqs();
    return NextResponse.json({ faqs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await faqService.createFaq(body);
    clearCache();
    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Başarıyla eklendi" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}