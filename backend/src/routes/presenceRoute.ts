import { Router } from "express";
import { getRoomPresence } from "../controllers/presenceController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/:roomId", protect, getRoomPresence);

export default router;