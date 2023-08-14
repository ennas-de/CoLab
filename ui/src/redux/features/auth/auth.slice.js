import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAccessToken,
  getUserProfile,
} from "./auth.actions";
// import { PURGE } from "redux-persist";

// Initial state for the auth slice
const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  message: "",
};

// Load the persisted state from local storage if available
const persistedState = JSON.parse(localStorage.getItem("persist: root"));
const updatedInitialState = {
  ...initialState,
  ...persistedState?.auth, // Use persisted state if available
};

const authSlice = createSlice({
  name: "auth",
  initialState: updatedInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.message = action.payload;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.message = "Login Successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);

        state.status = "failed";
        state.message = action.payload;
      })
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("accessToken");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
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
        state.message = action.payload;
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
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
