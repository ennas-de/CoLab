// frontend/src/features/collaboration/collaboration.actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunk to create a new collaboration
export const createCollaboration = createAsyncThunk(
  "collaboration/createCollaboration",
  async (collaborationData) => {
    const response = await API.post("/collaborations", collaborationData);
    return response.data;
  }
);

// Async Thunk to get all collaborations for a specific team and subteam
export const getAllCollaborationsByTeamAndSubteam = createAsyncThunk(
  "collaboration/getAllCollaborations",
  async ({ teamId, subteamId }) => {
    const response = await API.get(`/collaborations/${teamId}/${subteamId}`);
    return response.data;
  }
);

// Async Thunk to get a single collaboration by ID
export const getCollaborationById = createAsyncThunk(
  "collaboration/getCollaborationById",
  async (collaborationId) => {
    const response = await API.get(
      `/collaborations/${teamId}/${subteamId}/${collaborationId}`
    );
    return response.data;
  }
);

// Async Thunk to update a collaboration by ID
export const updateCollaborationById = createAsyncThunk(
  "collaboration/updateCollaborationById",
  async ({ collaborationId, content }) => {
    const response = await API.put(`/collaborations/${collaborationId}`, {
      content,
    });
    return response.data;
  }
);

// Async Thunk to delete a collaboration by ID
export const deleteCollaborationById = createAsyncThunk(
  "collaboration/deleteCollaborationById",
  async (collaborationId) => {
    const response = await API.delete(`/collaborations/${collaborationId}`);
    return response.data;
  }
);

// Async Thunk to join a collaboration room
export const joinCollaborationRoom = createAsyncThunk(
  "collaboration/joinRoom",
  async ({ roomId, userId }) => {
    const response = await API.post(`/collaborations/${roomId}/join`, {
      userId,
    });
    return response.data;
  }
);

// Async Thunk to leave a collaboration room
export const leaveCollaborationRoom = createAsyncThunk(
  "collaboration/leaveRoom",
  async ({ roomId, userId }) => {
    const response = await API.post(`/collaborations/${roomId}/leave`, {
      userId,
    });
    return response.data;
  }
);
