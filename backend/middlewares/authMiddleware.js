const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// const verifyToken = async (req, res, next) => {
//   let token = req.headers.authorization?.split(" ")[1];
//   console.log("Token received:", token);

//   if (!token) return res.status(401).json({ message: "Token required" });

//   try {
//     const decoded = JWT.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     next();
//   } catch (error) {
//     console.error(error);
//   }
// };

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = {
  verifyToken,
  checkRole,
};
