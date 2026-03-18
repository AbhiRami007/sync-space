import { Request, Response } from "express";
import {
  createRoomService,
  getAllRoomsService,
  getRoomByIdService,
} from "../services/roomService";

export const createRoom = (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = (req as Request & { user?: { id: string } }).user?.id;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Room name is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const room = createRoomService(name, description || "", userId);

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to create room",
    });
  }
};

export const getAllRooms = (_req: Request, res: Response) => {
  const rooms = getAllRoomsService();

  return res.status(200).json({
    success: true,
    rooms,
  });
};

export const getRoomById = (req: Request, res: Response) => {
  const id: any = req.params.id;

  const room = getRoomByIdService(id);

  if (!room) {
    return res.status(404).json({
      success: false,
      message: "Room not found",
    });
  }

  return res.status(200).json({
    success: true,
    room,
  });
};