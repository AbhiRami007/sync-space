import { Server, Socket } from "socket.io";
import { getRoomByIdService } from "../services/roomService";
import { createMessageService } from "../services/messageService";
import {
  addUserToRoomPresence,
  removeUserFromRoomPresence,
  getOnlineUsersByRoom,
} from "../services/presenceService";

type ActiveSocketData = {
  roomId?: string;
  userId?: string;
};

export const registerChatHandlers = (io: Server, socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  const activeData: ActiveSocketData = {};

  socket.on("join_room", async (data: { roomId: string; userId: string }) => {
    const { roomId, userId } = data;

    if (!roomId || !userId) {
      socket.emit("socket_error", {
        success: false,
        message: "roomId and userId are required",
      });
      return;
    }

    const room = getRoomByIdService(roomId);

    if (!room) {
      socket.emit("socket_error", {
        success: false,
        message: "Room not found",
      });
      return;
    }

    socket.join(roomId);

    activeData.roomId = roomId;
    activeData.userId = userId;

    await addUserToRoomPresence(roomId, userId);

    const onlineUsers = await getOnlineUsersByRoom(roomId);

    io.to(roomId).emit("presence_update", {
      success: true,
      roomId,
      onlineUsers,
    });

    console.log(`Socket ${socket.id} joined room ${roomId} as user ${userId}`);
  });

  socket.on(
    "send_message",
    (data: { roomId: string; text: string; senderId: string }) => {
      const { roomId, text, senderId } = data;

      if (!roomId || !text || !senderId) {
        socket.emit("socket_error", {
          success: false,
          message: "roomId, text, and senderId are required",
        });
        return;
      }

      const room = getRoomByIdService(roomId);

      if (!room) {
        socket.emit("socket_error", {
          success: false,
          message: "Room not found",
        });
        return;
      }

      const savedMessage = createMessageService(roomId, text, senderId);

      io.to(roomId).emit("receive_message", {
        success: true,
        data: savedMessage,
      });
    }
  );

  socket.on("disconnect", async () => {
    if (activeData.roomId && activeData.userId) {
      await removeUserFromRoomPresence(activeData.roomId, activeData.userId);

      const onlineUsers = await getOnlineUsersByRoom(activeData.roomId);

      io.to(activeData.roomId).emit("presence_update", {
        success: true,
        roomId: activeData.roomId,
        onlineUsers,
      });
    }

    console.log(`User disconnected: ${socket.id}`);
  });
};