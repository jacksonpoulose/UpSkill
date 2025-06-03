const Users = require("../../models/userModel");
const Courses = require("../../models/course/course");
const Mentor=require("../../models/mentorProfile")

const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find(); // You can customize with filters if needed
    res.status(200).json({ mentors });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ message: "Server error" });
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
    getMentors,
    getIndividualMentor,
  };