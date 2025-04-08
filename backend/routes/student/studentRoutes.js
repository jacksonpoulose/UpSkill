const express = require('express');
const router = express.Router();
const {getDashboard} = require("../../controllers/studentController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.get("/dashboard", verifyToken, checkRole(["student"]),getDashboard);

module.exports = router;