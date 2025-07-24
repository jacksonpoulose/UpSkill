const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // mentor's userId
    weeklyProgress: [
      {
        week: Number,
        feedback: String,
        reviewedOn: Date,
      },
    ],
    learningGoals: { type: String, required: true },
    skillLevel: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
    resumeLink: String,
    githubLink: String,
    portfolioLink: String,
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianPhoneNumber: { type: String, required: true },
    guardianEmail: String,
    guardianRelationship: { type: String, required: true },
    paymentStatus: { type: String, enum: ["success", "pending", "failed"], default: "pending" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
