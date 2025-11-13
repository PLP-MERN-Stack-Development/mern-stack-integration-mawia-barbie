// src/components/CreatePost.jsx
import { useState } from "react";
import { postService } from "../services/api.js"; // ✅ import postService
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.createPost({ title, content }); // ✅ use postService
      navigate("/"); // go back to post list
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Create Post</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
