const mongoose = require("mongoose");
const db = require("../config/db");
const UserModel = require("./user.model");

const { Schema } = mongoose;

const friendshipSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName,
  },
});
