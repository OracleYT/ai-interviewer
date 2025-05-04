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
      isViolation: voilation === "true",
    });

    if (!file) {
      console.error("[save-evidence] No file provided in request");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const fileName = `${Date.now()}-${randomUUID({ disableEntropyCache: true })}`;

    const uploadKey = `evidence/${interviewId}/${fileName}`;
    console.log("[save-evidence] Starting S3 upload with key:", uploadKey);

    uploadFileToS3(file, bucket, uploadKey)
      .then((response) => {
        console.log("[save-evidence] File uploaded successfully:", response);
        console.log("[save-evidence] Adding evidence record to database");
        return {
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
      })
      .then(addImageEvidance)
      .then((result) => {
        console.log(
          "[save-evidence] Evidence record added successfully:",
          result
        );
      })
      .catch((err) => {
        console.log(
          "[save-evidence] Error in S3 upload or database update:",
          err
        );
      });

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
