const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/multer");
const { getDashboard } = require("../../controllers/admin/adminController");
const {
  getCourses,
  postAddCourse,
  getIndividualCourse,
  postEditCourse,
  postDeleteCourse,
  postPublishCourse,
} = require("../../controllers/admin/courseController");
const {
  postAddCategory,
  postEditCategory,
  postDeleteCategory,
  getCategories,
} = require("../../controllers/admin/categoryController");

const { getNotifications, postNotification } = require("../../controllers/admin/notifications");

const { getMentors, getIndividualMentor } = require("../../controllers/admin/mentorController");
const { getStudents, getIndividualStudent } = require("../../controllers/admin/studentController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");
const {
  getUsers,
  getIndividualUser,
  postBlockUnblockUser,
} = require("../../controllers/admin/userController");
const { getTask, 
  createCourseWeekWithTasks, 
  postEditTask, 
  postDeleteTask, 
  getIndividualTask } = require("../../controllers/admin/taskController");

router.use(verifyToken, checkRole(["admin"]));

router.get("/dashboard", getDashboard);
router.get("/courses", getCourses);
router.get("/students", getStudents);
router.get("/mentors", getMentors);
router.get("/users", getUsers);
router.get("/users/:id", getIndividualUser);
router.put("/users/:id/block", postBlockUnblockUser);

router.get("/category", getCategories);
router.post("/category/add", postAddCategory);
router.put("/category/:id/edit", postEditCategory);
router.delete("/category/:id", postDeleteCategory);

router.post("/courses/add", upload.single("courseImage"), postAddCourse);
router.put("/courses/:id/edit", upload.single("courseImage"), postEditCourse);
router.delete("/courses/:id", postDeleteCourse);
router.put("/courses/:id/publish", postPublishCourse);

router.get("/courses/:id", getIndividualCourse);

router.post("/students/:id", getIndividualStudent);
router.post("/mentors/:id", getIndividualMentor);

router.get("/notifications", getNotifications);
router.post("/notifications/add", postNotification);
// router.get('/unread-count', getUnreadCount);

router.get("/task", getTask);
router.post("/task/add", createCourseWeekWithTasks);
router.put("/task/:id/edit", postEditTask);
router.delete("/task/:id", postDeleteTask);
router.get("/task/:id", getIndividualTask);

module.exports = router;
