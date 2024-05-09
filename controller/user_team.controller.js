const UserTeamServices = require("../services/user_team.services");

exports.getUserTeams = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userTeams = await UserTeamServices.getUserTeams(userId);
    res.json({ status: true, success: userTeams });
  } catch (error) {
    next(error);
  }
};
