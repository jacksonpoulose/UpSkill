const passport = require("passport");

const googleAuthController = passport.authenticate("google", { scope: ["profile", "email"] });

const googleAuthCallbackController = passport.authenticate("google", {
  failureRedirect: "/login",
  session: true, // Optional: only if using sessions
});

module.exports = {
  googleAuthController,
  googleAuthCallbackController
};