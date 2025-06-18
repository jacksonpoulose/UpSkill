const Users = require("../../models/userModel");
const Courses = require("../../models/course/course");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIndividualUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postBlockUnblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await Users.findByIdAndUpdate(
      id,
      { isActive },
      { new: true } // To return the updated user
    );

    const message = isActive ? "User unblocked" : "User blocked";
    res.status(200).json({ message, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getUsers, getIndividualUser, postBlockUnblockUser };
