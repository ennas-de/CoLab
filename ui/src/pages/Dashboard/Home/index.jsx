import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../../redux/features/auth/auth.actions";

const Home = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate;
  const user = useSelector((state) => state.auth.user);

  console.log("user -", user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Redirect to login if not authenticated
  // if (!user) {
  //   navigate("/login");
  //   // history.push("/login");
  //   // return null;
  // }

  // You can display user information and other dashboard content here
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome,
          {/* {user.username} */}
        </h1>
        {/* Display user's progress, contributions, rank, etc. */}
        {/* Customize the dashboard content based on your app's requirements */}
      </div>
    </div>
  );
};

export default Home;
