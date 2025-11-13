// src/components/PostView.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { postService } from "../services/api.js";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Post not found 😅</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/edit/${post._id}`}>
          <button>Edit</button>
        </Link>
        <Link to="/" style={{ marginLeft: "10px" }}>
          <button>Back to Posts</button>
        </Link>
      </div>
    </div>
  );
}

