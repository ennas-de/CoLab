// frontend/src/features/collaboration/components/CollaborationEditor.js
import React, { useState, useEffect } from "react";
import { Editor } from "react-live";

const CollaborationEditor = ({ content, onCodeUpdate }) => {
  const [editorContent, setEditorContent] = useState(content);

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  const handleCodeChange = (newCode) => {
    setEditorContent(newCode);
    onCodeUpdate(newCode);
  };

  return (
    <div>
      <Editor
        value={editorContent}
        onChange={handleCodeChange}
        // Add other editor configurations here
        theme="vs-dark" // Example: Using a dark theme
      />
    </div>
  );
};

export default CollaborationEditor;
