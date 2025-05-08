const Users = require("../../models/userModel");
const Courses = require("../../models/courseModel");
const getDashboard = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to admin dashboard" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json({ message: "welcome to Courses" ,courses: courses});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Users.find({ role: "student" });
    res
      .status(200)
      .json({ message: "welcome to Students page", users: students });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getMentors = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to Mentors page" });
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

const getIndividualStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    const student = await Users.findById(_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: `Welcome to Student ${_id}`, student });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getIndividualMentor = async (req, res) => {
  try {
    const { _id } = req.params;
    const mentor = await Users.findById(_id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.status(200).json({ message: `Welcome to Mentor ${_id}`, mentor });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getDashboard,
  getCourses,
  getStudents,
  getMentors,
  postAddCourse,
  getIndividualCourse,
  postEditCourse,
  postDeleteCourse,
  getIndividualStudent,
  getIndividualMentor,
};
