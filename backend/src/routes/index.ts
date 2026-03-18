import { Router } from "express";
import healthRoutes from "./healthRoute";
import authRoutes from "./authRoutes";
import roomRoutes from "./roomRoutes";

const router = Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/rooms", roomRoutes);

export default router;