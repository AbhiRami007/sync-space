import { Server, Socket } from "socket.io";
import { getRoomByIdService } from "../services/roomService";
import { createMessageService } from "../services/messageService";

export const registerChatHandlers = (io: Server, socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (roomId: string) => {
    const room = getRoomByIdService(roomId);

    if (!room) {
      socket.emit("socket_error", {
        success: false,
        message: "Room not found",
      });
      return;
    }

    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
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

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};