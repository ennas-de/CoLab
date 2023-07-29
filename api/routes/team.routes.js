// backend/routes/team.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../utils/validation.js");
const {
  createTeam,
  getTeamById,
  getAllTeams,
  updateTeam,
  deleteTeam,
} = require("../controllers/team.controller.js");

// Route: POST /api/teams
// Description: Create a new team
router.post("/teams", authenticateToken, createTeam);

// Route: GET /api/teams/:id
// Description: Get a team by ID
router.get("/teams/:id", authenticateToken, getTeamById);

// Route: GET /api/teams
// Description: Get all teams
router.get("/teams", authenticateToken, getAllTeams);

// Route: PUT /api/teams/:id
// Description: Update a team by ID
router.put("/teams/:id", authenticateToken, updateTeam);

// Route: DELETE /api/teams/:id
// Description: Delete a team by ID
router.delete("/teams/:id", authenticateToken, deleteTeam);

module.exports = router;
