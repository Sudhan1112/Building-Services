const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
  })
);

app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
