const courses = require('../../models/course/course')


const home = (req, res) => {
    res.json({ message: "Welcome to the Home Page" });
  };
  
 
  const about = (req, res) => {
    res.json({ message: "About Us: This is a MERN Project" });
  };
  
 
  const contact = (req, res) => {
    res.json({ message: "Contact us at support@example.com" });
  };

  const courseCards = (req, res) => {
    courses.find({status:"published"}).then((courses) => {
      
        res.json({ message: "Course Cards will be displayed here",courses });
    }).catch((err) => {
        res.status(500).json({ message: "Error fetching courses", error: err.message });
    });
  };

  

  module.exports = { home, about, contact, courseCards };
