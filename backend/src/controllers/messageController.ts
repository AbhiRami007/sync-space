import { Request, Response } from "express";
import {
  createMessageService,
  getMessagesByRoomService,
} from "../services/messageService";
import { getRoomByIdService } from "../services/roomService";

export const sendMessage = (req: Request, res: Response) => {
  try {
    const { roomId, text } = req.body;
    const userId = (req as Request & { user?: { id: string } }).user?.id;

    if (!roomId || !text) {
      return res.status(400).json({
        success: false,
        message: "Room ID and text are required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const room = getRoomByIdService(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const message = createMessageService(roomId, text, userId);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export const getMessagesByRoom = (req: Request, res: Response) => {
  try {
    const { roomId } : any = req.params;

    const room = getRoomByIdService(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const roomMessages = getMessagesByRoomService(roomId);

    return res.status(200).json({
      success: true,
      roomId,
      messages: roomMessages,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};