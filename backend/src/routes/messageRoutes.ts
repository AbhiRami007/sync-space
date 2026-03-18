import { Router } from "express";
import { sendMessage, getMessagesByRoom } from "../controllers/messageController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, sendMessage);
router.get("/:roomId", protect, getMessagesByRoom);

export default router;