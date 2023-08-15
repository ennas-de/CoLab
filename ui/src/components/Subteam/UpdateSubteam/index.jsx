import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubteamById,
  updateSubteamById,
} from "../../../redux/features/subteam/subteam.actions";

const UpdateSubteam = ({ subteamId }) => {
  const dispatch = useDispatch();
  const selectedSubteam = useSelector((state) => state.subteam.selectedSubteam);
  const [subteamData, setSubteamData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    // Fetch the selected subteam data when the component mounts
    dispatch(getSubteamById(subteamId));
  }, [dispatch, subteamId]);

  useEffect(() => {
    // Populate the form fields with the selected subteam data
    if (selectedSubteam) {
      setSubteamData({
        name: selectedSubteam.name,
        description: selectedSubteam.description,
      });
    }
  }, [selectedSubteam]);

  const handleChange = (e) => {
    setSubteamData({
      ...subteamData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSubteamById({ ...subteamData, id: subteamId }));
  };

  // Add any specific styles or classes for the UpdateSubteam component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Update Subteam</h1>
      {selectedSubteam ? (
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
              Update Subteam
            </button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UpdateSubteam;
