
const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // mentor's userId
  weeklyProgress: [{
    week: Number,
    feedback: String,
    reviewedOn: Date
  }],
  learningGoals: String,
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  resumeLink: String,
  githubLink: String,
  portfolioLink: String
}, {
  timestamps: true
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
