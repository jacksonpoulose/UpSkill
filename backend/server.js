const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes);

// app.get("/api/test", (req, res) => {
//   res.json({ message: "backend is working!" });
// });

app.use((err,req,res,next)=>{
  console.log(err)
  res.status(500).json({message:err.message})
})

app.listen(3000, () => console.log("Server running on port 3000"));
