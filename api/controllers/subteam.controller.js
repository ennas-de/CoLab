// backend/controllers/subteam.controller.js

const Subteam = require("../models/subteam.model.js");

// Create a new subteam
const createSubteam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const teamId = req.params.teamId;

    const subteam = new Subteam({ team: teamId, name, description });
    const savedSubteam = await subteam.save();

    res.status(201).json(savedSubteam);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: "Failed to create a new subteam." });
  }
};

// Get all subteams for a specific team
const getAllSubteamsByTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;

    const subteams = await Subteam.find({ team: teamId });
    res.status(200).json(subteams);
  } catch (error) {
    res.status(500).json({ message: "Failed to get subteams." });
  }
};

// Get a single subteam by ID
const getSubteamById = async (req, res) => {
  try {
    console.log(req.params);

    const { teamId, subteamId } = req.params;

    const subteam = await Subteam.findById({ _id: subteamId, team: teamId });
    if (!subteam) {
      return res.status(404).json({ message: "Subteam not found." });
    }
    return res.status(200).json(subteam);
  } catch (error) {
    console.log(error.message);

    return res.status(404).json({ message: "Failed to get the subteam." });
  }
};

// Update a subteam by ID
const updateSubteamById = async (id, name, description) => {
  try {
    const updatedSubteam = await Subteam.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedSubteam) {
      throw new Error("Subteam not found.");
    }
    return updatedSubteam;
  } catch (error) {
    throw new Error("Failed to update the subteam.");
  }
};

// Delete a subteam by ID
const deleteSubteamById = async (id) => {
  try {
    const deletedSubteam = await Subteam.findByIdAndRemove(id);
    if (!deletedSubteam) {
      throw new Error("Subteam not found.");
    }
    return deletedSubteam;
  } catch (error) {
    throw new Error("Failed to delete the subteam.");
  }
};

module.exports = {
  createSubteam,
  getAllSubteamsByTeam,
  getSubteamById,
  updateSubteamById,
  deleteSubteamById,
};
