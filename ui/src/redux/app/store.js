// frontend/src/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
// import userReducer from "../features/user/user.slice";
import collaborationReducer from "../features/collaboration/collaboration.slice";
import subteamReducer from "../features/subteam/subteam.slice";
import teamReducer from "../features/team/team.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // user: userReducer,
    collaboration: collaborationReducer,
    subteam: subteamReducer,
    team: teamReducer,
  },
});

export default store;
