const mongoose = require("mongoose");
const db = require("../config/db");
const TaskModel = require("./task.model");
const { Schema } = mongoose;
const subtaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const SubTaskModel = db.model("subtask", subtaskSchema);

module.exports = SubTaskModel;
