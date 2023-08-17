import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubteamById } from "../../../redux/features/subteam/subteam.actions";
// import CollaborationList from "../../../pages/Dashboard/Collaboration/CollaborationListPage";

const SubteamDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { teamId, subteamId } = params;

  // Fetch the selected subteam data on component mount
  useEffect(() => {
    dispatch(getSubteamById({ teamId, subteamId }));
  }, [dispatch, subteamId, teamId]);

  const selectedSubteam = useSelector(
    (state) => state.subteam?.selectedSubteam
  );
  const members = selectedSubteam?.members;

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
          <Link
            to={`/dashboard/teams/${teamId}/subteams/${subteamId}/members/add`}>
            Add Member
          </Link>
          <div>
            <Link
              to={`/dashboard/team/${teamId}/subteam/${subteamId}/collaborations`}>
              Collaborations
            </Link>
          </div>
          <div className="members">
            <h4>Members</h4>
            {members.length >= 1 ? (
              members.map((member) => (
                <div>
                  <p>{member.username}</p>
                  <p>{member.email}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No members yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading subteam details...</p>
      )}
    </div>
  );
};

export default SubteamDetail;
