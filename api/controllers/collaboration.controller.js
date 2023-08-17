// backend/controllers/collaboration.controller.js

const Collaboration = require("../models/collaboration.model");

// Create a new collaboration
const createCollaboration = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const { teamId, subteamId } = req.params;

    const collaboration = new Collaboration({
      team: teamId,
      subteam: subteamId,
      user: userId,
      content,
    });
    const savedCollaboration = await collaboration.save();
    res.status(201).json(savedCollaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to create a new collaboration." });
  }
};

// Get all collaborations for a specific team and subteam
const getAllCollaborationsByTeamAndSubteam = async (teamId, subteamId) => {
  try {
    const collaborations = await Collaboration.find({
      team: teamId,
      subteam: subteamId,
    });
    res.status(201).json(collaborations);
  } catch (error) {
    res.status(500).json({ message: "Failed to get collaborations." });
  }
};

// Get a single collaboration by ID
const getCollaborationById = async (id) => {
  try {
    const collaboration = await Collaboration.findById(id);
    if (!collaboration) {
      return res.status(500).json({ message: "Collaboration not found." });
    }
    res.status(201).json(collaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to get the collaboration." });
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
      return res.status(500).json({ message: "Collaboration not found." });
    }
    res.status(201).json(updatedCollaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to update the collaboration." });
  }
};

// Join a collaboration room
const joinCollaborationRoom = async (roomId, userId) => {
  try {
    const collaboration = await Collaboration.findById(roomId);
    if (!collaboration) {
      return res.status(500).json({ message: "Collaboration not found." });
    }

    collaboration.users.push(userId);
    await collaboration.save();

    res.status(201).json(collaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to join collaboration room." });
  }
};

// Leave a collaboration room
const leaveCollaborationRoom = async (roomId, userId) => {
  try {
    const collaboration = await Collaboration.findById(roomId);
    if (!collaboration) {
      return res.status(500).json({ message: "Collaboration not found." });
    }

    collaboration.users = collaboration.users.filter(
      (user) => user.toString() !== userId
    );
    await collaboration.save();

    res.status(201).json(collaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to leave collaboration room." });
  }
};

// Delete a collaboration by ID
const deleteCollaborationById = async (id) => {
  try {
    const deletedCollaboration = await Collaboration.findByIdAndRemove(id);
    if (!deletedCollaboration) {
      res.status(500).json({ message: "Collaboration not found." });
    }
    res.status(201).json(deletedCollaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the collaboration." });
  }
};

module.exports = {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  getCollaborationById,
  updateCollaborationById,
  joinCollaborationRoom,
  leaveCollaborationRoom,
  deleteCollaborationById,
};
