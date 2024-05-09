const UserTeamModel = require("../model/user_team.model");
const TeamModel = require("../model/team.model");

class UserTeamServices {
  static async getUserTeams(userId) {
    try {
      const userTeams = await UserTeamModel.find({ userId });
      const teamIds = userTeams.map((userTeam) => userTeam.teamId);
      const teams = await TeamModel.find({ _id: { $in: teamIds } });
      return teams;
    } catch (error) {
      throw error;
    }
  }

  static async addMemberToTeam(userId, teamId) {
    try {
      // const user = await UserModel.findOne({ email });

      // if (!user) {
      //   throw new Error("User not found");
      // }

      const newUserTeam = new UserTeamModel({
        userId: userId,
        teamId: teamId,
      });

      // Lưu bản ghi vào cơ sở dữ liệu
      const result = await newUserTeam.save();

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserTeamServices;
