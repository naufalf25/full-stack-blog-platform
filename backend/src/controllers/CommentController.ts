import { Response } from "express";
import { AuthRequest } from "../middleware/auth.ts";
import Post from "../models/Post.ts";
import Comment from "../models/Comment.ts";

const createComment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { content } = req.body;
    const postId = req.params.id;

    if (!content) {
      res.status(400).json({ message: "Comment content cannot be empty." });
      return;
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    const newComment = new Comment({
      content,
      post: postId,
      author: req.user?.id,
    });

    await newComment.save();
    res.status(201).json({
      message: "Created new comment successfully",
      comment: newComment,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to create new comment", error: error.message });
  }
};

const getCommentsByPost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to get comments", error: error.message });
  }
};

const updateComment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { content } = req.body;
    const commentId = req.params.id;

    if (!content) {
      res.status(400).json({ message: "Comment content cannot be empty." });
      return;
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }

    if (comment.author.toString() !== req.user?.id) {
      res.status(403).json({
        message: "Unauthorized: You are not allowed to edit this comment.",
      });
      return;
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to update comment", error: error.message });
  }
};

const deleteComment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }

    if (comment.author.toString() !== req.user?.id) {
      res.status(403).json({
        message: "Unauthorized: You are not allowed to edit this comment.",
      });
      return;
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: error.message });
  }
};

export { createComment, getCommentsByPost, updateComment, deleteComment };
