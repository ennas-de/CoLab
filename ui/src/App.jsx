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
import SubteamList from "./pages/Dashboard/Subteam";
import SubteamDetail from "./components/Subteam/SubteamDetail";
import AddSubteam from "./components/Subteam/AddSubteam";
import SubteamMembers from "./../../ui - old/src/components/Subteam/SubteamMembers/index";
import UpdateSubteam from "./../../ui - old/src/components/Subteam/UpdateSubteam/index";

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
      {/* teams */}
      <Route path="/dashboard/teams" element={<TeamList />} />
      <Route path="/dashboard/teams/create" element={<AddTeam />} />
      <Route path="/dashboard/teams/:id" element={<TeamDetail />} />
      <Route path="/dashboard/teams/edit/:id" element={<UpdateTeam />} />
      <Route
        path="/dashboard/teams/:id/add-user"
        element={<AddMemberToTeam />}
      />
      {/* subteams  */}
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
        path="/dashboard/teams/:teamId/subteams"
        element={<UpdateSubteam />}
      />
      <Route
        path="/dashboard/teams/:teamId/subteams/members"
        element={<SubteamMembers />}
      />
      <Route
        path="/dashboard/teams/:teamId/subteams/:subteamId/add"
        element={<AddMemberToTeam />}
      />
      {/* <Route
        path="/dashboard/teams/:id/subteams"
        element={<AddMemberToTeam />}
      />
      <Route
        path="/dashboard/teams/:id/subteams"
        element={<AddMemberToTeam />}
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
