// backend/routes/team.routes.js

const express = require("express");
const router = express.Router();
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
} = require("../controllers/team.controller.js");

// Route: GET /api/teams
// Description: Get all teams
router.get("/", getAllTeams);

// Route: POST /api/teams
// Description: Create a new team
router.post("/", createTeam);

// Route: GET /api/teams/:id
// Description: Get a team by ID
router.get("/:id", getTeamById);

// Route: PUT /api/teams/:id
// Description: Update a team by ID
router.put("/:id", updateTeamById);

// Route: DELETE /api/teams/:id
// Description: Delete a team by ID
router.delete("/:id", deleteTeamById);

module.exports = router;
