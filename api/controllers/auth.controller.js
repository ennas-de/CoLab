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
    console.log(req.body);

    const { username, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!username || !password || !email || !role)
      return res.status(400).json({ message: "All fields are mandatory." });

    let foundUsername;
    let foundEmail;
    foundUsername = await User.findOne({ username });
    foundEmail = await User.findOne({ email });
    if (foundUsername)
      return res.status(401).json({ message: "Username already taken." });
    if (foundEmail)
      return res.status(401).json({ message: "Email already taken." });

    if (role === "admin") {
      return res.status(401).json({
        message: "Unauthorized! We don't have admin users on this platform.",
      });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: "Failed to register user." });
  }
};

// Controller function to login user and generate access and refresh tokens
const loginUser = async (req, res) => {
  try {
    const { userdetail } = req.body;
    console.log(req.body);

    let user;
    user = await User.findOne({ username: userdetail });
    if (!user) user = await User.findOne({ email: userdetail });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const { password, ...others } = user._doc;

    const accessToken = generateAccessToken(others);
    const refreshToken = generateRefreshToken(others);

    // Set the refresh token as an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // Set the expiration time for the refresh token (e.g., 7 days)
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({ accessToken });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: "Failed to login." });
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
    return res.status(401).json({ message: "Refresh token not found." });
  }

  try {
    const user = await verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Refresh token is invalid or expired." });
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
