import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Components for different pages
import Landing from "./pages/Landing";
// import HomePage from "./HomePage";
// import ProfilePage from "./ProfilePage";
import { useSelector } from "react-redux";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  console.log(auth);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <Landing />
              </Link>
            </li>
            {/* {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>//</li>
              </>
            ) : null} */}
      {/* </ul> */}
      {/* // </nav> */}

      {/* <Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
  //
          <Route path="/">
            <LandingPage />
          </Route>
        </Route> */}
      {/* </div> */}
    </Routes>
  );
}

export default App;
