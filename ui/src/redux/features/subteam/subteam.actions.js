import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunk to create a new subteam
export const createSubteam = createAsyncThunk(
  "subteam/create",
  async (subteamData, { rejectWithValue }) => {
    try {
      const { teamId, name, description } = subteamData;

      const response = await API.post(`/team/subteams/${teamId}`, {
        name,
        description,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk to get all subteams for a specific team
export const getAllSubteamsByTeam = createAsyncThunk(
  "subteam/getAllByTeam",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/team/subteams/${teamId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk to get a single subteam by ID
export const getSubteamById = createAsyncThunk(
  "subteam/getById",
  async ({ teamId, subteamId }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/team/subteams/${teamId}/${subteamId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk to update a subteam by ID
export const updateSubteamById = createAsyncThunk(
  "subteam/updateById",
  async (subteamData, teamId) => {
    const { subteamId, name, description } = subteamData;
    const response = await API.put(`/team/subteams/${teamId}/${subteamId}`, {
      name,
      description,
    });
    return response.data;
  }
);

// Async Thunk to delete a subteam by ID
export const deleteSubteamById = createAsyncThunk(
  "subteam/deleteById",
  async ({ teamId, subteamId }) => {
    const response = await API.delete(`/team/subteams/${teamId}/${subteamId}`);
    return response.data;
  }
);
