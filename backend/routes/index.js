const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin/adminRoutes');
const studentRoutes = require('./student/studentRoutes');
const mentorRoutes = require('./mentor/mentorRoutes');
const commonRoutes = require('./common/commonRoutes');
const authRoutes = require("./common/authRoutes")


router.use('/admin', adminRoutes);
router.use('/student', studentRoutes);
router.use('/mentor', mentorRoutes);
router.use('/common', commonRoutes);
router.use('/auth', authRoutes)

module.exports = router;
