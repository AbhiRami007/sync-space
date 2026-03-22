import { Request, Response } from "express";
import { uploadFileToS3 } from "../services/uploadService";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const result = await uploadFileToS3(file);

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return res.status(500).json({
      success: false,
      message: "File upload failed",
    });
  }
};