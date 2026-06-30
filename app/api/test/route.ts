import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectMongoDB();
    return NextResponse.json({ message: "Harika! MongoDB Atlas Bağlantısı Başarılı 🚀" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Bağlantı Başarısız!", error }, { status: 500 });
  }
}