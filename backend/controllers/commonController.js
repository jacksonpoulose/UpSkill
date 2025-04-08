
const home = (req, res) => {
    res.json({ message: "Welcome to the Home Page" });
  };
  
 
  const about = (req, res) => {
    res.json({ message: "About Us: This is a MERN Project" });
  };
  
 
  const contact = (req, res) => {
    res.json({ message: "Contact us at support@example.com" });
  };
  
  module.exports = { home, about, contact };
  