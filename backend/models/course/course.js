const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Full Stack MERN Bootcamp"
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  durationWeeks: { type: Number, required: true }, // e.g., 20
  mentorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // mentors teaching the course
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startDate: { type: Date },
  endDate: { type: Date },
  courseFee: { type: Number, required: true }, 
  courseImage: { type: String }, 
  status: {
    type: String,
    enum: ["draft", "published", "removed"],
    default: "draft",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);


// ===========================================================================================



// const mongoose = require('mongoose');

// // Embedded schema for learning outcomes
// const learningOutcomeSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String }
// }, { _id: false });

// // Embedded schema for course features
// const featureSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   icon: { type: String }, // Lucide icon name
//   description: { type: String }
// }, { _id: false });

// // Embedded schema for instructor details
// const instructorSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   role: { 
//     type: String, 
//     enum: ['lead', 'assistant', 'guest'],
//     default: 'lead' 
//   },
//   bio: { type: String },
//   expertise: [String],
//   socialLinks: {
//     linkedin: String,
//     twitter: String,
//     github: String,
//     website: String
//   }
// }, { _id: false });

// // Embedded schema for pricing
// const pricingSchema = new mongoose.Schema({
//   originalPrice: { type: Number },
//   currentPrice: { type: Number, required: true },
//   currency: { type: String, default: 'INR' },
//   discountPercentage: { type: Number, default: 0 },
//   isFreeCourse: { type: Boolean, default: false },
//   discountValidUntil: { type: Date }
// }, { _id: false });

// // Embedded schema for enrollment tracking
// const enrollmentSchema = new mongoose.Schema({
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   enrollmentDate: { type: Date, default: Date.now },
//   progress: { type: Number, default: 0, min: 0, max: 100 },
//   completionDate: { type: Date },
//   certificateIssued: { type: Boolean, default: false },
//   certificateId: { type: String },
//   lastAccessedDate: { type: Date, default: Date.now },
//   status: {
//     type: String,
//     enum: ['active', 'completed', 'dropped', 'suspended'],
//     default: 'active'
//   }
// }, { _id: false });

// const courseSchema = new mongoose.Schema({
//   // Basic Information
//   title: { type: String, required: true, trim: true },
//   slug: { type: String, unique: true, lowercase: true },
//   description: { type: String, required: true },
//   shortDescription: { type: String, maxlength: 200 }, // For course cards
  
//   // Categorization
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
//   subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
//   tags: [{ type: String, lowercase: true }],
//   level: {
//     type: String,
//     enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
//     default: 'All Levels'
//   },
//   language: { type: String, default: 'English' },
  
//   // Duration & Scheduling
//   durationWeeks: { type: Number, required: true },
//   estimatedHours: { type: Number }, // Total course duration in hours
//   startDate: { type: Date },
//   endDate: { type: Date },
//   enrollmentDeadline: { type: Date },
  
//   // Instructors (Enhanced)
//   mentorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Keep for backward compatibility
//   instructors: [instructorSchema], // Enhanced instructor info
  
//   // Students & Enrollment
//   studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Keep for backward compatibility
//   enrollments: [enrollmentSchema], // Enhanced enrollment tracking
//   maxStudents: { type: Number }, // Enrollment limit
  
//   // Pricing (Enhanced)
//   courseFee: { type: Number, required: true }, // Keep for backward compatibility
//   pricing: pricingSchema,
  
//   // Media & Assets
//   courseImage: { type: String },
//   thumbnail: { type: String }, // Optimized thumbnail
//   promoVideo: { type: String }, // YouTube/Vimeo URL or file path
//   gallery: [{ type: String }], // Additional course images
  
//   // Course Content
//   learningOutcomes: [learningOutcomeSchema],
//   prerequisites: [{ type: String }],
//   targetAudience: [{ type: String }],
//   features: [featureSchema], // Course features like "Certificate", "Lifetime Access"
  
//   // Ratings & Reviews
//   rating: { type: Number, default: 0, min: 0, max: 5 },
//   totalReviews: { type: Number, default: 0 },
//   ratingDistribution: {
//     five: { type: Number, default: 0 },
//     four: { type: Number, default: 0 },
//     three: { type: Number, default: 0 },
//     two: { type: Number, default: 0 },
//     one: { type: Number, default: 0 }
//   },
  
//   // Course Status & Publishing
//   status: {
//     type: String,
//     enum: ["draft", "published", "archived", "removed"],
//     default: "draft",
//   },
//   isPublished: { type: Boolean, default: false },
//   publishedDate: { type: Date },
  
//   // SEO & Marketing
//   metaTitle: { type: String },
//   metaDescription: { type: String },
//   keywords: [{ type: String }],
  
//   // Analytics
//   totalViews: { type: Number, default: 0 },
//   totalEnrollments: { type: Number, default: 0 },
//   conversionRate: { type: Number, default: 0 }, // views to enrollments
  
//   // Certificates & Completion
//   certificateTemplate: { type: String }, // Template ID or path
//   completionCriteria: {
//     minimumProgress: { type: Number, default: 80 }, // Percentage
//     requiredAssignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
//     finalExam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
//     minimumScore: { type: Number, default: 70 }
//   },
  
//   // Course Settings
//   settings: {
//     allowDiscussions: { type: Boolean, default: true },
//     allowDownloads: { type: Boolean, default: true },
//     showProgress: { type: Boolean, default: true },
//     enableCertificates: { type: Boolean, default: true },
//     autoEnroll: { type: Boolean, default: false }
//   }
// }, {
//   timestamps: true
// });

// // Indexes for better performance
// courseSchema.index({ slug: 1 });
// courseSchema.index({ category: 1, status: 1 });
// courseSchema.index({ 'pricing.currentPrice': 1 });
// courseSchema.index({ rating: -1 });
// courseSchema.index({ totalEnrollments: -1 });
// courseSchema.index({ publishedDate: -1 });
// courseSchema.index({ tags: 1 });

// // Auto-generate slug from title
// courseSchema.pre('save', function(next) {
//   if (this.isModified('title') && !this.slug) {
//     this.slug = this.title
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '');
//   }
  
//   // Sync pricing for backward compatibility
//   if (this.pricing && this.pricing.currentPrice) {
//     this.courseFee = this.pricing.currentPrice;
//   }
  
//   // Update enrollment count
//   this.totalEnrollments = this.studentsEnrolled.length;
  
//   next();
// });

// // Virtual for formatted price
// courseSchema.virtual('formattedPrice').get(function() {
//   const price = this.pricing?.currentPrice || this.courseFee;
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: this.pricing?.currency || 'INR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(price);
// });

// // Virtual for duration text
// courseSchema.virtual('durationText').get(function() {
//   const weeks = this.durationWeeks;
//   if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''}`;
//   const months = Math.floor(weeks / 4);
//   const remainingWeeks = weeks % 4;
//   if (remainingWeeks === 0) return `${months} month${months > 1 ? 's' : ''}`;
//   return `${months}m ${remainingWeeks}w`;
// });

// // Virtual for enrollment status
// courseSchema.virtual('enrollmentStatus').get(function() {
//   if (this.maxStudents && this.studentsEnrolled.length >= this.maxStudents) {
//     return 'full';
//   }
//   if (this.enrollmentDeadline && new Date() > this.enrollmentDeadline) {
//     return 'closed';
//   }
//   return 'open';
// });

// module.exports = mongoose.model('Course', courseSchema);