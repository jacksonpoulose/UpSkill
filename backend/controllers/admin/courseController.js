const Users = require("../../models/userModel");
const Courses = require("../../models/course/course");

const getCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json({ message: "welcome to Courses", courses });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};


const postAddCourse = async (req, res) => {
  try {
    const { title, description, category, durationWeeks, mentorIds, startDate, endDate, courseFee, courseImage   } = req.body;

    const course = await Courses.create({
      title,
      description,
      category,
      durationWeeks,
      mentorIds,
      courseFee,
      courseImage,
      startDate,
      endDate,
      studentsEnrolled: [], // initialize as empty array
    });

       

    res.status(201).json(course);
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Error creating course" });
  }
};

const getIndividualCourse = async (req, res) => {
  try {
    const { _id } = req.params;
    const course = await Courses.findById(_id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: `Welcome to Course ${_id}`, course });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const postEditCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, category, durationWeeks, mentorIds, startDate, endDate } = req.body;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Build update object dynamically
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (durationWeeks !== undefined) updates.durationWeeks = durationWeeks;
    if (mentorIds !== undefined) updates.mentorIds = mentorIds;
    if (startDate !== undefined) updates.startDate = startDate;
    if (endDate !== undefined) updates.endDate = endDate;

    const updatedCourse = await Courses.findByIdAndUpdate(courseId, updates, {
      new: true,
    });

    return res.status(200).json({ message: "Course updated", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postDeleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Courses.findByIdAndDelete(courseId);

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCourses,
  postAddCourse,
  getIndividualCourse,
  postEditCourse,
  postDeleteCourse,
};
