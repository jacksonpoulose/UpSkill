require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const morgan = require("morgan");
const routes = require("./routes");
const sessionMiddleware = require("./config/session");
const passport = require("./config/passport")

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1", routes);

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => console.log("Server running on port 3000"));
