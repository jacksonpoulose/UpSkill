
const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  permissions: [String],
  department: String
}, {
  timestamps: true
});

module.exports = mongoose.model('AdminProfile', adminProfileSchema);
