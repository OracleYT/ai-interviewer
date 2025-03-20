import {
  PutObjectCommand,
  S3Client,
  //@ts-ignore
} from "@aws-sdk/client-s3";

const REGION = process.env.AWS_S3_REGION || "";

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || "",
  },
});

const uploadFileToS3 = async (file: File, bucket: string, key: string) => {
  try {
    console.log(`[uploadFileToS3] Starting upload for file: ${file.name}`);
    console.log(`[uploadFileToS3] Bucket: ${bucket}, Key: ${key}`);

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    console.log(
      `[uploadFileToS3] File converted to buffer. Size: ${fileBuffer.length} bytes`
    );

    // Prepare upload parameters
    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: file.type,
    };
    console.log(`[uploadFileToS3] Upload parameters prepared:`, uploadParams);

    // Upload file to S3
    const response = await s3.send(new PutObjectCommand(uploadParams));
    console.log(
      `[uploadFileToS3] File uploaded successfully. S3 Response:`,
      response
    );

    /// Generate singed url here
    // const signedUrl = await generatePresignedUrl(bucket, key);
    const url = `https://${bucket}.s3.${REGION}.amazonaws.com/${key}`;
    console.log(`[uploadFileToS3] Pre-signed URL generated: ${url}`);

    return {
      message: "File uploaded successfully",
      name: file.name,
      path: key,
      bucket,
      url,
      region: REGION,
    };
  } catch (error) {
    console.error(
      `[uploadFileToS3] Upload error for file: ${file.name}`,
      error
    );
    throw error;
  }
};

export { uploadFileToS3 };
