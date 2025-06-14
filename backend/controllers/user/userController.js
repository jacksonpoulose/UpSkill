const Notification = require("../../models/notificationModel");
const MentorProfile = require("../../models/mentorProfile");
const StudentProfile = require("../../models/studentProfile");
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
      currency: 'usd',
    });

    res.send({ clientSecret: process.env.STRIPE_SECRET_KEY });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
module.exports = { mentorRegistration, studentRegistration, postPayment, getPayment };
