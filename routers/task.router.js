const router = require("express").Router();
const TaskController = require("../controller/task.controller");

router.post("/createTask", TaskController.createTask);
router.post("/getUserTodayTasks", TaskController.getUserTodayTasks);
router.post("/getUserUpcomingTasks", TaskController.getUserUpcomingTasks);
router.post("/getUserTasksByDate", TaskController.getUserTasksByDate);
router.post("/deleteTask", TaskController.deleteTask);
router.post("/updateTaskStatusPending", TaskController.updateTaskStatusPending);
router.post(
  "/updateTaskStatusToInProgress",
  TaskController.updateTaskStatusToInProgress
);
router.post(
  "/updateTaskStatusToCompleted",
  TaskController.updateTaskStatusToCompleted
);
router.post("/getTaskStatus", TaskController.getTaskStatus);
router.post("/getTaskDetails", TaskController.getTaskDetails);
router.post("/updateTask", TaskController.updateTask);

module.exports = router;
