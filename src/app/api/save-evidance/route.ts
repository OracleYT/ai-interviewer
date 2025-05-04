import { NextRequest, NextResponse } from "next/server";

import { uploadFileToS3 } from "@/libs/aws/s3";
import { addImageEvidance } from "@/action/interview-action";
import { randomUUID } from "crypto";

const bucket = process.env.AWS_S3_BUCKET || "";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  console.log("[save-evidence] Received request");
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const interviewId = formData.get("interviewId") as string;
    const title = formData.get("title") as string;
    const voilation = formData.get("voilation") as string;

    console.log("[save-evidence] Parsed form data:", {
      fileName: file?.name,
      fileSize: file?.size,
      interviewId,
      title,
      violation: voilation === "true",
    });

    if (!file) {
      console.error("[save-evidence] No file provided in request");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const fileName = `${Date.now()}-${randomUUID({ disableEntropyCache: true })}`;

    const uploadKey = `evidence/${interviewId}/${fileName}`;
    console.log("[save-evidence] Starting S3 upload with key:", uploadKey);

    try {
      const response = await uploadFileToS3(file, bucket, uploadKey);
      console.log("[save-evidence] File uploaded successfully:", response);
      console.log("[save-evidence] Adding evidence record to database");

      const evidencePayload = {
        interviewId,
        evidence: {
          title,
          evidence: {
            evidenceURL: response.url,
          },
          violation: voilation == "true",
          capturedAt: new Date(),
        },
      };

      const result = await addImageEvidance(evidencePayload);

      console.log("[save-evidence] Evidence record added successfully:", result);
    } catch (err) {
      console.log("[save-evidence] Error in S3 upload or database update:", err);
      return NextResponse.json({ error: "Upload or DB update failed" }, { status: 500 });
    }

    console.log("[save-evidence] Responding with success message");
    return NextResponse.json({
      message: "processing voliation image",
    });
  } catch (error: any) {
    console.log("[save-evidence] Error processing request:", error);
    console.log("[save-evidence] Error details:", error);
    console.log("[save-evidence] Error stack:", error.stack);
    console.log("[save-evidence] Error message:", error.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
