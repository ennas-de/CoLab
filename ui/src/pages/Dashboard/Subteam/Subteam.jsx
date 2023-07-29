import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getAllSubteamsByTeam } from "../../redux/subteam/subteam.actions";
import SubteamDetail from "../../components/Subteam/SubteamDetail";

const SubteamList = () => {
  const dispatch = useDispatch();
  const subteams = useSelector((state) => state.subteam.subteams);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { teamId } = useParams(); // Get the teamId from the URL params

  useEffect(() => {
    // Fetch all subteams for the specified team when the component mounts
    dispatch(getAllSubteamsByTeam(teamId));
  }, [dispatch, teamId]);

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // Add any specific styles or classes for the SubteamList component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Subteam List</h1>
      {subteams.length === 0 ? (
        <p>No subteams found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {subteams.map((subteam) => (
            <SubteamDetail key={subteam._id} subteam={subteam} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubteamList;
