const mongoose = require('mongoose');

// Sub-schema for each week's progress
const weekProgressSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  completedTaskTitles: [String], // Just the task titles or use task _ids if needed
  mentorFeedback: {
    type: String,
    default: '',
  },
  reviewed: {
    type: Boolean,
    default: false,
  }
}, { _id: false });

// Main StudentProgress schema
const studentProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  progress: [weekProgressSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('StudentProgress', studentProgressSchema);
