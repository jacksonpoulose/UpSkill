const Notification = require("../../models/notificationModel");
const MentorProfile = require("../../models/mentorProfile");
const User = require("../../models/userModel");

const mentorRegistration = async (req, res) => {
  try {
    const {
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

    const mentorProfile = new MentorProfile({
      userId, // <--- REQUIRED
      expertiseAreas,
      bio,
      linkedinProfile,
      yearsOfExperience,
      availability,
      certifications,
    });

    await mentorProfile.save();

    const admins = await User.find({ role: "admin" });

    const notifications = admins.map((admin) => ({
      userId: admin._id,
      userRole: "admin",
      message: `New mentor registration submitted with expertise areas: ${expertiseAreas.join(
        ", "
      )}`,
      type: "info",
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({ message: "Mentor request submitted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error in mentor registration" });
  }
};

module.exports = { mentorRegistration };
