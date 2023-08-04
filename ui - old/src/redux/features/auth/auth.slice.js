import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAccessToken,
  getUserProfile,
} from "./auth.actions";

// Initial state for the auth slice
const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get new access token using the refresh token
      .addCase(getAccessToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAccessToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the access token in the API instance or local storage
        // ...
      })
      .addCase(getAccessToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get user profile
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // Rest of the CRUD functionalities follow a similar pattern.
    // ...
  },
});

export default authSlice.reducer;
