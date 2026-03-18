import { Router } from "express";
import healthRoutes from "./healthRoute";
import authRoutes from "./authRoutes";
import roomRoutes from "./roomRoutes";
import messageRoutes from "./messageRoutes";
import presenceRoutes from "./presenceRoute";

const router = Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/rooms", roomRoutes);
router.use("/messages", messageRoutes);
router.use("/presence", presenceRoutes);

export default router;