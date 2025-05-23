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
const {
  postAddCategory,
  postEditCategory,
  postDeleteCategory,
} = require("../../controllers/admin/categoryController");
const { getMentors, getIndividualMentor } = require("../../controllers/admin/mentorController");
const { getStudents, getIndividualStudent } = require("../../controllers/admin/studentController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.use(verifyToken, checkRole(["admin"]));

router.get("/dashboard", getDashboard);
router.get("/courses", getCourses);
router.get("/students", getStudents);
router.get("/mentors", getMentors);

router.post("/category/add", postAddCategory);
router.put("/category/:id/edit", postEditCategory);
router.delete("/category/:id", postDeleteCategory);

router.post("/courses/add", postAddCourse);
router.put("/courses/:id/edit", postEditCourse);
router.delete("/courses/:id", postDeleteCourse);

router.get("/courses/:id", getIndividualCourse);

router.post("/students/:id", getIndividualStudent);
router.post("/mentors/:id", getIndividualMentor);

module.exports = router;
