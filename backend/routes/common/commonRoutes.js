const express = require('express');
const router = express.Router();
const { home, about, contact, courseCards,getCourseById,getTestimonials } = require('../../controllers/common/commonController');
const { route } = require('./authRoutes');

// Public routes
router.get('/home', home);
router.get('/about', about);
router.get('/contact', contact);
router.get('/courses', courseCards);
router.get('/courses/:id', getCourseById);
router.get('/testimonials', getTestimonials);


module.exports = router;