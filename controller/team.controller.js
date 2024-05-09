const TaskModel = require("../model/task.model");
const UserTeamModel = require("../model/user_team.model");
const TeamServices = require("../services/team.services");

exports.createTeam = async (req, res, next) => {
  try {
    const { name, description, owner } = req.body;

    if (!name || !owner) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, owner" });
    }

    const newTeam = await TeamServices.createTeam(name, description, owner);
    console.log(newTeam);

    res.status(201).json({ success: true, team: newTeam });
  } catch (error) {
    console.error("Error creating team:", error);

    let errorMessage = "An error occurred while creating the team.";

    res.status(error.status || 500).json({ error: errorMessage });
  }
};

exports.getTeamById = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const teamData = await TeamServices.getTeamById(teamId);
    res.json({ status: true, success: teamData });
  } catch (error) {
    next(error);
  }
};

exports.updateTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const updateData = req.body;
    const updatedTeam = await TeamServices.updateTeam(teamId, updateData);
    res.json({ status: true, success: updatedTeam });
  } catch (error) {
    next(error);
  }
};

exports.deleteTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const deletedData = await TeamServices.deleteTeam(teamId);
    res.json({ status: true, success: deletedData });
  } catch (error) {
    next(error);
  }
};

exports.addMemberToTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { memberId } = req.body;
    const updatedTeam = await TeamServices.addMemberToTeam(teamId, memberId);
    res.json({ status: true, success: updatedTeam });
  } catch (error) {
    next(error);
  }
};

exports.removeMemberFromTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { memberId } = req.body;
    const updatedTeam = await TeamServices.removeMemberFromTeam(
      teamId,
      memberId
    );
    res.json({ status: true, success: updatedTeam });
  } catch (error) {
    next(error);
  }
};

exports.createTaskInTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const taskData = req.body;

    const newTask = await TeamServices.createTaskInTeam(teamId, taskData);

    res.status(201).json({ status: true, success: newTask });
  } catch (error) {
    next(error);
  }
};

exports.getTeamMembers = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const members = await TeamServices.getTeamMembers(teamId);
    res.json({ status: true, success: members });
  } catch (error) {
    next(error);
  }
};

exports.getTeamTasks = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { status } = req.query;
    const tasks = await TeamServices.getTeamTasks(teamId, status);
    res.json({ status: true, success: tasks });
  } catch (error) {
    next(error);
  }
};

exports.getUserTeams = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userTeams = await TeamServices.getUserTeams(userId);
    res.json({ status: true, success: userTeams });
  } catch (error) {
    next(error);
  }
};
