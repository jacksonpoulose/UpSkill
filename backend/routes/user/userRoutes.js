const express = require("express");
const router = express.Router();
const{getCurrentUserProfile}=require("../../controllers/user/userController")
const { mentorRegistration } = require("../../controllers/user/mentorRegistration");
const {
  studentRegistration,
  getPayment,
  postPayment,
} = require("../../controllers/user/studentRegistration");

const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.use(verifyToken, checkRole(["guest"]));

router.post("/mentorregistration", mentorRegistration);
router.post("/studentregistration", studentRegistration);
router.get("/payment", getPayment);
router.post("/create-payment-intent", postPayment);
router.get('/me',verifyToken,getCurrentUserProfile)
module.exports = router;
