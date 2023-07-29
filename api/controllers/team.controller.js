// backend/controllers/team.controller.js

const Team = require("../models/team.model.js");

// Create a new team (Only tutors can perform this action)
const createTeam = async (req, res) => {
  try {
    // Add authorization check before creating a new team
    await authorizeTutor(req, res, async () => {
      const { name, description } = req.body;
      const team = new Team({ name, description });

      const savedTeam = await team.save();
      res.status(201).json(savedTeam);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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

// Update an existing team by ID (Only tutors can perform this action)
const updateTeamById = async (req, res) => {
  try {
    // Add authorization check before updating the team
    await authorizeTutor(req, res, async () => {
      const { id } = req.params;
      const { name, description } = req.body;

      const updatedTeam = await Team.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );

      if (!updatedTeam) {
        return res.status(404).json({ message: "Team not found" });
      }

      res.json(updatedTeam);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an existing team by ID (Only tutors can perform this action)
const deleteTeamById = async (req, res) => {
  try {
    // Add authorization check before deleting the team
    await authorizeTutor(req, res, async () => {
      const { id } = req.params;

      const deletedTeam = await Team.findByIdAndDelete(id);

      if (!deletedTeam) {
        return res.status(404).json({ message: "Team not found" });
      }

      res.json(deletedTeam);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
