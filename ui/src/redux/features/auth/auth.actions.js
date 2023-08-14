import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunk to register a new user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { username, email, role, password } = userData;

      const response = await API.post("/auth/register", {
        username,
        email,
        role,
        password,
      });
      return response.data;
    } catch (error) {
      // console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk to login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { userdetail, password } = userData;

      const response = await API.post("/auth/login", { userdetail, password });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

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
