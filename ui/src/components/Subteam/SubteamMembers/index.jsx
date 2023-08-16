import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubteamById } from "../../../redux/features/subteam/subteam.actions";
import AddMembersToSubteam from "../AddMembersToSubteam";
// import AddMembersToSubteam from "./AddMembersToSubteam";

const SubteamMembers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { teamId, subteamId } = params; // Get the teamId and the subteamId from the params

  useEffect(() => {
    // Fetch the selected subteam data on component mount
    dispatch(getSubteamById({ teamId, subteamId }));
  }, [dispatch, subteamId, teamId]);

  const selectedSubteam = useSelector((state) => state.subteam.selectedSubteam);

  const handleOpenAddMember = () => {
    navigate(`/dashboard/teams/${teamId}/subteams/${subteamId}/members/add`);
  };

  // Add any specific styles or classes for the SubteamMembers component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div>
      {selectedSubteam ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">
            {selectedSubteam.name}
          </h1>
          <p className="text-gray-600">{selectedSubteam.description}</p>
          <h2 className="text-lg font-semibold mt-8 mb-4">Members</h2>
          <div>
            <button onClick={handleOpenAddMember}>Add member</button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {selectedSubteam.members.map((member) => (
              <div
                key={member._id}
                className="border rounded-lg p-4 shadow-md bg-white">
                <h2 className="text-lg font-semibold mb-2">
                  {member.username}
                </h2>
                <p className="text-gray-600">{member.email}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            {/* Render the AddMembersToSubteam component and pass the required props */}
            <AddMembersToSubteam
              subteamId={subteamId}
              parentTeamId={selectedSubteam.parentTeamId}
            />
          </div>
        </>
      ) : (
        <p>Loading subteam members...</p>
      )}
    </div>
  );
};

export default SubteamMembers;
