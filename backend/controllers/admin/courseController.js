const Users = require("../../models/userModel");
const Courses = require("../../models/courseModel");

const getCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json({ message: "welcome to Courses" ,courses});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};
const postAddCourse = async (req, res) => {
    const { title, description } = req.body;
    try {
      const existingCourse = await Courses.findOne({ title });
      if (existingCourse) {
        return res
          .status(400)
          .json({ message: "this course title already exists" });
      }
      const newCourse = new Courses({
        title,
        description,
      });
  
      const savedCourse = await newCourse.save();
      res.status(201).json({ message: "course saved" });
    } catch (error) {
      console.log(error);
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
      const id = req.params._id;
      const { title, description } = req.body;
      const course = await Courses.findById(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      const updatedCourse = await Courses.findByIdAndUpdate(
        id,
        {
          title,
          description,
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const postDeleteCourse = async (req, res) => {
    try {
      const { _id } = req.params;
      const course = await Courses.findById(_id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      await Courses.findByIdAndDelete(_id);
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {
    getCourses,
    postAddCourse,
    getIndividualCourse,
    postEditCourse,
    postDeleteCourse,
  };