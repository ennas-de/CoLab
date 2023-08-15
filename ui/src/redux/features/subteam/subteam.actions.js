import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunk to create a new subteam
export const createSubteam = createAsyncThunk(
  "subteam/create",
  async (subteamData) => {
    const response = await API.post("/subteam", subteamData);
    return response.data;
  }
);

// Async Thunk to get all subteams for a specific team
export const getAllSubteamsByTeam = createAsyncThunk(
  "subteam/getAllByTeam",
  async (teamId) => {
    const response = await API.get(`/${teamId}/subteams`);
    return response.data;
  }
);

// Async Thunk to get a single subteam by ID
export const getSubteamById = createAsyncThunk(
  "subteam/getById",
  async (subteamId, teamId) => {
    const response = await API.get(`/subteams/single/${subteamId}`);
    return response.data;
  }
);

// Async Thunk to update a subteam by ID
export const updateSubteamById = createAsyncThunk(
  "subteam/updateById",
  async (subteamData, teamId) => {
    const { id, name, description } = subteamData;
    const response = await API.put(`/subteams/${id}`, { name, description });
    return response.data;
  }
);

// Async Thunk to delete a subteam by ID
export const deleteSubteamById = createAsyncThunk(
  "subteam/deleteById",
  async (subteamId) => {
    const response = await API.delete(`/subteams/${subteamId}`);
    return response.data;
  }
);
