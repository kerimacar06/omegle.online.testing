import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Faq from "@/models/Faq";

export async function PUT(request: Request, context: any) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    await connectMongoDB();
    await Faq.findByIdAndUpdate(id, body);
    return NextResponse.json({ message: "Güncellendi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { id } = await context.params;
    await connectMongoDB();
    await Faq.findByIdAndDelete(id);
    return NextResponse.json({ message: "Silindi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}