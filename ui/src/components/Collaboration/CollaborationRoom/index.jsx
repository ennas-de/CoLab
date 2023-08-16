// frontend/src/features/collaboration/components/CollaborationRoom.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectUser } from "../../auth/authSlice";
import {
  getCollaborationById,
  updateCollaborationById,
} from "../collaboration.slice";
import socket from "../../socket"; // Import socket for real-time synchronization
import { Editor } from "react-codemirror2"; // Import collaborative editor library
import "codemirror/lib/codemirror.css"; // Import Codemirror styles
import "codemirror/theme/material.css"; // Import Codemirror theme

const CollaborationRoom = () => {
  const { teamId, subteamId, collaborationId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [content, setContent] = useState("");
  const [editorCursor, setEditorCursor] = useState({});
  const [editorSelections, setEditorSelections] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);

  useEffect(() => {
    // Listen for user joined and left events
    socket.on("userJoined", ({ userId }) => {
      setUsersInRoom((prevUsers) => [...prevUsers, userId]);
    });

    socket.on("userLeft", ({ userId }) => {
      setUsersInRoom((prevUsers) => prevUsers.filter((id) => id !== userId));
    });

    return () => {
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, []);

  useEffect(() => {
    if (collaborationId) {
      // Fetch the collaboration content if editing an existing collaboration
      dispatch(getCollaborationById(collaborationId))
        .unwrap()
        .then((data) => {
          setContent(data.content);
          // Join the collaboration room using Socket.io
          socket.emit("joinRoom", { roomId: data._id });
        })
        .catch((error) => {
          console.log("Failed to fetch collaboration:", error);
        });
    }
    // Cleanup Socket.io listeners on unmount
    return () => {
      // Leave the collaboration room when the component unmounts
      if (collaborationId) {
        socket.emit("leaveRoom", { roomId: collaborationId });
      }
    };
  }, [collaborationId, dispatch]);

  useEffect(() => {
    // Listen for cursor and selection updates from other users
    socket.on("editorCursorUpdate", (data) => {
      setEditorCursor((prevCursor) => ({
        ...prevCursor,
        [data.userId]: data.cursorPosition,
      }));
    });
    socket.on("editorSelectionsUpdate", (data) => {
      setEditorSelections((prevSelections) => ({
        ...prevSelections,
        [data.userId]: data.selectionRange,
      }));
    });
    // Cleanup cursor and selection listeners on unmount
    return () => {
      socket.off("editorCursorUpdate");
      socket.off("editorSelectionsUpdate");
    };
  }, []);

  const handleCodeChange = (editor, data, newCode) => {
    // Emit the code update to the server for real-time synchronization
    socket.emit("codeUpdate", { roomId: collaborationId, code: newCode });
    // Update the existing collaboration content
    dispatch(updateCollaborationById({ id: collaborationId, content: newCode }))
      .unwrap()
      .then(() => {
        console.log("Collaboration updated successfully.");
      })
      .catch((error) => {
        console.log("Failed to update collaboration:", error);
      });
  };

  const handleCursorActivity = (editor) => {
    const cursorPosition = editor.getCursor();
    // Emit cursor position update to the server
    socket.emit("editorCursorUpdate", {
      roomId: collaborationId,
      userId: user.id,
      cursorPosition,
    });
  };

  const handleSelectionUpdate = (editor) => {
    const selection = editor.getSelection();
    // Emit selection range update to the server
    socket.emit("editorSelectionsUpdate", {
      roomId: collaborationId,
      userId: user.id,
      selectionRange: selection,
    });
  };

  return (
    <div>
      <h2>Collaboration Room</h2>
      <div>Users in the room: {usersInRoom.join(", ")}</div>
      <h3>Editor:</h3>
      <Editor
        value={content}
        onBeforeChange={handleCodeChange}
        onChange={handleCursorActivity}
        onSelection={handleSelectionUpdate}
        options={{
          mode: "javascript", // Set your preferred language mode
          theme: "material",
        }}
      />
      <div>
        {Object.entries(editorCursor).map(([userId, cursorPosition]) => (
          <div key={userId}>
            User {userId}: Cursor at Line {cursorPosition.line}, Column{" "}
            {cursorPosition.ch}
          </div>
        ))}
      </div>
      <div>
        {Object.entries(editorSelections).map(([userId, selectionRange]) => (
          <div key={userId}>
            User {userId}: Selection from Line {selectionRange.anchor.line},
            Column {selectionRange.anchor.ch} to Line {selectionRange.head.line}
            , Column {selectionRange.head.ch}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationRoom;
