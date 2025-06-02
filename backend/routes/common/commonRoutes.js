const express = require('express');
const router = express.Router();
const { home, about, contact, courseCards } = require('../../controllers/common/commonController');

// Public routes
router.get('/home', home);
router.get('/about', about);
router.get('/contact', contact);
router.get('/courses', courseCards);

module.exports = router;