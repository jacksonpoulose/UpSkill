const express = require('express');
const router = express.Router();
const {getDashboard} = require("../../controllers/mentorController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.get("/dashboard", verifyToken, checkRole(["mentor"]),getDashboard);

module.exports = router;