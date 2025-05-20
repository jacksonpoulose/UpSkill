const course = require("../../models/courseModel");
const User = require("../../models/userModel");
const StudentProfile = require("../../models/studentProfile");

const getDashboard = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to student dashboard" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getTasksheet = async (req, res) => {
  try {
    const course = await course.findOne({});
    res.status(200).json({ message: "welcome to student syllabus" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getProfilePage = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("studentProfile");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, phone, learningGoals, skillLevel, githubLink, portfolioLink } = req.body;

    // Update the User document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the StudentProfile document
    const updatedStudentProfile = await StudentProfile.findOneAndUpdate(
      { userId },
      {
        $set: {
          learningGoals,
          skillLevel,
          githubLink,
          portfolioLink
        }
      },
      { new: true }
    );

    if (!updatedStudentProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      studentProfile: updatedStudentProfile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { getDashboard, getTasksheet, getProfilePage, updateProfile };
