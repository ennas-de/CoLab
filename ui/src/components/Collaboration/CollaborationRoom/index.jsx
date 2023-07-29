// frontend/src/features/collaboration/components/CollaborationRoom.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectUser } from "../../auth/authSlice";
import {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
} from "../collaboration.slice";

const CollaborationRoom = () => {
  const { teamId, subteamId, collaborationId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [collaborations, setCollaborations] = useState([]);
  const [content, setContent] = useState("");

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

    if (collaborationId) {
      // Fetch the collaboration content if editing an existing collaboration
      dispatch(getCollaborationById(collaborationId))
        .unwrap()
        .then((data) => {
          setContent(data.content);
        })
        .catch((error) => {
          console.log("Failed to fetch collaboration:", error);
        });
    }
  }, [teamId, subteamId, collaborationId, dispatch]);

  const handleCodeChange = (newCode) => {
    setContent(newCode);
  };

  const handleSaveProgress = () => {
    if (collaborationId) {
      // Update the existing collaboration content
      dispatch(updateCollaborationById({ id: collaborationId, content }))
        .unwrap()
        .then(() => {
          console.log("Collaboration updated successfully.");
        })
        .catch((error) => {
          console.log("Failed to update collaboration:", error);
        });
    } else {
      // Create a new collaboration
      dispatch(
        createCollaboration({
          teamId,
          subteamId,
          userId: user.id,
          content,
        })
      )
        .unwrap()
        .then(() => {
          console.log("Collaboration created successfully.");
        })
        .catch((error) => {
          console.log("Failed to create collaboration:", error);
        });
    }
  };

  const handleDeleteCollaboration = (collaborationId) => {
    dispatch(deleteCollaborationById(collaborationId))
      .unwrap()
      .then(() => {
        console.log("Collaboration deleted successfully.");
        // Update the collaborations list after deletion
        setCollaborations((prevCollaborations) =>
          prevCollaborations.filter((collab) => collab._id !== collaborationId)
        );
      })
      .catch((error) => {
        console.log("Failed to delete collaboration:", error);
      });
  };

  return (
    <div>
      <h2>Collaboration Room</h2>
      <h3>Collaborations:</h3>
      <ul>
        {collaborations.map((collaboration) => (
          <li key={collaboration._id}>
            <Link to={`/team/${teamId}/subteam/${subteamId}/collaboration/${collaboration._id}`}>
              {collaboration.name}
            </Link>{" "}
            |{" "}
            <button onClick={() => handleDeleteCollaboration(collaboration._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3>Editor:</h3>
      <textarea
        value={content}
        onChange={(e) => handleCodeChange(e.target.value)}
      />
      <button onClick={handleSaveProgress}>
        {collaborationId ? "Save Progress" : "Create Collaboration"}
      </button>
      {/* Add the button for downloading the code here */}
    </div>
  );
};

export default CollaborationRoom;
