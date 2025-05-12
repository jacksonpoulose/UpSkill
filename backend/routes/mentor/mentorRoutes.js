const express = require("express");
const router = express.Router();
const { getDashboard } = require("../../controllers/mentor/mentorController");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");
const {
  getCoursesList,
  getStudentsList,
  getIndividualCourse,

  // getIndividualStudent,
  // postAddTask,
  // postEditTask,
  // postDeleteTask,
  // getIndividualTask,

  // getIndividualStudent,

} = require("../../controllers/mentor/mentorController");

router.get("/dashboard", verifyToken, checkRole(["mentor"]), getDashboard);
router.get(
  "/courses/:_id",
  verifyToken,
  checkRole(["mentor"]),
  getIndividualCourse
);
router.get("/courses", verifyToken, checkRole(["mentor"]), getCoursesList);
router.get("/students", verifyToken, checkRole(["mentor"]), getStudentsList);
router.get(
  "/students/:_id",
  verifyToken,
  checkRole(["mentor"]),
  // getIndividualStudent
);
// router.post(
//   "/students/:_id/addTask",
//   verifyToken,
//   checkRole(["mentor"]),
//   postAddTask
// );
// router.post(
//   "/students/:_id/editTask",
//   verifyToken,
//   checkRole(["mentor"]),
//   postEditTask
// );
// router.post(
//   "/students/:_id/deleteTask",
//   verifyToken,
//   checkRole(["mentor"]),
//   postDeleteTask
// );
// router.get(
//   "/students/:_id/getTask",
//   verifyToken,
//   checkRole(["mentor"]),
//   getIndividualTask
// );

// router.get(
//   "/students/:_id",
//   verifyToken,
//   checkRole(["mentor"]),
//   getIndividualStudent
// );


module.exports = router;
