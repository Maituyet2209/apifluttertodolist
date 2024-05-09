const ColorModel = require("../model/color.model");

exports.getColors = async (req, res) => {
  try {
    const colors = await ColorModel.find();
    res.json(colors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
