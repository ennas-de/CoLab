// frontend/src/features/collaboration/pages/CollaborationDetailPage.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import {
  selectUser,
  selectAccessToken,
  selectRefreshToken,
} from "../../auth/authSlice";
import {
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
  joinCollaborationRoom,
  leaveCollaborationRoom,
} from "../collaboration.slice";
import CodeEditor from "../components/CodeEditor";
import API from "../../api";

const CollaborationDetailPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const { teamId, subteamId, collaborationId } = useParams();
  const [collaboration, setCollaboration] = useState(null);

  useEffect(() => {
    // Fetch the details of the selected collaboration
    dispatch(getCollaborationById(collaborationId))
      .unwrap()
      .then((data) => {
        setCollaboration(data);
      })
      .catch((error) => {
        console.log("Failed to fetch collaboration:", error);
      });
  }, [dispatch, collaborationId]);

  const handleCodeUpdate = (newCode) => {
    // Update the code in the collaboration and save it to the backend
    if (collaboration) {
      dispatch(
        updateCollaborationById({
          collaborationId: collaboration._id,
          content: newCode,
        })
      )
        .unwrap()
        .then((data) => {
          console.log("Collaboration updated successfully.");
        })
        .catch((error) => {
          console.log("Failed to update collaboration:", error);
        });
    }
  };

  const handleSaveCode = () => {
    // Save the code to local storage for later retrieval
    if (collaboration) {
      localStorage.setItem("savedCode", collaboration.content);
      console.log("Code saved!");
    }
  };

  const handleDownloadCode = () => {
    // Download the collaboration code as a file
    if (collaboration) {
      const blob = new Blob([collaboration.content], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "collaboration_code.txt");
    }
  };

  const handleJoinCollaborationRoom = async () => {
    if (collaboration) {
      try {
        // Send a request to the backend to join the collaboration room
        await API.post(`/collaboration/join/${collaboration._id}`, {
          accessToken,
          refreshToken,
        });

        // Dispatch the action to update the collaboration state with the new user in the room
        dispatch(joinCollaborationRoom({ roomId: collaboration._id, userId: user.id }));
      } catch (error) {
        console.log("Failed to join collaboration room:", error);
      }
    }
  };

  const handleLeaveCollaborationRoom = async () => {
    if (collaboration) {
      try {
        // Send a request to the backend to leave the collaboration room
        await API.post(`/collaboration/leave/${collaboration._id}`, {
          accessToken,
          refreshToken,
        });

        // Dispatch the action to update the collaboration state and remove the user from the room
        dispatch(leaveCollaborationRoom({ roomId: collaboration._id, userId: user.id }));
      } catch (error) {
        console.log("Failed to leave collaboration room:", error);
      }
    }
  };

  const handleDeleteCollaboration = async () => {
    if (collaboration) {
      try {
        // Send a request to the backend to delete the collaboration
        await API.delete(`/collaboration/${collaboration._id}`, {
          accessToken,
          refreshToken,
        });

        // Dispatch the action to update the collaboration state and remove the deleted collaboration
        dispatch(deleteCollaborationById(collaboration._id));
      } catch (error) {
        console.log("Failed to delete collaboration:", error);
      }
    }
  };

  return (
    <div>
      {collaboration ? (
        <>
          <h2>{collaboration.name}</h2>
          <CodeEditor
            code={collaboration.content}
            onCodeUpdate={handleCodeUpdate}
          />
          <button onClick={handleSaveCode}>Save Code</button>
          <button onClick={handleDownloadCode}>Download Code</button>
          {!collaboration.users.has(user.id) ? (
            <button onClick={handleJoinCollaborationRoom}>Join Room</button>
          ) : (
            <button onClick={handleLeaveCollaborationRoom}>Leave Room</button>
          )}
          <button onClick={handleDeleteCollaboration}>Delete Collaboration</button>
        </>
      ) : (
        <p>Loading collaboration details...</p>
      )}
    </div>
  );
};

export default CollaborationDetailPage;
