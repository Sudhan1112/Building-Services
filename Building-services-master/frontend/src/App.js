import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/posts", form);
    setForm({ title: "", content: "" });
    fetchPosts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <br />
        <br />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        ></textarea>
        <br />
        <br />
        <button type="submit">Add Post</button>
      </form>
      <h2>Posts</h2>
      {posts.map((post, idx) => (
        <div
          key={idx}
          style={{ borderBottom: "1px solid #ccc", marginTop: 10 }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
