const TaskServices = require("../services/task.services");

exports.createTask = async (req, res, next) => {
  try {
    const {
      userId,
      title,
      note,
      date,
      start_time,
      end_time,
      repeat,
      notify_time,
      notify_day_of_week,
      notify_day_of_month,
      color,
    } = req.body;

    const taskData = await TaskServices.createTask(
      userId,
      title,
      note,
      date,
      start_time,
      end_time,
      repeat,
      notify_time,
      notify_day_of_week,
      notify_day_of_month,
      color
    );

    res.status(201).json({ status: true, success: taskData });
  } catch (error) {
    next(error);
  }
};

exports.getUserTodayTasks = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const taskData = await TaskServices.getUserTodayTasks(userId);
    res.json({ status: true, success: taskData });
  } catch (error) {
    next(error);
  }
};

exports.getUserUpcomingTasks = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const taskData = await TaskServices.getUserUpcomingTasks(userId);
    res.json({ status: true, success: taskData });
  } catch (error) {
    next(error);
  }
};

exports.getUserTasksByDate = async (req, res, next) => {
  try {
    const { userId, date } = req.body;
    const taskData = await TaskServices.getUserTasksByDate(userId, date);
    res.json({ status: true, success: taskData });
  } catch (error) {
    next(error);
  }
};

exports.updateTaskStatusPending = async (req, res, next) => {
  try {
    const { id } = req.body;
    const updatedTask = await TaskServices.updateTaskStatusPending(id);
    res.json({ status: true, success: updatedTask });
  } catch (error) {
    next(error);
  }
};

exports.updateTaskStatusToInProgress = async (req, res, next) => {
  try {
    const { id } = req.body;
    const updatedTask = await TaskServices.updateTaskStatusToInProgress(id);
    res.json({ status: true, success: updatedTask });
  } catch (error) {
    next(error);
  }
};

exports.updateTaskStatusToCompleted = async (req, res, next) => {
  try {
    const { id } = req.body;
    const updatedTask = await TaskServices.updateTaskStatusToCompleted(id);
    res.json({ status: true, success: updatedTask });
  } catch (error) {
    next(error);
  }
};

exports.getTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.body;
    const status = await TaskServices.getTaskStatus(id);
    res.json({ status: true, success: status });
  } catch (error) {
    next(error);
  }
};

exports.getTaskDetails = async (req, res, next) => {
  try {
    const { id } = req.body;
    const taskData = await TaskServices.getTaskDetails(id);
    res.json({ status: true, success: taskData });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.body;
    const updateData = req.body;
    const updatedTask = await TaskServices.updateTask(id, updateData);
    res.json({ status: true, success: updatedTask });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.body;
    const deletedData = await TaskServices.deleteTask(id);
    res.json({ status: true, success: deletedData });
  } catch (error) {
    next(error);
  }
};
