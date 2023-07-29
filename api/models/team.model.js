// backend/models/team.model.js

const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  subteams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subteam",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
