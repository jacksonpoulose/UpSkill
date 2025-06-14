const Notification = require("../../models/notificationModel");
const MentorProfile = require("../../models/mentorProfile");
const StudentProfile = require("../../models/studentProfile");
const User = require("../../models/userModel");

const mentorRegistration = async (req, res) => {
  try {
    console.log("🔁 Incoming mentor registration request...");

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

    // Log extracted request body and user info
    console.log("📦 Request body:", req.body);
    console.log("👤 Authenticated user:", req.user);

    if (!userId) {
      console.warn("❌ Missing userId in request");
      return res.status(400).json({ message: "User ID missing from request" });
    }

    // Check for duplicate profile
    const existingProfile = await MentorProfile.findOne({ userId });
    if (existingProfile) {
      console.warn("⚠️ Mentor profile already exists for user:", userId);
      return res.status(400).json({ message: "Mentor profile already submitted" });
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

    console.log("🛠️ Saving mentor profile...");
    await mentorProfile.save();
    console.log("✅ Mentor profile saved");

    // Notify admins
    const admins = await User.find({ role: "admin" });

    if (!admins.length) {
      console.warn("⚠️ No admins found to notify");
    }

    const notifications = admins.map((admin) => ({
      userId: admin._id,
      userRole: "admin",
      message: `New mentor registration submitted with expertise areas: ${
        Array.isArray(expertiseAreas) ? expertiseAreas.join(", ") : "N/A"
      }`,
      type: "info",
    }));

    console.log("🔔 Sending notifications to admins...");
    await Notification.insertMany(notifications);
    console.log("✅ Notifications sent");

    res.status(201).json({ message: "Mentor request submitted." });
  } catch (err) {
    console.error("❌ Error in mentorRegistration:");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({
      message: "Server error in mentor registration",
      error: err.message,
    });
  }
};

const studentRegistration = async (req, res) => {
  try {
    const {
      phoneNumber,
      address,
      city,
      state,
      country,
      zipCode,
      course,
      learningGoals,
      skillLevel,
      resumeLink,
      githubLink,
      portfolioLink,
      guardianName,
      guardianPhoneNumber,
      guardianEmail,
      guardianRelationship,
    } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing from request" });
    }

    const studentProfile = new StudentProfile({
      userId,
      phoneNumber,
      address,
      city,
      state,
      country,
      zipCode,
      course,
      learningGoals,
      skillLevel,
      resumeLink,
      githubLink,
      portfolioLink,
      guardianName,
      guardianPhoneNumber,
      guardianEmail,
      guardianRelationship,
    });

    await studentProfile.save();

    res.status(201).redirect("http://localhost:3000/api/v1/user/payment");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error in student registration" });
  }
};

const getPayment = async (req, res) => {
  try {
    res.status(200).json({ message: "Payment page" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error in getPayment" });
  }
};
const postPayment = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({ clientSecret: process.env.STRIPE_SECRET_KEY });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
module.exports = { mentorRegistration, studentRegistration, postPayment, getPayment };
