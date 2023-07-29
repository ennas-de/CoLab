import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Async Thunk to create a new team
export const createTeam = createAsyncThunk("team/create", async (teamData) => {
  const response = await API.post("/team", teamData);
  return response.data;
});

// Async Thunk to get all teams
export const getAllTeams = createAsyncThunk("team/getAll", async () => {
  const response = await API.get("/team");
  return response.data;
});

// Async Thunk to get a single team by ID
export const getTeamById = createAsyncThunk("team/getById", async (teamId) => {
  const response = await API.get(`/team/${teamId}`);
  return response.data;
});

// Async Thunk to update a team by ID
export const updateTeamById = createAsyncThunk(
  "team/updateById",
  async (teamData) => {
    const { id, name, description } = teamData;
    const response = await API.put(`/team/${id}`, { name, description });
    return response.data;
  }
);

// Async Thunk to delete a team by ID
export const deleteTeamById = createAsyncThunk(
  "team/deleteById",
  async (teamId) => {
    const response = await API.delete(`/team/${teamId}`);
    return response.data;
  }
);
