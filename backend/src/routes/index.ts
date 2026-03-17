import { Router } from "express";
import healthRoutes from "./healthRoute";

const router = Router();

router.use("/", healthRoutes);

export default router;