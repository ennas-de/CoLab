import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTeam } from "../../redux/team/team.actions";

const AddTeam = () => {
  const dispatch = useDispatch();
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle team creation
  const handleCreateTeam = (e) => {
    e.preventDefault();
    dispatch(createTeam(teamData));
    // Reset form data after creating the team
    setTeamData({ name: "", description: "" });
  };

  // Add any specific styles or classes for the AddTeam component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add New Team</h1>
      <form className="space-y-4" onSubmit={handleCreateTeam}>
        <div>
          <label htmlFor="name" className="block text-gray-600">
            Team Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={teamData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={teamData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border resize-none focus:outline-none focus:border-blue-500"
            rows="4"
            required></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
            Create Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeam;
