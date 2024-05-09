const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const colorSchema = new Schema({
  color: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
});

const ColorModel = db.model("color", colorSchema);

module.exports = ColorModel;
