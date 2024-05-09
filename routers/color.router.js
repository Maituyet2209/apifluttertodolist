const router = require("express").Router();
const colorController = require("../controller/color.controller");

router.get("/colors", colorController.getColors);

module.exports = router;
