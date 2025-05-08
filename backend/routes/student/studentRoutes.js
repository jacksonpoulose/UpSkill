const express = require('express');
const router = express.Router();
const {getDashboard, 
    getTasksheet
} = require("../../controllers/student/studentController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.get("/dashboard", verifyToken, checkRole(["student"]),getDashboard);
router.get("/tasksheet", verifyToken, checkRole(["student"]),getTasksheet); 

module.exports = router;