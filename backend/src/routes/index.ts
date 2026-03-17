import { Router } from "express";
import healthRoutes from "./healthRoute";

const router = Router();

router.use("/", healthRoutes);
router.use("/auth", )

export default router;