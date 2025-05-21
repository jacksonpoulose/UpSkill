const User = require("../../models/userModel");
const StudentProfile = require("../../models/studentProfile");

const getStudentsList = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to students list" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getIndividualStudent = async (req, res) => {
  try {
    const studentId = req.params._id;
    const student = await User.findById(studentId).populate("studentProfile");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getStudentsList,
  getIndividualStudent,
};
