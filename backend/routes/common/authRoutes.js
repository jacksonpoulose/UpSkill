const express = require("express");
const passport = require("passport");

const {registerController, 
  loginController, 
  logoutController, 
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController} = require("../../controllers/authController")
  const {googleAuthController, googleAuthCallbackController} = require("../../controllers/googleAuthController");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/verify-email", verifyEmailController);


router.post("/logout", logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController); 

router.get("/google", googleAuthController);
router.get("/google/callback", googleAuthCallbackController, (req, res) => {
  // This is called only if authentication was successful
  res.redirect("http://localhost:3000/dashboard");
});



module.exports = router;
