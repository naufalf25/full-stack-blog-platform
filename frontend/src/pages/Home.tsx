import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Link } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch {
        setError("Failed to load posts data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Postingan Terbaru
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">
          Belum ada postingan saat ini.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-2 line-clamp-2 text-xl font-semibold text-gray-900">
                {post.title}
              </h2>

              <div className="mb-4 text-sm text-gray-500">
                By {post.author.name} •{" "}
                {new Date(post.createdAt).toLocaleDateString("id-ID")}
              </div>

              <p className="mb-4 line-clamp-3 grow text-gray-700">
                {post.content}
              </p>

              <Link
                to={`/post/${post._id}`}
                className="mt-auto inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
              >
                Read more &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
