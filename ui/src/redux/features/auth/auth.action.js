import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Async Thunk to register a new user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    const response = await API.post("/auth/register", userData);
    return response.data;
  }
);

// Async Thunk to login user
export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
});

// Async Thunk to logout user
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await API.post("/auth/logout");
  return response.data;
});

// Async Thunk to get new access token using the refresh token
export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async () => {
    const response = await API.get("/auth/token");
    return response.data;
  }
);

// Async Thunk to get user profile
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async () => {
    const response = await API.get("/auth/profile");
    return response.data;
  }
);

// Rest of the CRUD functionalities follow a similar pattern.
// ...
