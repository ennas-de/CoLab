import React from "react";

const TeamDetail = ({ team }) => {
  // Add any specific styles or classes for the Team component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
      <p className="text-gray-600">{team.description}</p>
      {/* Add more details about the team as needed */}
    </div>
  );
};

export default TeamDetail;
