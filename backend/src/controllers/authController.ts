import { Request, Response } from "express";
import {
  createUser,
  loginUser,
  generateToken,
  findUserById,
} from "../services/authService";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await createUser(name, email, password);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
      token: generateToken(user.id),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Signup failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token: generateToken(user.id),
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

export const getMe = (req: Request, res: Response) => {
  const userId = (req as Request & { user?: { id: string } }).user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
};