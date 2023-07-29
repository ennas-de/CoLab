// frontend/src/features/collaboration/collaboration.actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Async Thunk to create a new collaboration
export const createCollaboration = createAsyncThunk(
  "collaboration/create",
  async (collaborationData) => {
    const response = await API.post("/collaboration", collaborationData);
    return response.data;
  }
);

// Async Thunk to get all collaborations for a specific team and subteam
export const getAllCollaborations = createAsyncThunk(
  "collaboration/getAll",
  async ({ teamId, subteamId }) => {
    const response = await API.get(`/collaboration/${teamId}/${subteamId}`);
    return response.data;
  }
);

// Async Thunk to get a single collaboration by ID
export const getCollaborationById = createAsyncThunk(
  "collaboration/getById",
  async (collaborationId) => {
    const response = await API.get(`/collaboration/${collaborationId}`);
    return response.data;
  }
);

// Async Thunk to update a collaboration by ID
export const updateCollaborationById = createAsyncThunk(
  "collaboration/updateById",
  async ({ collaborationId, content }) => {
    const response = await API.put(`/collaboration/${collaborationId}`, {
      content,
    });
    return response.data;
  }
);

// Async Thunk to delete a collaboration by ID
export const deleteCollaborationById = createAsyncThunk(
  "collaboration/deleteById",
  async (collaborationId) => {
    const response = await API.delete(`/collaboration/${collaborationId}`);
    return response.data;
  }
);
