// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Full Stack MERN Bootcamp"
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  durationWeeks: { type: Number, required: true }, // e.g., 20
  mentorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // mentors teaching the course
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startDate: { type: Date },
  endDate: { type: Date },
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
