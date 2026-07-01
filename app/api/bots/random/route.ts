import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Bot from "@/models/Bot";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectMongoDB();
    
    // Veritabanında (MongoDB üzerinde) doğrudan rastgele 1 aktif bot seç
    // Bu sayede binlerce bot olsa bile RAM'e sadece 1 tanesi gelir.
    const randomBotArray = await Bot.aggregate([
      { $match: { status: "Active" } },
      { $sample: { size: 1 } }
    ]);
    
    if (!randomBotArray || randomBotArray.length === 0) {
      return NextResponse.json({ message: "Aktif bot bulunamadı" }, { status: 404 });
    }

    const randomBot = randomBotArray[0];

    return NextResponse.json(randomBot, { status: 200 });
  } catch (error) {
    console.error("Random bot hatası:", error);
    return NextResponse.json({ message: "Hata" }, { status: 500 });
  }
}
