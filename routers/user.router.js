const router = require("express").Router();
const UserController = require("../controller/user.controller");

router.post("/registration", UserController.register);
router.post("/updateProfileUser", UserController.updateProfile);
router.post("/login", UserController.login);
router.post("/profile", UserController.getProfile);

module.exports = router;
