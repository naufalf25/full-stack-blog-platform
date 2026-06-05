import { Router } from "express";
import { authMiddleware } from "../middleware/auth.ts";
import {
  deleteComment,
  updateComment,
} from "../controllers/CommentController.ts";

const router = Router();

router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
