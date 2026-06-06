import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
}

function Profile() {
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const response = await api.get("/posts");
        const userPosts = response.data.filter(
          (post: Post) => post.author._id === currentUser.id
        );
        setMyPosts(userPosts);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [currentUser, navigate]);

  const getInitialName = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  if (!currentUser) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10 flex flex-col items-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:flex-row md:items-start md:space-x-6">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white md:mb-0">
          {getInitialName(currentUser.name)}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentUser.name}
          </h1>
          <p className="mt-1 text-gray-500">{currentUser.email}</p>
          <div className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            Author
          </div>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
        <Link
          to="/posts/create"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create New Post
        </Link>
      </div>
      {isLoading ? (
        <div className="py-10 text-center">Loading your posts...</div>
      ) : myPosts.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-10 text-center">
          <p className="mb-4 text-gray-600">
            You haven't written any posts yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myPosts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-gray-900">
                {post.title}
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                Published on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-4 line-clamp-3 grow text-gray-700">
                {post.content}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                <Link
                  to={`/post/${post._id}`}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  View Post
                </Link>
                <Link
                  to={`/edit-post/${post._id}`}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
