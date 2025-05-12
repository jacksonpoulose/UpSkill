const Course = require("../../models/courseModel");

const getDashboard = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to mentor dashboard" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getCoursesList = async (req, res) => {
  try {
    const course = await Course.find({});
    res
      .status(200)
      .json({ message: "welcome to courses list", courses: course });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};
const getStudentsList = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to students list" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};
const getIndividualCourse = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to individual course" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

module.exports = {
  getDashboard,
  getCoursesList,
  getStudentsList,
  getIndividualCourse,
  // getIndividualStudent,
  // postAddTask,
  // postEditTask,
  // postDeleteTask,
  // getIndividualTask,
};
