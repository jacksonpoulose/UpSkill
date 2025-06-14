const express = require("express");
const passport = require("passport");

const {registerController, 
  loginController, 
  logoutController, 
  forgotPasswordController,
  resetPasswordController} = require("../../controllers/authController")

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController); 

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
  res.redirect("/dashboard");
});



module.exports = router;
