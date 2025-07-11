const Category = require("../../models/course/category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: "Welcome to Categories", categories });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Page not found" });
  }
};

const postAddCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json({ category }); 
  } catch (err) {
    console.error("Error creating category:", err); 
    res.status(500).json({ message: "Error creating category", error: err.message });
  }
};
const postEditCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", category: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: "Error updating category" });
  }
};

const toggleCategoryStatus = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isActive = !category.isActive;
    await category.save();

    res.status(200).json({
      message: `Category ${category.isActive ? "listed" : "unlisted"} successfully`,
      category,
    });
  } catch (err) {
    console.error("Error toggling category status:", err);
    res.status(500).json({ message: "Error updating category status" });
  }
};


module.exports = {
  getCategories,
  postAddCategory,
  postEditCategory,
  toggleCategoryStatus,
};
