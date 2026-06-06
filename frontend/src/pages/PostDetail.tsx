import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";

interface Author {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
}

interface Comment {
  _id: string;
  content: string;
  author: Author;
  createdAt: string;
}

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          await api.get(`/posts/${id}`),
          await api.get(`/posts/${id}/comments`),
        ]);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
      } catch {
        setError("Failed to load post details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPostAndComments();
  }, [id]);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch {
      setError("Failed to delete the post.");
    }
  };

  const handleAddComment = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      console.log(newComment);
      const response = await api.post(`/posts/${id}/comments`, {
        content: newComment,
      });
      console.log(response.data);

      const addedComment = {
        ...response.data.comment,
        author: { _id: currentUser.id, name: currentUser.name },
      };
      setComments([addedComment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.log(error);
      alert("Failed to add comment. Please make sure you are logged in.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch {
      alert("Failed to delete comment.");
    }
  };

  const submitEditComment = async (commentId: string) => {
    if (!editCommentContent.trim()) return;
    try {
      await api.put(`/comments/${commentId}`, { content: editCommentContent });
      setComments(
        comments.map((c) =>
          c._id === commentId ? { ...c, content: editCommentContent } : c
        )
      );
      setEditingCommentId(null);
    } catch {
      alert("Failed to update comment.");
    }
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div className="py-10 text-center text-red-500">
        {error || "Post not found"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Post Section */}
      <article className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <header className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {post.title}
          </h1>
          <div className="flex flex-col justify-between text-sm text-gray-500 sm:flex-row sm:items-center">
            <span>
              By {post.author.name} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            {currentUser && currentUser.id === post.author._id && (
              <div className="mt-3 flex space-x-3 sm:mt-0">
                <Link
                  to={`/posts/${post._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDeletePost}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="leading-relaxed whitespace-pre-wrap text-gray-800">
          {post.content}
        </div>
      </article>

      {/* Comments Section */}
      <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Comments ({comments.length})
        </h2>

        {/* Add Comment Form */}
        {currentUser ? (
          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              required
              rows={3}
              className="mb-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="mb-8 rounded-md bg-blue-50 p-4 text-center text-blue-800">
            Please{" "}
            <Link to="/login" className="font-semibold underline">
              log in
            </Link>{" "}
            to leave a comment.
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="rounded-md border border-gray-200 bg-white p-4"
            >
              <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium text-gray-900">
                  {comment.author.name}
                </span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              {editingCommentId === comment._id ? (
                <div className="mt-2">
                  <textarea
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                  />
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => submitEditComment(comment._id)}
                      className="rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap text-gray-700">
                    {comment.content}
                  </p>
                  {currentUser && currentUser.id === comment.author._id && (
                    <div className="mt-3 flex space-x-3 text-sm">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditCommentContent(comment.content);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* No Comments Section */}
          {comments.length === 0 && (
            <p className="text-center text-gray-500">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;
