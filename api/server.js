// backend/server.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// import routes
const Routes = require("./routes/index.js");

// Create Express app
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(morgan("dev"));

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

// Socket.IO
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// Routes
app.use("/api/v1", Routes);
app.get("/api", (req, res) => {
  res.send("Hello, Welcome to the CoLab platform api!");
});
app.use("*", (req, res) => {
  res
    .status(404)
    .json("Thanks for visiting, but please use the right channels!");
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
