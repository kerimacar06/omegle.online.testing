import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Seo from "@/models/Seo";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: any) {
  try {
    const { id } = await context.params;
    await connectMongoDB();
    const seo = await Seo.findById(id);
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
    await connectMongoDB();
    await Seo.findByIdAndUpdate(id, body);
    return NextResponse.json({ message: "Başarıyla güncellendi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { id } = await context.params;
    await connectMongoDB();
    await Seo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Başarıyla silindi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}