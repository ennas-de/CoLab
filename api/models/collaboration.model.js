// backend/models/collaboration.model.js

const mongoose = require("mongoose");

const collaborationSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  subteam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subteam",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Collaboration = mongoose.model("Collaboration", collaborationSchema);

module.exports = Collaboration;
