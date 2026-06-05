import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  deleteComment,
  updateComment,
} from "../controllers/CommentController.js";

const router = Router();

router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
