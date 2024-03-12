// categoryController.js
const Category = require("../models/Category");

// GET /categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /categories
const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// PUT /categories/:id
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// DELETE /categories/:id
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
