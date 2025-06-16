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
    const { _id } = req.params;
    const user = await Users.findById(_id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getIndividualUser };  