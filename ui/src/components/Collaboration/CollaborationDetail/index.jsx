// frontend/src/features/collaboration/components/CollaborationDetail.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import {
  getCollaborationById,
  updateCollaborationById,
} from "../collaboration.slice";
import CodeEditor from "./CodeEditor";
import { useSocket } from "../../contexts/SocketContext";

const CollaborationDetail = ({
  teamId,
  subteamId,
  collaborationId,
  socketServerUrl,
  onJoinCollaboration,
  onLeaveCollaboration,
  onDeleteCollaboration,
}) => {
  const dispatch = useDispatch();
  const socket = useSocket(); // Use the useSocket hook to get the socket instance
  const [collaboration, setCollaboration] = useState(null);

  useEffect(() => {
    // Fetch the details of the selected collaboration
    dispatch(getCollaborationById(collaborationId))
      .unwrap()
      .then((data) => {
        setCollaboration(data);

        // Join the collaboration room using Socket.io
        socket.emit("joinRoom", { roomId: data._id });
      })
      .catch((error) => {
        console.log("Failed to fetch collaboration:", error);
      });

    // Cleanup Socket.io listeners on unmount
    return () => {
      // Leave the collaboration room when the component unmounts
      if (collaboration) {
        socket.emit("leaveRoom", { roomId: collaboration._id });
      }
    };
  }, [dispatch, collaborationId, socket]);

  // Rest of the component remains unchanged

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
            <button
              onClick={() => onJoinCollaboration(collaborationId, user.id)}>
              Join Room
            </button>
          ) : (
            <button
              onClick={() => onLeaveCollaboration(collaborationId, user.id)}>
              Leave Room
            </button>
          )}
          <button onClick={() => onDeleteCollaboration(collaborationId)}>
            Delete Collaboration
          </button>
        </>
      ) : (
        <p>Loading collaboration details...</p>
      )}
    </div>
  );
};

export default CollaborationDetail;
