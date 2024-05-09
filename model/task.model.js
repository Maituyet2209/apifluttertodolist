const mongoose = require("mongoose");
const db = require("../config/db");
const UserModel = require("./user.model");
const ColorModel = require("./color.model");
const SubTaskModel = require("./sub_task.model");
const { Schema } = mongoose;

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  color: {
    type: Schema.Types.ObjectId,
    ref: ColorModel.modelName,
  },
  repeat: {
    type: String,
    enum: ["None", "Daily", "Weekly", "Monthly"],
    default: "none",
  },
  notify_time: {
    type: Date,
    default: null,
  },
  notify_day_of_week: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      null,
    ],
    default: null,
  },
  notify_day_of_month: {
    type: Number,
    min: 1,
    max: 31,
    default: null,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending",
  },
  subtasks: [
    {
      type: Schema.Types.ObjectId,
      ref: SubTaskModel.modelName,
    },
  ],
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName,
  },
});

const TaskModel = db.model("task", taskSchema);

module.exports = TaskModel;
