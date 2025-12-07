const course = require("../../models/course/course");
const User = require("../../models/userModel");
const studentProgress = require("../../models/studentProgress");
const StudentProfile = require("../../models/studentProfile");

const getCourseTracker = async (req, res) => {
  try {
    const userId = req.user.id;
    const studentProfile = await StudentProfile.findOne({ userId }).populate("courseId");

    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const progress = await studentProgress.findOne({ userId, courseId: studentProfile.courseId });

    res.status(200).json({ course: studentProfile.courseId, progress });
  } catch (error) {
    console.error("Error fetching course tracker:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCourseTracker,
};
