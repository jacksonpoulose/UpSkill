const StudentProfile = require("../../models/studentProfile");
const User = require("../../models/userModel");
const Notification = require("../../models/notificationModel");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const studentRegistration = async (req, res) => {
  try {
    const {
      name,
      phone,
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
    const existingProfile = await StudentProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Student profile already submitted" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
    });

    const studentProfile = new StudentProfile({
      userId,
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

    const admins = await User.find({ role: "admin" });

    if (!admins || admins.length === 0) {
      return res.status(400).json({ message: "No admins found to notify" });
    }
    const notifications = admins.map((admin) => {
      return {
        userId: admin._id,
        userRole: "admin",
        message: `New student registration from ${name}`,
        type: "info",
      };
    });
    await Notification.insertMany(notifications);

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
  const userId = req.user?.id;
  const userRole = req.user?.role;
  const email = req.user?.email;

  if (!email) {
    return res.status(400).json({ message: "Email missing from request" });
  }

  if (userRole !== "student") {
    return res.status(403).json({ message: "Access denied. Only students can make payments." });
  }
  if (!userId) {
    return res.status(400).json({ message: "User ID missing from request" });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "Student Registration Fee",
      metadata: {
        userId,
        userRole,
        email,
      },
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { studentRegistration, getPayment, postPayment };
