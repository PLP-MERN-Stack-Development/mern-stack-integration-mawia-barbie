// src/components/PostList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ needed for navigation
import { postService } from "../services/api.js";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        console.log("Fetched posts:", data);
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet 😅</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id} style={{ marginBottom: "20px" }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {/* View single post */}
                <Link to={`/posts/${post._id}`}>
                  <button>View</button>
                </Link>

                {/* Edit post */}
                <Link to={`/edit/${post._id}`}>
                  <button>Edit</button>
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
