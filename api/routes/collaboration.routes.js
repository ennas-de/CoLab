// backend/routes/collaboration.routes.js

const express = require("express");
const router = express.Router();
const {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
} = require("../controllers/collaboration.controller.js");

// Route: POST /api/collaborations
// Description: Create a new collaboration
router.post("/:teamId/:subteamId", createCollaboration);

// Route: GET /api/collaborations
// Description: Get all collaborations
router.get("/:teamId/:subteamId/", getAllCollaborationsByTeamAndSubteam);

// Route: GET /api/collaborations/:id
// Description: Get a collaboration by ID
router.get("/:teamId/:subteamId/:collaborationId", getCollaborationById);

// Route: PUT /api/collaborations/:id
// Description: Update a collaboration by ID
router.put("/:teamId/:subteamId/:collaborationId", updateCollaborationById);

// Route: DELETE /api/collaborations/:id
// Description: Delete a collaboration by ID
router.delete("/:teamId/:subteamId/:collaborationId", deleteCollaborationById);

module.exports = router;
