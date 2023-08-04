import { createSlice } from "@reduxjs/toolkit";
import {
  createSubteam,
  getAllSubteamsByTeam,
  getSubteamById,
  updateSubteamById,
  deleteSubteamById,
} from "./subteam.actions";

// Initial state for the subteam slice
const initialState = {
  subteams: [],
  selectedSubteam: null,
  status: "idle",
  error: null,
};

const subteamSlice = createSlice({
  name: "subteam",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create a new subteam
      .addCase(createSubteam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSubteam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subteams.push(action.payload);
      })
      .addCase(createSubteam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get all subteams for a specific team
      .addCase(getAllSubteamsByTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSubteamsByTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subteams = action.payload;
      })
      .addCase(getAllSubteamsByTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get a single subteam by ID
      .addCase(getSubteamById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubteamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedSubteam = action.payload;
      })
      .addCase(getSubteamById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update a subteam by ID
      .addCase(updateSubteamById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSubteamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subteams = state.subteams.map((subteam) =>
          subteam._id === action.payload._id ? action.payload : subteam
        );
      })
      .addCase(updateSubteamById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete a subteam by ID
      .addCase(deleteSubteamById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSubteamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subteams = state.subteams.filter(
          (subteam) => subteam._id !== action.payload._id
        );
      })
      .addCase(deleteSubteamById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subteamSlice.reducer;
