const express = require("express");
const passport = require("passport");

const {registerController,loginController, logoutController, forgotPasswordController, resetPasswordController} = require("../../controllers/authController")

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController); // Assuming you have a reset password controller

// Step 1: Redirect user to Google login
router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

// Step 2: Google redirects back to this URL after user consents
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true, // if you're using sessions
  }),
  (req, res) => {
    // Successful login
    res.redirect('/dashboard'); // Or wherever you'd like to send the user
  }
);


module.exports = router;
