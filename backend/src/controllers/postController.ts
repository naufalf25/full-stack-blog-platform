import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.ts";
import Post from "../models/Post.ts";

const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Title and content cannot be empty" });
      return;
    }

    const newPost = new Post({
      title,
      content,
      category,
      author: req.user?.id,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "New post created successfull", post: newPost });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to create new post", error: error.message });
  }
};

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find()
      .populate("author", "name username")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to get posts data", error: error.message });
  }
};

const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name username"
    );
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    res.status(200).json(post);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to get detail post", error: error.message });
  }
};

const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, category } = req.body;
    const postId = req.params.id;

    if (!title || !content) {
      res.status(400).json({ message: "Title and content cannot be empty." });
      return;
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    if (post.author.toString() !== req.user?.id) {
      res.status(403).json({
        message: "Unauthorized: You are not allowed to edit this post.",
      });
      return;
    }

    post.title = title;
    post.content = content;
    if (category) post.category = category;

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
};

const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post.author.toString() !== req.user?.id) {
      res.status(403).json({
        messgae: "Unauthorized: You are not allowed to delete this post.",
      });
      return;
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
