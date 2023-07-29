// backend/server.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Create Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// import routes
const authRoutes = require("./routes/auth.routes.js");

// Connect to MongoDB
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api", authRoutes);
app.use("/api", require("./routes/team.routes.js"));
app.use("/api", require("./routes/subteam.routes.js"));
app.use("/api", require("./routes/collaboration.routes.js"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
