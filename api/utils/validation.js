// backend/services/validation.js

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Function to generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

// Function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET
  );
};

// Middleware to validate access token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token not found." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Access token is invalid or expired." });
    }
    req.user = user;
    next();
  });
};

// Function to verify refresh token
const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

// Function to check if a user is a tutor
const isTutor = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.role === "tutor";
  } catch (error) {
    return false;
  }
};

// Middleware to check if the user is a tutor
const authorizeTutor = async (req, res, next) => {
  try {
    const { userId } = req; // Assuming you're setting the userId in the request during authentication

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isUserTutor = await isTutor(userId);

    if (!isUserTutor) {
      return res
        .status(403)
        .json({ message: "Forbidden. Only tutors can perform this action." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
  verifyRefreshToken,
  authorizeTutor,
};
