// backend/server.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const http = require("http");
const { collaborationRooms, initializeSocket } = require("./socket.js");

// import routes
const Routes = require("./routes/index.js");

// import socket related controller functions
// const {
// createCollaboration
//   joinCollaborationRoom,
//   leaveCollaborationRoom,
// } = require("./path/to/collaboration.controller.js");

// Create Express app
const app = express();
const server = http.createServer(app);

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

// Initialize Socket.io and attach it to the server
const io = initializeSocket(server);

// Add socket.io middleware or configurations here if needed
// ...

// Handle socket events here
// Function to generate a random collaboration room ID
const generateRoomId = () => {
  return Math.random().toString(36).substring(7);
};

// API Endpoint: Create a new collaboration room
app.post("/api/collaboration/create", (req, res) => {
  // Assuming authentication and authorization middleware is already in place
  // Check if the user is a tutor or has the required role to create a collaboration room
  if (req.user.role !== "tutor") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Generate a new room ID
  const roomId = generateRoomId();

  // Create the new room and add the tutor as the first user
  collaborationRooms.set(roomId, {
    name: req.body.name,
    users: new Set([req.user.id]),
    code: "", // Optional: You can add a code field to store the code content
  });

  // Emit the new room details to all clients
  io.emit("newRoom", { roomId, name: req.body.name });

  return res.status(201).json({ roomId, name: req.body.name });
});

// API Endpoint: Get a list of all collaboration rooms
app.get("/api/collaboration/rooms", (req, res) => {
  // Return the list of room IDs and names
  const rooms = Array.from(collaborationRooms.keys()).map((roomId) => ({
    roomId,
    name: collaborationRooms.get(roomId).name,
  }));
  return res.json(rooms);
});

// API Endpoint: Get detailed information about a collaboration room
app.get("/api/collaboration/room/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  if (!collaborationRooms.has(roomId)) {
    return res.status(404).json({ error: "Room not found" });
  }

  const room = collaborationRooms.get(roomId);
  return res.json(room);
});

// API Endpoint: Join a collaboration room
app.post("/api/collaboration/join/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const collaboration = await joinCollaborationRoom(roomId, req.user.id);

    // Emit user joined event to all clients in the room
    io.to(roomId).emit("userJoined", { userId: req.user.id });

    return res.json({ message: "Joined the room successfully", collaboration });
  } catch (error) {
    return res.status(500).json({ error: "Failed to join the room" });
  }
});

// API Endpoint: Leave a collaboration room
app.post("/api/collaboration/leave/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const collaboration = await leaveCollaborationRoom(roomId, req.user.id);

    // Emit user left event to all clients in the room
    io.to(roomId).emit("userLeft", { userId: req.user.id });

    return res.json({ message: "Left the room successfully", collaboration });
  } catch (error) {
    return res.status(500).json({ error: "Failed to leave the room" });
  }
});

// ... (Other routes and middleware)

// Function to handle real-time code updates in a collaboration room
const handleCodeUpdate = (roomId, code) => {
  if (!collaborationRooms.has(roomId)) {
    return;
  }

  // Update the code in the room
  collaborationRooms.get(roomId).code = code;

  // Emit the updated code to all clients in the room except the sender
  socket.to(roomId).emit("codeUpdated", { code });
};

// Socket.io event: User updates the code in a collaboration room
io.on("connection", (socket) => {
  // Listen for code updates from clients
  socket.on("codeUpdate", ({ roomId, code }) => {
    handleCodeUpdate(roomId, code);
  });

  // Join the user to a specific room when they connect
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
