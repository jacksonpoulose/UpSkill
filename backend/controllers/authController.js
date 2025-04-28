const User = require("../models/userModel.js");
const JWT = require("jsonwebtoken")
const { hashPassword, comparePassword } = require("../utils/authUtil");
const loginValidation = require("../validations/loginValidation.js");
const registerValidation = require("../validations/registerValidation");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body);
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered user! please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);

//     const { error } = loginValidation(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "invalid credentials" });

//     const isMatch = await comparePassword(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "invalid credentials" });

//     const token = JWT.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: "error in login",
//       error,
//     });
//   }
// };

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });

    const token = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Send back token + user details (without password)
    res.json({ 
      token, 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
