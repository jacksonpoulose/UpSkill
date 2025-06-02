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

router.use(verifyToken, checkRole(["mentor"]));


router.get("/dashboard", getDashboard);
router.get("/courses/:_id", getIndividualCourse);
router.get("/courses", getCoursesList);
router.get("/students", getStudentsList);
router.get("/students/:_id", getIndividualStudent);

module.exports = router;