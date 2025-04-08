const express = require("express");
const router = express.Router();
const { getDashboard,getCourses, getMentors, getStudents } = require("../../controllers/adminController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.get("/dashboard", verifyToken, checkRole(["admin"]), getDashboard);
router.get("/courses", verifyToken, checkRole(["admin"]), getCourses);
router.get("/students", verifyToken, checkRole(["admin"]), getStudents);
router.get("/mentors", verifyToken, checkRole(["admin"]), getMentors);


module.exports = router;
