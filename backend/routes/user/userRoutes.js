const express = require("express");
const router = express.Router();

const { mentorRegistration } = require("../../controllers/user/userController");
// const { studentRegistration } = require("../../controllers/student/studentController");
// const { postPayment, getPayment } = require("../../controllers/user/userController");

const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.use(verifyToken, checkRole(["guest"]));

router.post("/mentorregistration", mentorRegistration);
// router.post("/studentregistration", studentRegistration);
// router.get("/payment", getPayment);
// router.post("/payment", postPayment);

module.exports = router;