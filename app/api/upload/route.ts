import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/auth";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// Yüklemelerin gidebileceği klasörler public/ altında sabit; keyfi klasör adı (path traversal) engellenir
const ALLOWED_FOLDERS = ["authors", "covers", "reviews"] as const;
type AllowedFolder = (typeof ALLOWED_FOLDERS)[number];

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    const requestedFolder = data.get("folder");

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const folder: AllowedFolder = ALLOWED_FOLDERS.includes(requestedFolder as AllowedFolder)
      ? (requestedFolder as AllowedFolder)
      : "covers";

    // MIME tipini kısıtlıyoruz ki disk'e keyfi dosya (ör. .html/.php) yazılamasın
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json({ success: false, message: "Only image files (JPG, PNG, WEBP, GIF) are allowed" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ success: false, message: "File is too large (max 5MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    // Path traversal ve dosya sistemi için geçersiz karakterleri temizle (ör. "../", boşluk)
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const filename = `${uniqueSuffix}-${originalName}`;
    
    const filepath = path.join(process.cwd(), "public", folder, filename);

    await writeFile(filepath, buffer);

    const url = `/${folder}/${filename}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
