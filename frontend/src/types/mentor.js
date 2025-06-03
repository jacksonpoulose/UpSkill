// Define MentorProfile and RegistrationFormData structures in JS as JSDoc comments (optional but helpful)

/**
 * @typedef {Object} MentorProfile
 * @property {string} userId
 * @property {string[]} expertiseAreas
 * @property {string} bio
 * @property {string} linkedinProfile
 * @property {number} yearsOfExperience
 * @property {{ weeklyHours: number, preferredSlots: string[] }} availability
 * @property {string[]} certifications
 */

/**
 * @typedef {Object} RegistrationFormData
 * @property {string[]} expertiseAreas
 * @property {string} bio
 * @property {string} linkedinProfile
 * @property {number} yearsOfExperience
 * @property {number} weeklyHours
 * @property {string[]} preferredSlots
 * @property {string[]} certifications
 */

// Initial form data object
export const initialFormData = {
  expertiseAreas: [],
  bio: "",
  linkedinProfile: "",
  yearsOfExperience: 0,
  weeklyHours: 5,
  preferredSlots: [],
  certifications: []
};
