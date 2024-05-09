const TaskModel = require("../model/task.model");

class TaskServices {
  static async createTask(
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
  ) {
    try {
      // Validate required fields
      const requiredFields = { userId, title, date, start_time, end_time };
      const missingFields = Object.keys(requiredFields).filter(
        (field) => !requiredFields[field]
      );
      if (missingFields.length > 0) {
        throw new Error(
          `Required fields are missing: ${missingFields.join(", ")}`
        );
      }

      const createTask = new TaskModel({
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
      });
      return await createTask.save();
    } catch (error) {
      console.error("Error creating task:", error.message);
      throw error;
    }
  }

  static async getUserTodayTasks(userId) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const taskList = await TaskModel.find({
        userId,
        date: { $gte: today, $lt: tomorrow },
      }).populate("color");
      return taskList;
    } catch (error) {
      throw error;
    }
  }

  static async getUserUpcomingTasks(userId) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const upcomingTasks = await TaskModel.find({
        userId,
        date: { $gte: tomorrow },
      }).populate("color");
      return upcomingTasks;
    } catch (error) {
      throw error;
    }
  }

  static async getUserTasksByDate(userId, date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const tasks = await TaskModel.find({
        userId,
        date: { $gte: startOfDay, $lte: endOfDay },
      }).populate("color");

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  static async updateTaskStatusPending(id) {
    try {
      const task = await TaskModel.findById(id);
      if (!task) {
        throw new Error("Task not found.");
      }
      task.status = "pending";
      await task.save();
      return task;
    } catch (error) {
      console.error("Error updating task status to pending:", error.message);
      throw error;
    }
  }

  static async updateTaskStatusToInProgress(id) {
    try {
      const task = await TaskModel.findById(id);
      if (!task) {
        throw new Error("Task not found.");
      }
      task.status = "in_progress";
      await task.save();
      return task;
    } catch (error) {
      console.error(
        "Error updating task status to in_progress:",
        error.message
      );
      throw error;
    }
  }

  static async updateTaskStatusToCompleted(id) {
    try {
      const task = await TaskModel.findById(id);
      if (!task) {
        throw new Error("Task not found.");
      }
      task.status = "completed";
      await task.save();
      return task;
    } catch (error) {
      console.error("Error updating task status to completed:", error.message);
      throw error;
    }
  }

  static async getTaskStatus(id) {
    try {
      const task = await TaskModel.findById(id);
      if (!task) {
        throw new Error("Task not found.");
      }
      return task.status;
    } catch (error) {
      console.error("Error getting task status:", error.message);
      throw error;
    }
  }

  static async getTaskDetails(id) {
    try {
      const task = await TaskModel.findById(id).populate("color");
      if (!task) {
        throw new Error("Task not found.");
      }
      return task;
    } catch (error) {
      console.error("Error getting task details:", error.message);
      throw error;
    }
  }

  static async updateTask(id, updatedTask) {
    try {
      const task = await TaskModel.findByIdAndUpdate(id, updatedTask, {
        new: true,
      });
      if (!task) {
        throw new Error("Task not found.");
      }
      return task;
    } catch (error) {
      console.error("Error updating task:", error.message);
      throw error;
    }
  }

  static async deleteTask(id) {
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(id);
      if (!deletedTask) {
        throw new Error("Task not found.");
      }
      return deletedTask;
    } catch (error) {
      console.error("Error deleting task:", error.message);
      throw error;
    }
  }
}
module.exports = TaskServices;
