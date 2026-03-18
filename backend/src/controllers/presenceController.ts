import { Request, Response } from "express";
import { getRoomByIdService } from "../services/roomService";
import { getOnlineUsersByRoom } from "../services/presenceService";

export const getRoomPresence = async (req: Request, res: Response) => {
  try {
    const { roomId }: any = req.params;

    const room = getRoomByIdService(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const onlineUsers = await getOnlineUsersByRoom(roomId);

    return res.status(200).json({
      success: true,
      roomId,
      onlineUsers,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch presence",
    });
  }
};