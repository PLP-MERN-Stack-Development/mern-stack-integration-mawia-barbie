// src/components/EditPost.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService } from "../services/api.js"; // ✅ correct import

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await postService.getPost(id); // ✅ direct single post fetch
        setPost({ title: postData.title, content: postData.content });
      } catch (err) {
        console.error("Error loading post:", err);
      }
    };
    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.updatePost(id, post); // ✅ correct update
      navigate("/");
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Edit Post</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPost;
