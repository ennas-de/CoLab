import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSubteam } from "../../../redux/features/subteam/subteam.actions";
import { useParams } from "react-router-dom";

const AddSubteam = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const teamId = params.teamId;

  const [subteamData, setSubteamData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setSubteamData({
      ...subteamData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubteam({ ...subteamData, teamId }));
    // Clear form fields after successful submission (you can handle this according to your preference)
    setSubteamData({
      name: "",
      description: "",
    });
  };

  // Add any specific styles or classes for the AddSubteam component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add New Subteam</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={subteamData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={subteamData.description}
            onChange={handleChange}
            className="w-full h-20 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add Subteam
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubteam;
