const express = require("express");
const router = express.Router();

const adminRoutes = require("./admin/adminRoutes");
const studentRoutes = require("./student/studentRoutes");
const mentorRoutes = require("./mentor/mentorRoutes");
const commonRoutes = require("./common/commonRoutes");
const authRoutes = require("./common/authRoutes");
const userRoutes = require("./user/userRoutes");

router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);
router.use("/mentor", mentorRoutes);
router.use("/common", commonRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
