import { NextRequest, NextResponse } from "next/server";

import { uploadFileToS3 } from "@/libs/aws/s3";
import { addProcterEvidance } from "@/action/interview-action";

const bucket = process.env.AWS_S3_BUCKET || "";

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

    const uploadKey = `evidance/${interviewId}/${Date.now()}-${file.name}`;
    console.log("[save-evidence] Starting S3 upload with key:", uploadKey);

    uploadFileToS3(file, bucket, uploadKey)
      .then(async (response) => {
        console.log("[save-evidence] File uploaded successfully:", {
          url: response.url,
          key: uploadKey,
        });

        console.log("[save-evidence] Adding evidence record to database");
        await addProcterEvidance({
          interviewId,
          evidence: {
            title,
            evidence: {
              evidenceURL: response.url,
            },
            violation: voilation == "true",
            capturedAt: new Date(),
          },
        });
        console.log("[save-evidence] Evidence record added successfully");
      })
      .catch((err) => {
        console.error(
          "[save-evidence] Error in S3 upload or database update:",
          err
        );
      });

    console.log("[save-evidence] Responding with success message");
    return NextResponse.json({
      message: "processing voliation image",
    });
  } catch (error) {
    console.error("[save-evidence] Error processing request:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
