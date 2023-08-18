import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createCollaboration } from "../../../redux/features/collaboration/collaboration.actions";

const AddCollaborationForm = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { teamId, subteamId } = params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //   const user = useSelector((state) => state.user.user);
  const user = {
    _id: "64d8df589748b875777bfeac",
  };
  const userId = user._id;
  const content = { name, description };

  // Additional functionalities for creating, joining, and leaving collaboration rooms
  const handleCreateCollaboration = (e) => {
    e.preventDefault();
    // Create a new collaboration room
    dispatch(
      createCollaboration({
        teamId,
        subteamId,
        userId,
        content,
      })
    )
      .unwrap()
      .then((data) => {
        console.log("Collaboration created successfully.");
        // // Emit the new collaboration details to all clients using Socket.io
        // socket.emit("newRoom", { roomId: data._id, name: data.name });
      })
      .catch((error) => {
        console.log("Failed to create collaboration:", error);
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const content = { name, description };
  //   dispatch(createCollaboration({ teamId, subteamId, userId, content }));
  //   console.log("creating new collaboration...");
  // };

  return (
    <form onSubmit={handleCreateCollaboration}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Collaboration</button>
    </form>
  );
};

export default AddCollaborationForm;
