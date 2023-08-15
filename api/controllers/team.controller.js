// backend/controllers/team.controller.js

const Team = require("../models/team.model.js");
const { authorizeTutor } = require("../utils/validation.js");

// Create a new team (Only tutors can perform this action)
const createTeam = async (req, res) => {
  try {
    // Add authorization check before creating a new team
    await authorizeTutor(req, res, async () => {
      const { name, description } = req.body;
      const user = req.user.id;
      const team = new Team({ name, description, tutor: user });

      const savedTeam = await team.save();
      res.status(201).json(savedTeam);
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    throw new Error("Failed to get teams.");
  }
};

// Get a single team by ID
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      res.status(404).json({ message: "Team not found." });
    }

    res.status(200).json(team);
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
      console.log(id);

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
