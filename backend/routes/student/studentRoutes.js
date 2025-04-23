const express = require('express');
const router = express.Router();
const {getDashboard,
    getSyllabus 
} = require("../../controllers/student/studentController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.get("/dashboard", verifyToken, checkRole(["student"]),getDashboard);
router.get("syllabus", verifyToken, checkRole(["student"]),getSyllabus); 

module.exports = router;