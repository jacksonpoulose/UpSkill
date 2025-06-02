const express = require("express");
const router = express.Router();

const { mentorRegistration } = require("../../controllers/user/userController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

router.use(verifyToken, checkRole(["guest"]));

router.post("/mentorregistration", mentorRegistration);

module.exports = router;