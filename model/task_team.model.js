const mongoose = require("mongoose");
const TaskModel = require("./task.model");
const TeamModel = require("./team.model");
const { Schema } = mongoose;

const userTeamSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: TaskModel.modelName,
    required: true,
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: TeamModel.modelName,
    required: true,
  },
});

const TaskTeamModel = mongoose.model("TaskTeam", taskTeamSchema);

module.exports = TaskTeamModel;
