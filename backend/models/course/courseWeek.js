// models/CourseWeek.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  resources: [String], // Links or references
  isMandatory: { type: Boolean, default: true },
});

const courseWeekSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  weekNumber: { type: Number, required: true },
  title: { type: String },
  objectives: [String],
  tasks: [taskSchema], // embedded tasks
  reviewNotes: String
}, {
  timestamps: true
});


const CourseWeek = mongoose.model('CourseWeek', courseWeekSchema);
const Task = mongoose.model('Task', taskSchema);
module.exports = {
  CourseWeek,
  Task
};
