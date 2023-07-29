// frontend/src/features/collaboration/components/CollaborationList.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../auth/authSlice";
import {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
} from "../collaboration.slice";

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaborationList;
