// frontend/src/features/collaboration/collaboration.actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunk to create a new collaboration
export const createCollaboration = createAsyncThunk(
  "collaboration/createCollaboration",
  async (teamId, subteamId, collaborationData) => {
    const response = await API.post(
      `/team/subteams/collaborations/${teamId}/${subteamId}`,
      collaborationData
    );
    return response.data;
  }
);

// Async Thunk to get all collaborations for a specific team and subteam
export const getAllCollaborationsByTeamAndSubteam = createAsyncThunk(
  "collaboration/getAllCollaborations",
  async ({ teamId, subteamId }) => {
    const response = await API.get(
      `/team/subteams/collaborations/${teamId}/${subteamId}`
    );
    return response.data;
  }
);

// Async Thunk to get a single collaboration by ID
export const getCollaborationById = createAsyncThunk(
  "collaboration/getCollaborationById",
  async (teamId, subteamId, collaborationId) => {
    const response = await API.get(
      `/team/subteams/collaborations/${teamId}/${subteamId}/${collaborationId}`
    );
    return response.data;
  }
);

// Async Thunk to update a collaboration by ID
export const updateCollaborationById = createAsyncThunk(
  "collaboration/updateCollaborationById",
  async ({ teamId, subteamId, collaborationId, content }) => {
    const response = await API.put(
      `/team/subteams/collaborations/${teamId}/${subteamId}/${collaborationId}`,
      {
        content,
      }
    );
    return response.data;
  }
);

// Async Thunk to delete a collaboration by ID
export const deleteCollaborationById = createAsyncThunk(
  "collaboration/deleteCollaborationById",
  async (teamId, subteamId, collaborationId) => {
    const response = await API.delete(
      `/team/subteams/collaborations/${teamId}/${subteamId}/${collaborationId}`
    );
    return response.data;
  }
);

// Async Thunk to join a collaboration room
export const joinCollaborationRoom = createAsyncThunk(
  "collaboration/joinRoom",
  async ({ teamId, subteamId, collaborationId, roomId, userId }) => {
    const response = await API.post(
      `/team/subteams/collaborations/${teamId}/${subteamId}/${collaborationId}/${roomId}/join`,
      {
        userId,
      }
    );
    return response.data;
  }
);

// Async Thunk to leave a collaboration room
export const leaveCollaborationRoom = createAsyncThunk(
  "collaboration/leaveRoom",
  async ({ teamId, subteamId, collaborationId, roomId, userId }) => {
    const response = await API.post(
      `/team/subteams/collaborations/${teamId}/${subteamId}/${collaborationId}/${roomId}/leave`,
      {
        userId,
      }
    );
    return response.data;
  }
);
