// frontend/src/pages/Dashboard/Collaboration/CollaborationEditorPage.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../auth/authSlice";
import {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  joinCollaborationRoom,
  leaveCollaborationRoom,
} from "../collaboration.slice";
import socket from "../../socket"; // Import socket for real-time synchronization

const CollaborationList = ({ teamId, subteamId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [collaborations, setCollaborations] = useState([]);
  const [newCollaborationName, setNewCollaborationName] = useState("");

  useEffect(() => {
    // Fetch all collaborations for the current team and subteam
    dispatch(getAllCollaborationsByTeamAndSubteam({ teamId, subteamId }))
      .unwrap()
      .then((data) => {
        setCollaborations(data);
      })
      .catch((error) => {
        console.log("Failed to fetch collaborations:", error);
      });
  }, [teamId, subteamId, dispatch]);

  useEffect(() => {
    // Join the collaboration room for each collaboration in the list using Socket.io
    collaborations.forEach((collaboration) => {
      socket.emit("joinRoom", { roomId: collaboration._id });
    });

    // Cleanup Socket.io listeners on unmount
    return () => {
      // Leave the collaboration room for each collaboration when the component unmounts
      collaborations.forEach((collaboration) => {
        socket.emit("leaveRoom", { roomId: collaboration._id });
      });
    };
  }, [collaborations]);

  const handleCreateCollaboration = () => {
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
        // Add the new collaboration to the list
        setCollaborations((prevCollaborations) => [...prevCollaborations, data]);
        // Clear the input field
        setNewCollaborationName("");
      })
      .catch((error) => {
        console.log("Failed to create collaboration:", error);
      });
  };

  const handleJoinCollaborationRoom = (roomId) => {
    // Join the current user to the collaboration room
    dispatch(joinCollaborationRoom({ roomId, userId: user.id }))
      .unwrap()
      .then(() => {
        console.log("Joined collaboration room successfully.");
      })
      .catch((error) => {
        console.log("Failed to join collaboration room:", error);
      });
  };

  const handleLeaveCollaborationRoom = (roomId) => {
    // Leave the current user from the collaboration room
    dispatch(leaveCollaborationRoom({ roomId, userId: user.id }))
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
      <div>
        <input
          type="text"
          value={newCollaborationName}
          onChange={(e) => setNewCollaborationName(e.target.value)}
          placeholder="Enter a name for the new collaboration"
        />
        <button onClick={handleCreateCollaboration}>Create Collaboration</button>
      </div>
      <ul>
        {collaborations.map((collaboration) => (
          <li key={collaboration._id}>
            <Link to={`/team/${teamId}/subteam/${subteamId}/collaboration/${collaboration._id}`}>
              {collaboration.name}
            </Link>
            {collaboration.users.has(user.id) ? (
              <button onClick={() => handleLeaveCollaborationRoom(collaboration._id)}>
                Leave Room
              </button>
            ) : (
              <button onClick={() => handleJoinCollaborationRoom(collaboration._id)}>
                Join Room
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaborationEditorPage;
