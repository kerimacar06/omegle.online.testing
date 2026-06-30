import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Faq from "@/models/Faq";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectMongoDB();
    const faqs = await Faq.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ faqs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectMongoDB();
    await Faq.create(body);
    return NextResponse.json({ message: "Başarıyla eklendi" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}