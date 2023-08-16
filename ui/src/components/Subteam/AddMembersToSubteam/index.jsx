import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../redux/api/api";
import { getSubteamById } from "../../../redux/features/subteam/subteam.actions";

const AddMembersToSubteam = ({ subteamId, parentTeamId }) => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.user?.role); // Get the user's role from the authentication state
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

  // Function to handle adding a user to the subteam
  const handleAddUserToSubteam = async (userId) => {
    try {
      // Make API call to add the user to the subteam
      await API.post(`/subteam/${subteamId}/add-member`, { userId });
      // Refresh the subteam data to show the updated members
      dispatch(getSubteamById(subteamId));
    } catch (error) {
      console.error("Error adding user to subteam:", error);
    }
  };

  // Only allow members of the same parent team to add members to the subteam
  // if (userRole !== "tutor") {
  //   return null;
  // }

  // Add any specific styles or classes for the AddMembersToSubteam component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Members to Subteam</h2>
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
                onClick={() => handleAddUserToSubteam(user._id)}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 mt-2">
                Add to Subteam
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddMembersToSubteam;
