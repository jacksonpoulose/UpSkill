const User = require("../models/userModel.js");
const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/authUtil");
const loginValidation = require("../validations/loginValidation.js");
const registerValidation = require("../validations/registerValidation");
const {sendEmail,generateEmailVerificationToken} = require("../utils/sendEmail.js");




const registerController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
   
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered user! please login",
      });
    }



    const hashedPassword = await hashPassword(password);
    const emailVerificationToken = generateEmailVerificationToken();
    const emailVerificationTokenExpiresAt = Date.now() + 1000 * 60 * 60 * 24;

    console.log(emailVerificationToken);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
      emailVerificationToken,
      emailVerificationTokenExpiresAt,
    }).save();

    const verificationUrl = `${process.env.BACKEND_URL}/api/v1/auth/verify-email?token=${emailVerificationToken}`;

    await sendEmail({
      to: email,
      subject: "Email Verification",
      html: `<p>Hello ${name},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>`,
    });

    res.status(201).send({
      success: true,
      message: "User Registered successfully,  Please check your email to verify your account.",
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



const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;

    console.log("Received token:", token);

    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Token is missing",
      });
    }

    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid token",
      });
    }

    if (user.emailVerificationTokenExpiresAt < Date.now()) {
      return res.status(400).send({
        success: false,
        message: "Token has expired",
      });
    }

   
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiresAt = undefined;

    await user.save();

    res.send({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error in verifyEmailController:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Request Body:", req.body);


    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid credentials" });

    if (!user.isActive) return res.status(400).json({message: "Your account is blocked, please contact admin"});
    

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "invalid credentials" });

    const token = JWT.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
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

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Logout failed", error });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("CLIENT_URL from env:", process.env.CLIENT_URL);
    
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${encodeURIComponent(token)}`;

    console.log("CLIENT_URL inside forgotPasswordController:", process.env.CLIENT_URL);

    const htmlContent = `
  <h1>Password Reset</h1>
  <p>You requested to reset your password.</p>
  <a href="${resetUrl}">Click here to reset your password</a>
  <p>If the link doesn't work, copy and paste this URL in your browser:</p>
  <p>${resetUrl}</p>
  <p>This link will expire in 1 hour.</p>
`;

    console.log("resetUrl:", resetUrl);
    console.log("htmlContent:", htmlContent);
    
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: htmlContent,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    let decoded;
    try {
      decoded = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController,
  };
