import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubteamById } from "../../../redux/features/subteam/subteam.actions";

const SubteamDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedSubteam = useSelector((state) => state.subteam.selectedSubteam);

  // Fetch the selected subteam data on component mount
  useEffect(() => {
    dispatch(getSubteamById(id));
  }, [dispatch, id]);

  // Add any specific styles or classes for the Subteam component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div>
      {selectedSubteam ? (
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            {selectedSubteam.name}
          </h1>
          <p className="text-gray-600">{selectedSubteam.description}</p>
        </div>
      ) : (
        <p>Loading subteam details...</p>
      )}
    </div>
  );
};

export default SubteamDetail;
