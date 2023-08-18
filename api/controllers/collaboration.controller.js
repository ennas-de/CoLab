// backend/controllers/collaboration.controller.js

const Collaboration = require("../models/collaboration.model");

// Create a new collaboration
const createCollaboration = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const { teamId, subteamId } = req.params;
    const { name, description } = content;

    const collaboration = new Collaboration({
      team: teamId,
      subteam: subteamId,
      user: userId,
      name,
      description,
    });
    const savedCollaboration = await collaboration.save();
    res.status(201).json(savedCollaboration);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: "Failed to create a new collaboration." });
  }
};

// Get all collaborations for a specific team and subteam
const getAllCollaborationsByTeamAndSubteam = async (req, res) => {
  const { teamId, subteamId } = req.params;
  try {
    const collaborations = await Collaboration.find({
      team: teamId,
      subteam: subteamId,
    });
    res.status(200).json(collaborations);
  } catch (error) {
    res.status(500).json({ message: "Failed to get collaborations." });
  }
};

// Get a single collaboration by ID
const getCollaborationById = async (req, res) => {
  const { collaborationId } = req.params;
  try {
    const collaboration = await Collaboration.findById(collaborationId);
    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found." });
    }
    res.status(200).json(collaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to get the collaboration." });
  }
};

// Update a collaboration by ID
const updateCollaborationById = async (req, res) => {
  const { collaborationId } = req.params;
  try {
    console.log(req.body);

    const { content } = req.body;
    console.log("content -", content);

    const updatedCollaboration = await Collaboration.findByIdAndUpdate(
      collaborationId,
      { code: content },
      { new: true }
    );

    console.log(updatedCollaboration);

    if (!updatedCollaboration) {
      return res.status(404).json({ message: "Collaboration not found." });
    }
    res.status(200).json(updatedCollaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to update the collaboration." });
  }
};

// Join a collaboration room
const joinCollaborationRoom = async (req, res) => {
  const { teamId, subteamId, collaborationId, roomId } = req.params;
  const userId = req.user.id;
  try {
    const collaboration = await Collaboration.findById(roomId);
    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found." });
    }

    collaboration.users.push(userId);
    await collaboration.save();

    res.status(200).json(collaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to join collaboration room." });
  }
};

// Leave a collaboration room
const leaveCollaborationRoom = async (req, res) => {
  const { teamId, subteamId, collaborationId, roomId } = req.params;
  try {
    const userId = req.user.id;

    const collaboration = await Collaboration.findById(roomId);
    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found." });
    }

    collaboration.users = collaboration.users.filter(
      (user) => user.toString() !== userId
    );
    await collaboration.save();

    res.status(200).json(collaboration);
  } catch (error) {
    res.status(500).json({ message: "Failed to leave collaboration room." });
  }
};

// Delete a collaboration by ID
const deleteCollaborationById = async (req, res) => {
  const { teamId, subteamId, collaborationId, roomId } = req.params;
  try {
    const deletedCollaboration = await Collaboration.findByIdAndRemove(
      collaborationId
    );
    if (!deletedCollaboration) {
      res.status(404).json({ message: "Collaboration not found." });
    }
    res.status(200).json(deletedCollaboration);
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
