const StudentProfile = require("../../models/studentProfile");
const User = require("../../models/userModel");
const Notification = require("../../models/notificationModel");
const Stripe = require("stripe");
const Course = require("../../models/course/course"); // Import Course model

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const studentRegistration = async (req, res) => {
  try {
    const {
      name,
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
    const existingProfile = await StudentProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Student profile already submitted" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      phone: phoneNumber, 
      address,
      city,
      state,
      country,
      zipCode,
    });

    const studentProfile = new StudentProfile({
      userId,
      enrolledCourses: [course],
      phoneNumber,     // ✅ now correctly mapped
      address,
      city,
      state,
      country,
      zipCode,
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

    res.status(201).json({ message: "Student registered. Proceed to payment." });
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
  const { courseId } = req.body;
  const userId = req.user?.id;
  const email = req.user?.email;
  const userRole = req.user?.role;

  // 🐛 Debug: Log the received courseId
  console.log("Received courseId:", courseId, "Type:", typeof courseId, "Length:", courseId?.length);
  console.log("Full request body:", req.body);

  if (!email || !userId) {
    return res.status(400).json({ message: "Missing user credentials" });
  }

  if (userRole !== "guest") {
    return res.status(403).json({ message: "Access denied. Only guests can make payments." });
  }

  // ✅ Enhanced validation for courseId
  if (!courseId || typeof courseId !== 'string' || courseId.trim() === "") {
    return res.status(400).json({ 
      message: "Course ID is required and must be a valid string",
      received: courseId,
      type: typeof courseId
    });
  }

  // ✅ Validate ObjectId format
  const mongoose = require('mongoose');
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ 
      message: "Invalid course ID format. Must be a valid MongoDB ObjectId",
      received: courseId,
      expectedFormat: "24-character hex string"
    });
  }

  try {
    // 🔍 Fetch the course and its fee
    const course = await Course.findById(courseId);
    if (!course || !course.courseFee) {
      return res.status(404).json({ message: "Course not found or fee missing" });
    }

    const amountInPaise = course.courseFee * 100; // INR to paise

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",  // ✅ Set currency to INR
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: amountInPaise,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        email,
        courseId,
      },
      customer_email: email,
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/failure`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: error.message || "Payment failed" });
  }
};

// const postPayment = async (req, res) => {
//   const { courseId } = req.body;
//   const userId = req.user?.id;
//   const email = req.user?.email;
//   const userRole = req.user?.role;

//   if (!email || !userId) {
//     return res.status(400).json({ message: "Missing user credentials" });
//   }

//   if (userRole !== "guest") {
//     return res.status(403).json({ message: "Access denied. Only guests can make payments." });
//   }

//   try {
//     // 🔍 Fetch the course and its fee
//     const course = await Course.findById(courseId);
//     if (!course || !course.courseFee) {
//       return res.status(404).json({ message: "Course not found or fee missing" });
//     }
//     console.log(course);


//     const amountInPaise = course.courseFee * 100; // INR to paise

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",  // ✅ Set currency to INR
//             product_data: {
//               name: course.title,
//               description: course.description,
//             },
//             unit_amount: amountInPaise,
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         userId,
//         email,
//         courseId,
//       },
//       customer_email: email,
//       success_url: `${process.env.CLIENT_URL}/payment/success`,
//       cancel_url: `${process.env.CLIENT_URL}/payment/failure`,
//     });

//     res.send({ url: session.url });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     res.status(500).json({ message: error.message || "Payment failed" });
//   }
// };


module.exports = { studentRegistration, getPayment, postPayment };
