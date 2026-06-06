import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import axios from "axios";

interface Post {
  title: string;
  content: string;
  category?: string;
}

function CreatePost() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (isEditMode) {
      const fetchPostData = async () => {
        try {
          const response = await api.get(`/posts/${id}`);
          const post: Post = response.data;

          setTitle(post.title);
          setContent(post.content);
          setCategory(post.category || "");
        } catch {
          setError("Failed to load post data for edit.");
        } finally {
          setIsFetching(false);
        }
      };

      fetchPostData();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and Content cannot to be empty.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = { title, content, category };

      if (isEditMode) {
        await api.put(`/posts/${id}`, payload);
      } else {
        await api.post(`/posts`, payload);
      }

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.message ||
            "Failed to save post. Make sure you have the access."
        );
      } else {
        setError("Something went wrong on the server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="py-10 text-center">Loading editor data...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          {isEditMode ? "Edit Post" : "Create new post"}
        </h1>

        {error && (
          <div className="mb-6 rounded-md bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write interesting title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category (Optional)
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Example: Technology, Education, etc."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={8}
              className="w-full resize-y rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write your main content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-md px-6 py-2 font-semibold text-white transition-colors ${
                isLoading
                  ? "cursor-not-allowed bg-blue-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Saving..." : isEditMode ? "Save" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
