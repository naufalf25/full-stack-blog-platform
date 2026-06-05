import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/CommentController.js";

const router = Router();

// Route for Post
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

// Router for Comment
router.get("/:id/comments", getCommentsByPost);
router.get("/:id/comments", authMiddleware, createComment);

export default router;
