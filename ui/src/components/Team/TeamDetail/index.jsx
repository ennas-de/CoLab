import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamById } from "../../../redux/features/team/team.actions";
import SubteamList from "../../../pages/Dashboard/Subteam/"; // Import the SubteamList component
import { getAllSubteamsByTeam } from "../../../redux/features/subteam/subteam.actions";

const TeamDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teamId = params.teamId;

  useEffect(() => {
    dispatch(getTeamById(teamId));
  }, [teamId, dispatch]);

  const team = useSelector((state) => state.team.selectedTeam);

  const handleOpenAddSubteam = () => {
    navigate(`/dashboard/teams/${teamId}/subteams/create`);
  };
  const handleOpenAddMemberToTeam = () => {
    navigate(`/dashboard/teams/${teamId}/add-member`);
  };

  // Fetch the selected subteam data on component mount
  useEffect(() => {
    dispatch(getAllSubteamsByTeam(teamId));
  }, [dispatch, teamId]);

  const subteams = useSelector((state) => state.subteam.subteams);

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">{team?.name}</h2>
      <p className="text-gray-600">{team?.description}</p>
      {/* Add Subteam button here */}
      <button onClick={handleOpenAddSubteam}>Add Subteam</button>
      <button onClick={handleOpenAddMemberToTeam}>Add Member</button>
      {/* Display a list of all subteams attached to this individual team */}
      <SubteamList teamId={team?._id} />
    </div>
  );
};

export default TeamDetail;
