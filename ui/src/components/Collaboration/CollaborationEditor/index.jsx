// frontend/src/features/collaboration/components/CollaborationEditor.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../auth/authSlice";
import {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
} from "../collaboration.slice";
import { Editor } from "react-live";

const CollaborationEditor = () => {
  const { teamId, subteamId, collaborationId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [content, setContent] = useState("");

  useEffect(() => {
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
  }, [collaborationId, dispatch]);

  const handleCodeChange = (newCode) => {
    setContent(newCode);
    // Emit the code update to the server for real-time synchronization
    // Assuming you have socket.io client setup in your app
    socket.emit("codeUpdate", { roomId: collaborationId, code: newCode });
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

  const handleDownloadCode = () => {
    // Code to download the collaboration code as a file
    // Assuming you have implemented the download functionality
    // You can use the 'file-saver' library or other methods to download files
    // For example, using the 'file-saver' library:
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "collaboration_code.txt");
  };

  return (
    <div>
      <h2>Collaboration Editor</h2>
      <Editor
        value={content}
        onChange={handleCodeChange}
        // You can add other editor configurations here
        theme="vs-dark" // Example: Using a dark theme
      />
      <button onClick={handleSaveProgress}>
        {collaborationId ? "Save Progress" : "Create Collaboration"}
      </button>
      <button onClick={handleDownloadCode}>Download Code</button>
    </div>
  );
};

export default CollaborationEditor;
