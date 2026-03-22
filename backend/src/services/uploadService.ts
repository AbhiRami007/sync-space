import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3";

export const uploadFileToS3 = async (file: Express.Multer.File) => {
  const fileKey = `uploads/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  console.log("REQ FILE:", req.file);
  await s3Client.send(command);

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  return {
    fileKey,
    fileUrl,
  };
};