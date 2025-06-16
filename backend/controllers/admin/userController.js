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

const postBlockUnblockUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { isActive } = req.body;
    if(isActive === true){
      const user = await Users.findByIdAndUpdate(_id, { isActive: false });
      res.status(200).json({ message: "User blocked", user });
    }else{
      const user = await Users.findByIdAndUpdate(_id, { isActive: true });
      res.status(200).json({ message: "User unblocked", user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getIndividualUser, postBlockUnblockUser };  