const express = require("express");

const {registerController,loginController} = require("../controllers/authController")

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user/dashboard")

module.exports = router;
