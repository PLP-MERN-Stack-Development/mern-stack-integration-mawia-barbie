const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort('name');
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// CREATE category
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
