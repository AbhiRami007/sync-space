import { Router } from "express";
import healthRoutes from "./healthRoute";
import authRoutes from "./authRoutes";
const router = Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes)

export default router;