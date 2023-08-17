import { createSlice } from "@reduxjs/toolkit";
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
} from "./team.actions";

// Initial state for the team slice
const initialState = {
  teams: [],
  selectedTeam: null,
  status: "idle",
  message: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create a new team
      .addCase(createTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      // Get all teams
      .addCase(getAllTeams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = action.payload;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      // Get a single team by ID
      .addCase(getTeamById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTeamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedTeam = action.payload;
      })
      .addCase(getTeamById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      // Update a team by ID
      .addCase(updateTeamById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = state.teams.map((team) =>
          team._id === action.payload._id ? action.payload : team
        );
      })
      .addCase(updateTeamById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      // Delete a team by ID
      .addCase(deleteTeamById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = state.teams.filter(
          (team) => team._id !== action.payload._id
        );
      })
      .addCase(deleteTeamById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default teamSlice.reducer;
