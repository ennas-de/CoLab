// frontend/src/features/collaboration/pages/CollaborationEditorPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor } from "react-live";
import { saveAs } from "file-saver";
import {
  createCollaboration,
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
} from "../collaboration.slice";
import { selectUser } from "../../auth/authSlice";

const CollaborationEditorPage = () => {
  const { teamId, subteamId, collaborationId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [content, setContent] = useState("");
  const [collaboration, setCollaboration] = useState(null);

  useEffect(() => {
    if (collaborationId) {
      // Fetch the collaboration content if editing an existing collaboration
      dispatch(getCollaborationById(collaborationId))
        .unwrap()
        .then((data) => {
          setContent(data.content);
          setCollaboration(data);
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

  const handleDeleteCollaboration = () => {
    if (collaborationId) {
      dispatch(deleteCollaborationById(collaborationId))
        .unwrap()
        .then(() => {
          console.log("Collaboration deleted successfully.");
          // Redirect the user to the collaboration list page after deletion
          history.push("/collaborations");
        })
        .catch((error) => {
          console.log("Failed to delete collaboration:", error);
        });
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
      {collaborationId && (
        <button onClick={handleDeleteCollaboration}>Delete Collaboration</button>
      )}
      <button onClick={handleDownloadCode}>Download Code</button>
    </div>
  );
};

export default CollaborationEditorPage;
