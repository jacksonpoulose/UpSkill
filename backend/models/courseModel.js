const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type:String},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseCategory' },
    price: { type: Number, default: 0 },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reviews: [
        {
            _id: false,
            review: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
                required: true,
            },
        },
    ],
rating: {
        type: Number,
    },
  }, {
    timestamps: true 
  });
  
  module.exports = mongoose.model('Courses', courseSchema);