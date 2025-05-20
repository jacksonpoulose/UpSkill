const express = require("express");
const router = express.Router();
const { getDashboard } = require("../../controllers/mentor/mentorController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");
const {
  getCoursesList,
  getIndividualCourse,
} = require("../../controllers/mentor/mentorController");
const {
  getStudentsList,
  getIndividualStudent,
} = require("../../controllers/mentor/studentController");

router.get("/dashboard", verifyToken, checkRole(["mentor"]), getDashboard);
router.get("/courses/:_id", verifyToken, checkRole(["mentor"]), getIndividualCourse);
router.get("/courses", verifyToken, checkRole(["mentor"]), getCoursesList);
router.get("/students", verifyToken, checkRole(["mentor"]), getStudentsList);
router.get("/students/:_id", verifyToken, checkRole(["mentor"]), getIndividualStudent);

module.exports = router;
