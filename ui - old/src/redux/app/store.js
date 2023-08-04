// frontend/src/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import collaborationReducer from "./features/collaboration/collaborationSlice";
import subteamReducer from "./features/subteam/subteamSlice";
import teamReducer from "./features/team/teamSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    collaboration: collaborationReducer,
    subteam: subteamReducer,
    team: teamReducer,
  },
});

export default store;
