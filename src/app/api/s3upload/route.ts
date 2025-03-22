import { NextRequest, NextResponse } from "next/server";

import { uploadFileToS3 } from "@/libs/aws/s3";
import prisma from "@/libs/db/prisma";

const bucket = process.env.AWS_S3_BUCKET || "";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploadKey = `${Date.now()}-${file.name}`;
    const response = await uploadFileToS3(file, bucket, uploadKey);

    await prisma.upload.create({
      data: {
        bucket: response.bucket,
        path: response.path,
        name: response.name,
        region: response.region,
        url: response.url,
      },
    });
    return NextResponse.json({
      message: "File uploaded successfully",
      path: response.path,
      name: response.name,
      url: response.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
