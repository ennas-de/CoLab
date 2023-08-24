import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import socket from "../../../../contexts/socket";
import CollaborationList from "../../../../components/Collaboration/CollaborationList";
import {
  createCollaboration,
  joinCollaborationRoom,
  leaveCollaborationRoom,
} from "../../../../redux/features/collaboration/collaboration.actions";
// Socket
// import io from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
// });

const CollaborationListPage = () => {
  // const socket = useSocket(); // Use the useSocket hook to get the socket instance
  const params = useParams();

  const { teamId, subteamId } = params;

  const user = {
    id: "64d8df589748b875777bfeac",
  };

  // Socket
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && message) {
      socket.emit("send-message", { name, message });
      // setName('')
      // setMessage('')
    }
  };

  // Socket end

  const handleJoinCollaborationRoom = (roomId, userId) => {
    // Join the current user to the collaboration room
    dispatch(joinCollaborationRoom({ roomId, userId }))
      .unwrap()
      .then(() => {
        console.log("Joined collaboration room successfully.");
        // Emit user joined event to the Socket.io room
        socket.emit("joinRoom", { roomId });
      })
      .catch((error) => {
        console.log("Failed to join collaboration room:", error);
      });
  };

  const handleLeaveCollaborationRoom = (roomId, userId) => {
    // Leave the current user from the collaboration room
    dispatch(leaveCollaborationRoom({ roomId, userId }))
      .unwrap()
      .then(() => {
        console.log("Left collaboration room successfully.");
        // Emit user left event to the Socket.io room
        socket.emit("leaveRoom", { roomId });
      })
      .catch((error) => {
        console.log("Failed to leave collaboration room:", error);
      });
  };

  return (
    <div>
      <h2>Collaboration Rooms</h2>
      <Link
        to={`/dashboard/teams/${teamId}/subteams/${subteamId}/collaborations/create`}>
        Create new Collaboration
      </Link>
      {/* Render the CollaborationList component and pass the additional functionalities */}
      <CollaborationList
        teamId={params.teamId}
        subteamId={params.subteamId}
        // socketServerUrl={socketServerUrl}
        // onJoinCollaboration={handleJoinCollaborationRoom}
        // onLeaveCollaboration={handleLeaveCollaborationRoom}
        // onCreateCollaboration={handleCreateCollaboration}
      />
    </div>
  );
};

export default CollaborationListPage;
