const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.static(path.join(__dirname,'public')))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("server running on port")
})
  