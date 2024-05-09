const mongoose = require("mongoose");
const db = require("../config/db");
const UserModel = require("./user.model");
const TaskModel = require("./task.model");
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName,
    required: true,
  },
  // members: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: UserModel.modelName,
  //   },
  // ],
  tasks: {
    type: Schema.Types.ObjectId,
    ref: TaskModel.modelName,
  },
});

const TeamModel = db.model("team", teamSchema);

module.exports = TeamModel;
