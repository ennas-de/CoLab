// backend/controllers/collaboration.controller.js

const Collaboration = require("../models/collaboration.model");

// Create a new collaboration
const createCollaboration = async (teamId, subteamId, userId, content) => {
  try {
    const collaboration = new Collaboration({
      team: teamId,
      subteam: subteamId,
      user: userId,
      content,
    });
    const savedCollaboration = await collaboration.save();
    return savedCollaboration;
  } catch (error) {
    throw new Error("Failed to create a new collaboration.");
  }
};

// Get all collaborations for a specific team and subteam
const getAllCollaborationsByTeamAndSubteam = async (teamId, subteamId) => {
  try {
    const collaborations = await Collaboration.find({
      team: teamId,
      subteam: subteamId,
    });
    return collaborations;
  } catch (error) {
    throw new Error("Failed to get collaborations.");
  }
};

// Get a single collaboration by ID
const getCollaborationById = async (id) => {
  try {
    const collaboration = await Collaboration.findById(id);
    if (!collaboration) {
      throw new Error("Collaboration not found.");
    }
    return collaboration;
  } catch (error) {
    throw new Error("Failed to get the collaboration.");
  }
};

// Update a collaboration by ID
const updateCollaborationById = async (id, content) => {
  try {
    const updatedCollaboration = await Collaboration.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    if (!updatedCollaboration) {
      throw new Error("Collaboration not found.");
    }
    return updatedCollaboration;
  } catch (error) {
    throw new Error("Failed to update the collaboration.");
  }
};

// Delete a collaboration by ID
const deleteCollaborationById = async (id) => {
  try {
    const deletedCollaboration = await Collaboration.findByIdAndRemove(id);
    if (!deletedCollaboration) {
      throw new Error("Collaboration not found.");
    }
    return deletedCollaboration;
  } catch (error) {
    throw new Error("Failed to delete the collaboration.");
  }
};

module.exports = {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
};
