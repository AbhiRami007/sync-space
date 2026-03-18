import { Server, Socket } from "socket.io";

export const registerChatHandlers = (io: Server, socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (roomId: string) => {
    console.log("join_room received", roomId);
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    console.log("send_message received", data);

    io.to(data.roomId).emit("receive_message", {
      id: Date.now().toString(),
      roomId: data.roomId,
      text: data.text,
      senderId: data.senderId,
      createdAt: new Date().toISOString(),
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};