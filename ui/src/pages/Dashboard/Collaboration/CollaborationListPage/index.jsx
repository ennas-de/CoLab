// frontend/src/pages/Dashboard/Collaboration/CollaborationListPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../../contexts/SocketContext";
import CollaborationList from "../../../../features/collaboration/components/CollaborationList"; // Import the CollaborationList component
import {
  createCollaboration,
  joinCollaborationRoom,
  leaveCollaborationRoom,
} from "../../../../redux/features/collaboration/collaboration.actions";

const CollaborationListPage = () => {
  const socket = useSocket(); // Use the useSocket hook to get the socket instance
  const params = useParams();

  // Additional functionalities for creating, joining, and leaving collaboration rooms
  const handleCreateCollaboration = (
    newCollaborationName,
    teamId,
    subteamId,
    user
  ) => {
    // Create a new collaboration room
    dispatch(
      createCollaboration({
        teamId,
        subteamId,
        userId: user.id,
        name: newCollaborationName,
        content: "", // Initialize the content with an empty string
      })
    )
      .unwrap()
      .then((data) => {
        console.log("Collaboration created successfully.");
        // Emit the new collaboration details to all clients using Socket.io
        socket.emit("newRoom", { roomId: data._id, name: data.name });
      })
      .catch((error) => {
        console.log("Failed to create collaboration:", error);
      });
  };

  const handleJoinCollaborationRoom = (roomId, userId) => {
    // Join the current user to the collaboration room
    dispatch(joinCollaborationRoom({ roomId, userId }))
      .unwrap()
      .then(() => {
        console.log("Joined collaboration room successfully.");
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
      })
      .catch((error) => {
        console.log("Failed to leave collaboration room:", error);
      });
  };

  return (
    <div>
      <h2>Collaboration Rooms</h2>
      {/* Render the CollaborationList component and pass the additional functionalities */}
      <CollaborationList
        teamId={params.teamId}
        subteamId={params.subteamId}
        socketServerUrl={socketServerUrl}
        onJoinCollaboration={handleJoinCollaborationRoom}
        onLeaveCollaboration={handleLeaveCollaborationRoom}
        onCreateCollaboration={handleCreateCollaboration}
      />
    </div>
  );
};

export default CollaborationListPage;
