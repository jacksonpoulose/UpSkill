const Users = require("../../models/userModel");
const Courses = require("../../models/course/course");
const Category=require("../../models/course/category")
const fs = require("fs");
const path = require("path");
const getCourses = async (req, res) => {
  try {
    const courses = await Courses.find().populate("category", "name");
    res.status(200).json({ message: "welcome to Courses", courses });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};

const postAddCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      durationWeeks,
      mentorIds,
      startDate,
      endDate,
      courseFee,
    } = req.body;

    const courseImage = req.file ? req.file.filename : null;


    const course = await Courses.create({
      title,
      description,
      category,
      durationWeeks,

      mentorIds: mentorIds ? JSON.parse(mentorIds) : [],

      startDate,
      endDate,
      courseFee,
      courseImage,
      studentsEnrolled: [],
    });

    res.status(201).json(course);
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Error creating course" });
  }
};


const getIndividualCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Courses.findById(id).populate("category");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: `Welcome to Course ${id}`, course });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const postPublishCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Courses.findByIdAndUpdate(courseId, { status: "published" });
    res.status(200).json({ message: "Course published", course });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const postEditCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const {
      title,
      description,
      category,
      durationWeeks,
      mentorIds,
      startDate,
      endDate,
      existingImage,
      imageRemoved,
      status,
    } = req.body;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (durationWeeks !== undefined) updates.durationWeeks = durationWeeks;
    if (mentorIds !== undefined) updates.mentorIds = mentorIds;
    if (startDate !== undefined) updates.startDate = startDate;
    if (endDate !== undefined) updates.endDate = endDate;

    
    if (req.file) {
      // Optionally delete the old image
      if (course.courseImage) {
        const oldPath = path.join(__dirname, "../../uploads/courses", course.courseImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updates.courseImage = req.file.filename;
    } 
    
    else if (imageRemoved === "true") {
      if (course.courseImage) {
        const oldPath = path.join(__dirname, "../../uploads/courses", course.courseImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updates.courseImage = null;
    } 
   
    else if (existingImage) {
      updates.courseImage = existingImage;
    }

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

    await Courses.findByIdAndUpdate(courseId, { status: "removed" });

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
  postPublishCourse,
};
