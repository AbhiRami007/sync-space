import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }

  const token = authHeader&& authHeader.split(" ")[1] || " ";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    (req as Request & { user?: JwtPayload }).user = { id: decoded.id };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};