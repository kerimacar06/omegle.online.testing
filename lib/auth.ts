import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Lütfen .env dosyasında JWT_SECRET değişkenini tanımlayın.");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Admin API route'larının başında çağrılır. Geçerli bir admin oturumu yoksa
 * 401 döndürülecek bir NextResponse verir; oturum geçerliyse null döner.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, getJwtSecretKey());
    return null;
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export { getJwtSecretKey };
