import { createSlice } from "@reduxjs/toolkit";
import {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
} from "./collaboration.actions";

// Initial state for the collaboration slice
const initialState = {
  collaborations: [],
  selectedCollaboration: null,
  status: "idle",
  error: null,
};

const collaborationSlice = createSlice({
  name: "collaboration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create a new collaboration
      .addCase(createCollaboration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCollaboration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collaborations.push(action.payload);
      })
      .addCase(createCollaboration.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get all collaborations for a specific team and subteam
      .addCase(getAllCollaborationsByTeamAndSubteam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllCollaborationsByTeamAndSubteam.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.collaborations = action.payload;
        }
      )
      .addCase(
        getAllCollaborationsByTeamAndSubteam.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      // Get a single collaboration by ID
      .addCase(getCollaborationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCollaborationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCollaboration = action.payload;
      })
      .addCase(getCollaborationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update a collaboration by ID
      .addCase(updateCollaborationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCollaborationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collaborations = state.collaborations.map((collaboration) =>
          collaboration._id === action.payload._id
            ? action.payload
            : collaboration
        );
      })
      .addCase(updateCollaborationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete a collaboration by ID
      .addCase(deleteCollaborationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCollaborationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collaborations = state.collaborations.filter(
          (collaboration) => collaboration._id !== action.payload._id
        );
      })
      .addCase(deleteCollaborationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default collaborationSlice.reducer;
