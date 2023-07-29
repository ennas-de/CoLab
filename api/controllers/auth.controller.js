// backend/controllers/auth.controller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/validation.js");

// Controller function to register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user." });
  }
};

// Controller function to login user and generate access and refresh tokens
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set the refresh token as an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // Set the expiration time for the refresh token (e.g., 7 days)
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to login." });
  }
};

// Controller function to logout user and clear the refresh token cookie
const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logout successful." });
};

// Controller function to get new access token using the refresh token
const getAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not found." });
  }

  try {
    const user = await verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ error: "Refresh token is invalid or expired." });
  }
};

// Controller function to get user profile (protected route)
const getUserProfile = (req, res) => {
  // `req.user` contains the authenticated user's information
  // In this example, it contains the `id` and `username`
  const { id, username } = req.user;
  res.json({ id, username });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getAccessToken,
  getUserProfile,
};
