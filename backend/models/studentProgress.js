const mongoose = require('mongoose');


const weekProgressSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  completedTaskTitles: [String],
  mentorFeedback: {
    type: String,
    default: '',
  },
  pendingTasks: {
    type: [String],
    default: [],
  },
  
  reviewed: {
    type: Boolean,
    default: false,
  }
}, { _id: false });


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
