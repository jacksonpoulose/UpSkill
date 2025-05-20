// models/SubCategory.js
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "MERN", "MEAN"
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
