const express = require("express");
const router = express.Router();
const {
  getDashboard,
  getTasksheet,
  getProfilePage,
  updateProfile,
  getMentorDetails,
} = require("../../controllers/student/studentController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.use(verifyToken, checkRole(["student"]));

//routes for student
router.get("/dashboard", getDashboard);
router.get("/tasksheet", getTasksheet);
router.get("/profile", getProfilePage);
router.put("/profile", updateProfile);
router.get("/mentor", getMentorDetails);

module.exports = router;
