
const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  expertiseAreas: [String],
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // student userIds
  bio: String,
  linkedinProfile: String,
  yearsOfExperience: Number,
  availability: {
    weeklyHours: Number,
    preferredSlots: [String]
  },
  certifications: [String],
  currentRole: String,
  company: String,
  languagesSpoken: [String],
  whyMentor: String,
  rating: { type: Number, default: 0 },
}, {
  timestamps: true,
});

module.exports = mongoose.model('MentorProfile', mentorProfileSchema);
