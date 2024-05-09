const TeamModel = require("../model/team.model");
const UserModel = require("../model/user.model");
const UserTeamModel = require("../model/user_team.model");
const mongoose = require("mongoose");

class TeamServices {
  static async createTeam(name, description, owner) {
    try {
      if (!name || !owner) {
        throw new Error("Missing required fields: name, owner");
      }

      // Create new team promise
      const newTeamPromise = TeamModel.create({ name, description, owner });

      // Create UserTeam creation function (optional)
      const createUserTeam = async (teamId) => {
        return UserTeamModel.create({
          userId: owner,
          teamId: teamId,
        });
      };
      const newTeam = await newTeamPromise;
      console.log("New team created:", newTeam);
      console.log("Owner:", owner);
      console.log("Team Id:", newTeam._id.toString());
      await createUserTeam(newTeam._id.toString());

      console.log("New team created:", newTeamPromise);
      console.log("Owner:", owner);

      return newTeamPromise;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  }

  // static async createTeam(name, description, owner) {
  //   try {
  //     if (!name || !owner) {
  //       throw new Error("Missing required fields: name, owner");
  //     }
  //     try {
  //       const newTeam = await TeamModel.create({ name, description, owner });
  //       console.log("newTeam:", newTeam);
  //       // Create UserTeam
  //       await UserTeamModel.create({ userId: owner, teamId: newTeam._id });

  //       console.log("New team created:", newTeam); // Log the created team
  //       return newTeam;
  //     } catch (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     console.error("Error creating team:", error);
  //   }
  // }

  static async getTeamById(teamId) {
    try {
      const team = await TeamModel.findById(teamId)
        .populate("owner")
        .populate("members")
        .populate("tasks");
      if (!team) {
        throw new Error("Team not found.");
      }
      return team;
    } catch (error) {
      console.error("Error getting team by ID:", error.message);
      throw error;
    }
  }

  static async updateTeam(teamId, updatedTeam) {
    try {
      const team = await TeamModel.findByIdAndUpdate(teamId, updatedTeam, {
        new: true,
      })
        .populate("owner")
        .populate("members")
        .populate("tasks");
      if (!team) {
        throw new Error("Team not found.");
      }
      return team;
    } catch (error) {
      console.error("Error updating team:", error.message);
      throw error;
    }
  }

  static async deleteTeam(teamId) {
    try {
      const deletedTeam = await TeamModel.findByIdAndDelete(teamId)
        .populate("owner")
        .populate("members")
        .populate("tasks");
      if (!deletedTeam) {
        throw new Error("Team not found.");
      }
      return deletedTeam;
    } catch (error) {
      console.error("Error deleting team:", error.message);
      throw error;
    }
  }

  static async addMemberToTeam(teamId, memberId) {
    try {
      const team = await TeamModel.findById(teamId);
      if (!team) {
        throw new Error("Team not found.");
      }
      team.members.push(memberId);
      await team.save();
      return team;
    } catch (error) {
      console.error("Error adding member to team:", error.message);
      throw error;
    }
  }

  static async removeMemberFromTeam(teamId, memberId) {
    try {
      const team = await TeamModel.findById(teamId);
      if (!team) {
        throw new Error("Team not found.");
      }
      const index = team.members.indexOf(memberId);
      if (index > -1) {
        team.members.splice(index, 1);
        await team.save();
      }
      return team;
    } catch (error) {
      console.error("Error removing member from team:", error.message);
      throw error;
    }
  }

  static async createTaskInTeam(teamId, taskData) {
    try {
      const team = await TeamModel.findById(teamId);
      if (!team) {
        throw new Error("Team not found.");
      }

      // Thêm teamId vào dữ liệu task trước khi tạo
      taskData.teamId = teamId;

      const newTask = new TaskModel(taskData);
      await newTask.save();

      // Sau khi tạo task, thêm task mới vào danh sách tasks của đội
      team.tasks.push(newTask._id);
      await team.save();

      return newTask;
    } catch (error) {
      console.error("Error creating task in team:", error.message);
      throw error;
    }
  }

  static async getTeamMembers(teamId) {
    try {
      const team = await TeamModel.findById(teamId).populate("members");
      if (!team) {
        throw new Error("Team not found.");
      }
      return team.members;
    } catch (error) {
      console.error("Error getting team members:", error.message);
      throw error;
    }
  }

  static async getTeamTasks(teamId, status) {
    try {
      const team = await TeamModel.findById(teamId).populate({
        path: "tasks",
        match: { status: status }, // Lọc task theo trạng thái
      });
      if (!team) {
        throw new Error("Team not found.");
      }
      return team.tasks;
    } catch (error) {
      console.error("Error getting team tasks:", error.message);
      throw error;
    }
  }

  static async getUserTeams(userId) {
    try {
      // Tìm user dựa trên userId
      const user = await UserModel.findById(userId);

      // Nếu không tìm thấy user, ném lỗi
      if (!user) {
        throw new Error("User not found");
      }

      // Tìm tất cả các team mà userId xuất hiện trong trường 'members'
      const teams = await TeamModel.find({ members: userId });

      return teams;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TeamServices;
