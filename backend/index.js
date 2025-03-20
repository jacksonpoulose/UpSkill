const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); 
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "backend is working!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
