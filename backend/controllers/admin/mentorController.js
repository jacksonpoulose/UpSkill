const Users = require("../../models/userModel");
const Courses = require("../../models/courseModel");

const getMentors = (req, res) => {
  try {
    res.status(200).json({ message: "welcome to Mentors page" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
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