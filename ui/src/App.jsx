import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Components for different pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Dashboard/Home";
import TeamList from "./pages/Dashboard/Team";
import AddTeam from "./components/Team/AddTeam";
import TeamDetail from "./components/Team/TeamDetail";
import UpdateTeam from "./components/Team/UpdateTeam";
import AddMemberToTeam from "./components/Team/AddMemberToTeam";
import AddSubteam from "./components/Subteam/AddSubteam";
import SubteamMembers from "./components/Subteam/SubteamMembers";
import UpdateSubteam from "./components/Subteam/UpdateSubteam";
import AddMembersToSubteam from "./components/Subteam/AddMembersToSubteam";
import SubteamDetail from "./components/Subteam/SubteamDetail";
import CollaborationListPage from "./pages/Dashboard/Collaboration/CollaborationListPage";
import AddCollaborationForm from "./components/Collaboration/CreateNewCollaboration";
import CollaborationRoom from "./components/Collaboration/CollaborationRoom";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { auth } = useSelector((state) => state);

  const { isAuthenticated } = auth;

  // if (auth?.user) setIsLoggedIn(true);

  // console.log("auth -", auth);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* <Route path="/dashboard/*" element={<Home />}> */}
      <Route path="/dashboard" element={<Home />} />
      {/* Teams route */}
      <Route path="/dashboard/teams" element={<TeamList />} />
      <Route path="/dashboard/teams/create" element={<AddTeam />} />
      <Route path="/dashboard/teams/:teamId" element={<TeamDetail />} />
      <Route path="/dashboard/teams/edit/:teamIid" element={<UpdateTeam />} />
      <Route
        path="/dashboard/teams/:teamId/add-member"
        element={<AddMemberToTeam />}
      />
      {/* Subteams routes */}
      {/* <Route
        path="/dashboard/teams/:teamId/subteams"
        element={<SubteamList />}
      /> */}
      <Route
        path="/dashboard/teams/:teamId/subteams/:subteamId"
        element={<SubteamDetail />}
      />
      <Route
        path="/dashboard/teams/:teamId/subteams/create"
        element={<AddSubteam />}
      />
      <Route
        path="/dashboard/teams/:teamId/subteams/edit"
        element={<UpdateSubteam />}
      />
      <Route
        path="/dashboard/teams/:teamId/subteams/:subteamId/members"
        element={<SubteamMembers />}
      />
      <Route
        path="/dashboard/teams/:teamId/subteams/:subteamId/members/add"
        element={<AddMembersToSubteam />}
      />
      {/* Collaborations route */}
      <Route
        path="/dashboard/teams/:teamId/subteams/:subteamId/collaborations/"
        element={<CollaborationListPage />}
      />
      <Route
        path="/dashboard/teams/:teamId/subteams/:subteamId/collaborations/create"
        element={<AddCollaborationForm />}
      />
      <Route
        path="/dashboard/teams/:teamId/subteams/:subteamId/collaborations/:collaborationId"
        element={<CollaborationRoom />}
      />
      {/* <Route
        path="/dashboard/team/:teamId/subteam/:subteamId/collaborations/create"
        element={<CollaborationRoom />}
      /> */}
      {/* <Route
        path="/dashboard/team/:teamId/subteam/:subteamId/collaborations/:collaborationId"
        element={<CollaborationRoom />}
      /> */}
      {/* <Route
        path="/dashboard/team/:teamId/subteam/:subteamId/collaboration/:collaborationId"
        element={<CollaborationDetailPage />}
      /> */}
      {/* <Route
        path="/dashboard/team/:teamId/subteam/:subteamId/collaboration/:collaborationId"
        element={<CollaborationEditorPage />}
      /> */}

      {/* </Route> */}

      {/* <Route path="/dashboard" element={isLoggedIn ? <Home /> : <Login />} /> */}
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <Landing />
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>//</li>
              </>
            ) : null}
          </ul>
        </nav>
              /*
         <Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
  //
          <Route path="/">
            <LandingPage />
          </Route>
        </Route> 
        
      </div> */}
    </Routes>
  );
}

export default App;
