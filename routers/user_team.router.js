const router = require("express").Router();
const UserTeamController = require("../controller/user_team.controller");

router.post("/getUserTeams", UserTeamController.getUserTeams);
// router.post("/getUserTeams", UserTeamController.getUserTeams);

module.exports = router;
