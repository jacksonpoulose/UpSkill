const Notification = require("../../models/notificationModel");
const MentorProfile = require("../../models/mentorProfile");
const StudentProfile = require("../../models/studentProfile");
const User = require("../../models/userModel");

const mentorRegistration = async (req, res) => {
  try {
    
    const {
      name,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
      expertiseAreas,
      bio,
      linkedinProfile,
      yearsOfExperience,
      availability,
      certifications,
    } = req.body;

    const userId = req.user?.id;
    const userRole = req.user?.role;

   
    if (!userId) {
  
      return res.status(400).json({ message: "User ID missing from request" });
    }

    // Check for duplicate profile
    const existingProfile = await MentorProfile.findOne({ userId });
    if (existingProfile) {
      
      return res.status(400).json({ message: "Mentor profile already submitted" });
    }

    if (!name || !phone || !address || !city || !state || !country || !zipCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { name, 
      phone, 
      address, 
      city, 
      state, 
      country, 
      zipCode });

    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create mentor profile
    const mentorProfile = new MentorProfile({
      userId,
      expertiseAreas,
      bio,
      linkedinProfile,
      yearsOfExperience,
      availability,
      certifications,
    });

    
    await mentorProfile.save();
   

    // Notify admins
    const admins = await User.find({ role: "admin" });

    if (!admins.length) {
      console.warn("⚠️ No admins found to notify");
    }

    const notifications = admins.map((admin) => ({
      userId: admin._id,
      userRole: "admin",

     
      message: `New mentor registration submitted with expertise areas: ${Array.isArray(expertiseAreas) ? expertiseAreas.join(", ") : "N/A"}`,

      type: "info",
    }));

    
    await Notification.insertMany(notifications);
    

    res.status(201).json({ message: "Mentor request submitted." });

  } catch (err) {
    res.status(500).json({
      message: "Server error in mentor registration",
      error: err.message,
    });
  }
};

module.exports = { mentorRegistration };