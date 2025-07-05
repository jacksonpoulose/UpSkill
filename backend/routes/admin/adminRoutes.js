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
  updateCourseStatus
} = require("../../controllers/admin/courseController");
const {
  postAddCategory,
  postEditCategory,
  postDeleteCategory,
  toggleCategoryStatus,
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
router.patch("/category/:id/toggle", toggleCategoryStatus);


router.post("/courses/add", upload.single("courseImage"), postAddCourse);
router.put("/courses/:id/edit", upload.single("courseImage"), postEditCourse);
router.put("/courses/:id/status", updateCourseStatus);
router.put("/courses/:id/publish", postPublishCourse);

router.get("/courses/:id", getIndividualCourse);

router.post("/students/:id", getIndividualStudent);
router.post("/mentors/:id", getIndividualMentor);

router.get("/notifications", getNotifications);
router.post("/notifications/add", postNotification);
// router.get('/unread-count', getUnreadCount);


module.exports = router;
