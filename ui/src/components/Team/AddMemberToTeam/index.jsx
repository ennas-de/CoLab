import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getAllSubteamsByTeam } from "../../redux/subteam/subteam.actions";
import API from "../../api";

const AddMemberToTeam = () => {
  const dispatch = useDispatch();
  const subteams = useSelector((state) => state.subteam.subteams);
  const userRole = useSelector((state) => state.auth.user?.role); // Get the user's role from the authentication state
  const { teamId } = useParams(); // Get the teamId from the URL params

  useEffect(() => {
    // Fetch all subteams for the specified team when the component mounts
    dispatch(getAllSubteamsByTeam(teamId));
  }, [dispatch, teamId]);

  // Check if the user is a tutor, if not, redirect to the home page
  if (userRole !== "tutor") {
    return <Redirect to="/home" />;
  }

  // Add any specific styles or classes for the AddMemberToTeam component here
  // You can use Tailwind CSS classes or custom styles

  // State for the search input and search results
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Function to handle user search
  const handleUserSearch = async () => {
    try {
      // Make API call to search for users by username or email
      const response = await API.get(`/users/search?query=${searchInput}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  // Function to handle adding a user to the team
  const handleAddUserToTeam = async (userId) => {
    try {
      // Make API call to add the user to the team
      await API.post(`/team/${teamId}/add-member`, { userId });
      // Refresh the list of subteams to show the updated members
      dispatch(getAllSubteamsByTeam(teamId));
    } catch (error) {
      console.error("Error adding user to team:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add Member To Team</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="px-4 py-2 border rounded-lg mr-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleUserSearch}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
          Search
        </button>
      </div>
      {searchResults.length === 0 ? (
        <p>No matching users found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {searchResults.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg p-4 shadow-md bg-white">
              <h2 className="text-lg font-semibold mb-2">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
              <button
                type="button"
                onClick={() => handleAddUserToTeam(user._id)}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 mt-2">
                Add to Team
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddMemberToTeam;
