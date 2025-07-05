/**
 * @typedef {Object} CourseCategory
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {boolean} isActive
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category  // ObjectId reference
 * @property {number} durationWeeks
 * @property {string[]} mentorIds  // Array of User ObjectIds
 * @property {string[]} studentsEnrolled
 * @property {string} startDate
 * @property {string} endDate
 * @property {number} courseFee
 * @property {string} courseImage
 * @property {'draft' | 'published' | 'removed'} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Task
 * @property {string} [id]
 * @property {string} title
 * @property {string} description
 * @property {string[]} resources
 * @property {boolean} isMandatory
 */

/**
 * @typedef {Object} CourseWeek
 * @property {string} id
 * @property {string} course
 * @property {number} weekNumber
 * @property {string} title
 * @property {string[]} objectives
 * @property {Task[]} tasks
 * @property {string} reviewNotes
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/** @typedef {'categories' | 'courses' | 'syllabus'} ActiveTab */
