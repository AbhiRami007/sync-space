import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import { notFound } from "./middleware/notFound";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Sync Space backend is running");
});

app.use("/api", apiRoutes);

app.use(notFound);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});