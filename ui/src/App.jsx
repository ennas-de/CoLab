import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Components for different pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Dashboard/Home";
import TeamList from "./pages/Dashboard/Team";

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
      <Route path="/dashboard/team" element={<TeamList />} />
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
