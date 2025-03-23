const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongoDB ${conn.connection.host}`);
  } catch {
    console.error(`error in mongoDB ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
