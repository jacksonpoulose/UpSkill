const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  try {
const token = req.headers['authorization']?.split(" ")[1];
if(!token) return res.status(401).json({message: "Token required"});

JWT.verify(token,process.env.JWT_SECRET,(err,user)=>{
  if(err) return res.status(403).json({message:'invalid token'});
  req.user = user;
  next();
})
  } catch (error) {
    console.error(error);
  }
};

const checkRole = (roles) =>(req,res,next) =>{
  if(!roles.includes(req.user.role)){
    return res.status(403).json({message:'Access denied'})
  }
  next();
}

module.exports = {
  verifyToken,
  checkRole
}