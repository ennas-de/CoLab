// backend/controllers/team.controller.js

const Team = require("../models/team.model.js");

// Create a new team
const createTeam = async (name, description) => {
  try {
    const team = new Team({ name, description });
    const savedTeam = await team.save();
    return savedTeam;
  } catch (error) {
    throw new Error("Failed to create a new team.");
  }
};

// Get all teams
const getAllTeams = async () => {
  try {
    const teams = await Team.find();
    return teams;
  } catch (error) {
    throw new Error("Failed to get teams.");
  }
};

// Get a single team by ID
const getTeamById = async (id) => {
  try {
    const team = await Team.findById(id);
    if (!team) {
      throw new Error("Team not found.");
    }
    return team;
  } catch (error) {
    throw new Error("Failed to get the team.");
  }
};

// Update a team by ID
const updateTeamById = async (id, name, description) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedTeam) {
      throw new Error("Team not found.");
    }
    return updatedTeam;
  } catch (error) {
    throw new Error("Failed to update the team.");
  }
};

// Delete a team by ID
const deleteTeamById = async (id) => {
  try {
    const deletedTeam = await Team.findByIdAndRemove(id);
    if (!deletedTeam) {
      throw new Error("Team not found.");
    }
    return deletedTeam;
  } catch (error) {
    throw new Error("Failed to delete the team.");
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
