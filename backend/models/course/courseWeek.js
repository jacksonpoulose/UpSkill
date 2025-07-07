// models/CourseWeek.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const courseWeekSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    weekNumber: { type: Number, required: true },
    title: { type: String },
    objectives: [String],
    resources: [String],
    tasks: [taskSchema], // embedded tasks
    reviewNotes: String,
  },
  {
    timestamps: true,
  }
);

const CourseWeek = mongoose.model("CourseWeek", courseWeekSchema);
module.exports = { CourseWeek };
