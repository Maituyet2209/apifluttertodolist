const router = require("express").Router();
const TeamController = require("../controller/team.controller");

router.post("/createTeam", TeamController.createTeam);
router.post("/getTeamById", TeamController.getTeamById);
router.post("/updateTeam", TeamController.updateTeam);
router.post("/deleteTeam", TeamController.deleteTeam);
router.post("/addMemberToTeam", TeamController.addMemberToTeam);
router.post("/removeMemberFromTeam", TeamController.removeMemberFromTeam);
router.post("/createTaskInTeam", TeamController.createTaskInTeam);
router.post("/getTeamMembers", TeamController.getTeamMembers);
router.post("/getTeamTasks", TeamController.getTeamTasks);

module.exports = router;
