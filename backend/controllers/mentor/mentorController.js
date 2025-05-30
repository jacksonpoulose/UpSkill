const Course = require("../../models/course/course");
const User = require("../../models/userModel");
const MentorProfile = require("../../models/mentorProfile");

const getDashboard = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to mentor dashboard" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const getProfilePage = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("mentorProfile");
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
    const role = req.user.role; // Make sure you store role in JWT or session

    const { fullName, email, phone } = req.body;

    // 1. Update the main User record
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Conditionally update role-specific profile
    let profileUpdateResult = null;

    if (role === "mentor") {
      const {
        expertiseAreas,
        bio,
        linkedinProfile,
        yearsOfExperience,
        availability,
        certifications,
      } = req.body;

      profileUpdateResult = await MentorProfile.findOneAndUpdate(
        { userId },
        {
          $set: {
            expertiseAreas,
            bio,
            linkedinProfile,
            yearsOfExperience,
            availability,
            certifications,
          },
        },
        { new: true }
      );

      if (!profileUpdateResult) {
        return res.status(404).json({ message: "Mentor profile not found" });
      }
    } else {
      return res
        .status(403)
        .json({ message: "Access denied: Only mentors can update mentor profile" });
    }

    return res.status(200).json({
      message: "Mentor profile updated successfully",
      user: updatedUser,
      mentorProfile: profileUpdateResult,
    });
  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCoursesList = async (req, res) => {
  try {
    const course = await Course.find({});
    res.status(200).json({ message: "welcome to courses list", courses: course });
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
  getIndividualCourse,
  getProfilePage,
  updateProfile,
};
