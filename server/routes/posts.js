const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// CREATE a post
router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});
// GET a single post by ID
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
