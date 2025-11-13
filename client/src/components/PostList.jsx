import { useEffect, useState } from "react";
import { postService } from "../services/api.js";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts(); // fixed function name
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        All Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="card">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-4">{post.content}</p>

              <div className="flex gap-3">
                <Link to={`/posts/${post._id}`}>
                  <button className="btn">View</button>
                </Link>
                <Link to={`/edit/${post._id}`}>
                  <button className="btn">Edit</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
