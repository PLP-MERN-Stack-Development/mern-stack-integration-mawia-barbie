// App.jsx
import { Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList.jsx";
import CreatePost from "./components/CreatePost.jsx";
import EditPost from './components/EditPost'
import PostView from "./components/PostView.jsx";



function App() {
  return (
    <div className="container mx-auto p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📰 MERN Blog</h1>
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">
            All Posts
          </Link>
          <Link to="/create" className="text-green-600 hover:underline">
            Create Post
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostView />} />

      </Routes>
    </div>
  );
}

export default App;
