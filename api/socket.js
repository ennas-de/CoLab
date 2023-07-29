// socket.js
const socketIO = require("socket.io");

// Function to initialize Socket.io and attach it to the server
const initializeSocket = (server) => {
  const io = socketIO(server);

  // Store active collaboration rooms and their users
  const collaborationRooms = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected!");

    // Handle socket events here

    // Socket.io disconnection event
    socket.on("disconnect", () => {
      console.log("A user disconnected!");

      // Clean up empty rooms when a user disconnects
      collaborationRooms.forEach((room, roomId) => {
        if (room.users.has(socket.id)) {
          room.users.delete(socket.id);
          if (room.users.size === 0) {
            collaborationRooms.delete(roomId);
            console.log(`Room ${roomId} has been closed due to inactivity.`);
          }
        }
      });
    });
  });

  return io;
};

module.exports = initializeSocket;
