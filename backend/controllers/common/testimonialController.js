const Testimonial = require("../../models/testimonial/testimonial");

/**
 * GET ACTIVE Testimonials (Frontend)
 * Shown on website
 */
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: "active" })
      .select(
        "name designation videoLink description profileImage priority createdAt"
      )
      .sort({ priority: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};
