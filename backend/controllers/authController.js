const Users = require("../models/userModel");

const registerController = async () => {
   
  try {
    const {username,email,password,phone} = req.body;
  } catch (error) {
    console.error(error)
    res.status(500).send({
        success:false,
        message:"error in registration",
        error
    })
  }
};

const loginController = async () => {};

module.exports = {
  registerController,
  loginController,
};
