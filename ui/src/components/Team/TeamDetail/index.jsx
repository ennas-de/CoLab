import React from "react";
import SubteamList from "../../../pages/dashboard/Subteam"; // Import the SubteamList component

const TeamDetail = ({ team }) => {
  // Add any specific styles or classes for the Team component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
      <p className="text-gray-600">{team.description}</p>
      {/* Display a list of all subteams attached to this individual team */}
      <SubteamList />
      {/* Add more details about the team as needed */}
    </div>
  );
};

export default TeamDetail;
