const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      trim: true,
    },

    videoLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|instagram\.com)/.test(
            v
          );
        },
        message: "Only YouTube or Instagram links are allowed",
      },
    },

    description: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String, // Cloudinary / S3 / local URL
      required: true,
    },

    priority: {
      type: Number,
      default: 0, // Higher = shown first
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
