const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes.js")

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes)

app.get("/api/test", (req, res) => {
  res.json({ message: "backend is working!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
