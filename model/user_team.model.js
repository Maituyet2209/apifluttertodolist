const mongoose = require("mongoose");
const UserModel = require("./user.model");
const TeamModel = require("./team.model");
const { Schema } = mongoose;

const userTeamSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName,
    required: true,
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: TeamModel.modelName,
    required: true,
  },
});

const UserTeamModel = mongoose.model("UserTeam", userTeamSchema);

module.exports = UserTeamModel;
