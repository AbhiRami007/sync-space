import { Router } from "express";
import healthRoutes from "./healthRoute";
import authRoutes from "./authRoutes";
import roomRoutes from "./roomRoutes";
import messageRoutes from "./messageRoutes";
import presenceRoutes from "./presenceRoute";
import uploadRoutes from "./uploadRoute";

const router = Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/rooms", roomRoutes);
router.use("/messages", messageRoutes);
router.use("/presence", presenceRoutes);
router.use("/upload", uploadRoutes);

export default router;