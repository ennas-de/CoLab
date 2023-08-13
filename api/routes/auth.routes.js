// backend/routes/auth.routes.js

const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  generateAccessToken,
  verifyRefreshToken,
} = require("../utils/validation.js");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller.js");

// Route: POST /api/auth/login
// Description: User login
router.post("/login", loginUser);

// Route: POST /api/auth/signup
// Description: User signup
router.post("/register", registerUser);

// Route: POST /api/auth/logout
// Description: User logout (revoke refresh token)
router.post("/logout", authenticateToken, logoutUser);

// Route: POST /api/auth/refresh-token
// Description: Refresh access token using refresh token
router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found." });
  }

  try {
    const user = await verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Refresh token is invalid or expired." });
  }
});

module.exports = router;
