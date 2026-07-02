import { NextResponse } from "next/server";
import { botService } from "@/services/botService";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const randomBot = await botService.getRandomActiveBot();
    
    if (!randomBot) {
      return NextResponse.json({ message: "Aktif bot bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(randomBot, { status: 200 });
  } catch (error) {
    console.error("Random bot hatası:", error);
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}
