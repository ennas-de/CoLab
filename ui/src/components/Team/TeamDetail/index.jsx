import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeamById } from "../../../redux/features/team/team.actions";
import SubteamList from "../../../pages/Dashboard/Subteam/"; // Import the SubteamList component

const TeamDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const team = useSelector((state) => state.team.selectedTeam);

  const teamId = params.id;

  useEffect(() => {
    dispatch(getTeamById(teamId));
  }, [teamId, dispatch]);

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">{team?.name}</h2>
      <p className="text-gray-600">{team?.description}</p>
      {/* Display a list of all subteams attached to this individual team */}
      <SubteamList teamId={team?._id} />
      {/* Add Subteam button here */}
      <button>Add Subteam</button>
      {/* Add more details about the team as needed */}
    </div>
  );
};

export default TeamDetail;
