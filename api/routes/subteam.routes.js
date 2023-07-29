// backend/routes/subteam.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../utils/validation.js");
const {
  createSubteam,
  getSubteamById,
  getAllSubteams,
  updateSubteam,
  deleteSubteam,
} = require("../controllers/subteam.controller.js");

// Route: POST /api/subteams
// Description: Create a new subteam
router.post("/subteams", authenticateToken, createSubteam);

// Route: GET /api/subteams/:id
// Description: Get a subteam by ID
router.get("/subteams/:id", authenticateToken, getSubteamById);

// Route: GET /api/subteams
// Description: Get all subteams
router.get("/subteams", authenticateToken, getAllSubteams);

// Route: PUT /api/subteams/:id
// Description: Update a subteam by ID
router.put("/subteams/:id", authenticateToken, updateSubteam);

// Route: DELETE /api/subteams/:id
// Description: Delete a subteam by ID
router.delete("/subteams/:id", authenticateToken, deleteSubteam);

module.exports = router;
