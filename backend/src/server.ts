import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import apiRoutes from "./routes";
import { notFound } from "./middleware/notFound";
import { registerChatHandlers } from "./sockets/chatSocket";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("SyncSpace backend is running");
});

app.use("/api", apiRoutes);
app.use(notFound);

const PORT = Number(process.env.PORT) || 4000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New socket connection");
  console.log("Socket id:", socket.id);
  registerChatHandlers(io, socket);
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});