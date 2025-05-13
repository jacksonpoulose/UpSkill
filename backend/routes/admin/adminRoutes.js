const express = require("express");
const router = express.Router();
const { getDashboard } = require("../../controllers/admin/adminController");
const {
  getCourses,
  postAddCourse,
  getIndividualCourse,
  postEditCourse,
  postDeleteCourse,
} = require("../../controllers/admin/courseController");
const { getMentors, getIndividualMentor } = require("../../controllers/admin/mentorController");
const { getStudents, getIndividualStudent } = require("../../controllers/admin/studentController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.get("/dashboard", verifyToken, checkRole(["admin"]), getDashboard);
router.get("/courses", verifyToken, checkRole(["admin"]), getCourses);
router.get("/students", verifyToken, checkRole(["admin"]), getStudents);
router.get("/mentors", verifyToken, checkRole(["admin"]), getMentors);

router.post("/courses/add", verifyToken, checkRole(["admin"]), postAddCourse);
router.post("/courses/edit/:_id", verifyToken, checkRole(["admin"]), postEditCourse);
router.post("/courses/delete/:_id", verifyToken, checkRole(["admin"]), postDeleteCourse);
router.get("/courses/:_id", verifyToken, checkRole(["admin"]), getIndividualCourse);

router.post("/students/:_id", verifyToken, checkRole(["admin"]), getIndividualStudent);
router.post("/mentors/:_id", verifyToken, checkRole(["admin"]), getIndividualMentor);

module.exports = router;
