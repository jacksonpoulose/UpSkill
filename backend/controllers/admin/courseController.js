const Users = require("../../models/userModel");
const Courses = require("../../models/course/course");
const Category = require("../../models/course/category");
const SubCategory = require("../../models/course/subCategory");

const getCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json({ message: "welcome to Courses" ,courses});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: "Welcome to Categories", categories });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Page not found" });
  }
};

const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({ message: "Welcome to SubCategories", subCategories });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Page not found" });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error creating category' });
  }
};

const addSubCategory = async (req, res) => {
  try {
    const { name, categoryId, description } = req.body;
    const subCategory = await SubCategory.create({ name, categoryId, description });
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(500).json({ message: 'Error creating sub-category' });
  }
};

const postAddCourse = async (req, res) => {
  try {
    const { title, description, categoryId, subCategoryId, weeks, createdBy } = req.body;
    const course = await Courses.create({
      title,
      description,
      categoryId,
      subCategoryId,
      weeks,
      createdBy,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error creating course' });
  }
};

  
  const getIndividualCourse = async (req, res) => {
    try {
      const { _id } = req.params;
      const course = await Courses.findById(_id);
  
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      res.status(200).json({ message: `Welcome to Course ${_id}`, course });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  
 const postEditCourse = async (req, res) => {
  try {
    const courseId = req.params.id; // use 'id' instead of '_id' in route param
    const { title, description, categoryId, subCategoryId, weeks } = req.body;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedCourse = await Courses.findByIdAndUpdate(
      courseId,
      {
        title: title || course.title,
        description: description || course.description,
        categoryId: categoryId || course.categoryId,
        subCategoryId: subCategoryId || course.subCategoryId,
        weeks: weeks || course.weeks,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Course updated", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postDeleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Courses.findByIdAndDelete(courseId);
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCourses,
  postAddCourse,
  getIndividualCourse,
  postEditCourse,
  postDeleteCourse,
  addCategory,
  addSubCategory,
  getCategories,
  getSubCategories,
};