import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserProfile } from "../../redux/auth/auth.actions";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Redirect to login if not authenticated
  if (!user) {
    history.push("/login");
    return null;
  }

  // You can display user profile information here
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>
        <div className="flex flex-col items-center">
          {/* Display user profile information */}
          <img
            className="w-24 h-24 rounded-full object-cover mb-4"
            src={user.profilePicture}
            alt="Profile"
          />
          <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
          {/* Customize the profile display based on your app's requirements */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
