import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import path from 'node:path'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const image: File | null = data.get("image") as unknown as File;

  if (!image) {
    return NextResponse.json({success: false });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  if (buffer.length === 0) {
    return NextResponse.json({success: false, error: "Image is empty" });
  }
  const filePath = path.join(process.cwd(), "public", image.name);
  await writeFile(filePath, buffer);
  console.log(`open ${filePath} to see the uploaded image`);
  const res = await cloudinary.uploader.upload(filePath, {
    folder: "uploads",
    public_id: image.name,
  });
  return NextResponse.json({
    message: "Image uploaded successfully",
    url: res.secure_url,
    public_id: res.public_id,
  });
}
