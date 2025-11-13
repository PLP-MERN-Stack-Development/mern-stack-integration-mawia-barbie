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
    // Applied Tailwind classes for card-like styling
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-purple-200 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4" // Tailwind for flex column and gap
      >
        <input
          type="text" // Added type for semantic correctness
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" // Tailwind for input styling
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
          rows="6" // Added rows for better textarea appearance
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" // Tailwind for textarea styling
        />
        <button type="submit" className="btn">
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;