import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  "force new connection": true,
  reconnectionAttempt: "Infinity",
  timeout: 10000,
});

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
// });

export default socket;
