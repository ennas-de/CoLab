// backend/routes/subteam.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../utils/validation.js");
const {
  createSubteam,
  getAllSubteamsByTeam,
  getSubteamById,
  updateSubteamById,
  deleteSubteamById,
} = require("../controllers/subteam.controller.js");

// Route: POST /api/subteams
// Description: Create a new subteam
router.post("/:teamId", createSubteam);

// Route: GET /api/subteams
// Description: Get all subteams
router.get("/:teamId", getAllSubteamsByTeam);

// Route: GET /api/subteams/:id
// Description: Get a subteam by ID
router.get("/:teamId/:subteamId", getSubteamById);

// Route: PUT /api/subteams/:id
// Description: Update a subteam by ID
router.put("/:teamId/:subteamId", updateSubteamById);

// Route: DELETE /api/subteams/:id
// Description: Delete a subteam by ID
router.delete("/:teamId/:subteamId", deleteSubteamById);

module.exports = router;
