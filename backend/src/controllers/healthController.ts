import { Request, Response } from "express";
import { getHealthMessage } from "../services/healthService";

export const getHealth = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: getHealthMessage(),
  });
};