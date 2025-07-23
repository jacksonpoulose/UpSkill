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
  const getCourseById = async (req, res) => {
    try {
      const courseId = req.params.id;
      const course = await courses.findById(courseId)
        .populate('category', 'name') // optional
        .populate('mentorIds', 'name email'); // optional
  
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      res.status(200).json({ course });
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  

  module.exports = { home, about, contact, courseCards,getCourseById };
