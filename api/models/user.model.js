// backend/models/user.model.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      "student",
      "tutor",
      "admin",
      "school",
      "editor",
      "supervisor",
      "lead",
    ],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
