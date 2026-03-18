import { Router } from "express";
import {
  createRoom,
  getAllRooms,
  getRoomById,
} from "../controllers/roomController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createRoom);
router.get("/", protect, getAllRooms);
router.get("/:id", protect, getRoomById);

export default router;