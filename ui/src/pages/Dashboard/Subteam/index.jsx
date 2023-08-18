import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import { getAllSubteamsByTeam } from "../../../redux/features/subteam/subteam.actions";
import SubteamDetail from "../../../components/Subteam/SubteamDetail";
import { Link } from "react-router-dom";

const SubteamList = ({ teamId }) => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Fetch all subteams for the specified team when the component mounts
    dispatch(getAllSubteamsByTeam(teamId));
  }, [dispatch, teamId]);

  const subteams = useSelector((state) => state.subteam.subteams);

  // Redirect to login page if user is not authenticated
  // if (!isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

  // Add any specific styles or classes for the SubteamList component here
  // You can use Tailwind CSS classes or custom styles
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Subteam List</h1>
      {subteams.length === 0 ? (
        <p>No subteams found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {subteams &&
            subteams.map((subteam) => (
              <Link
                to={`/dashboard/teams/${teamId}/subteams/${subteam._id}`}
                key={subteam._id}>
                <div>
                  <h4>{subteam.name}</h4>
                  <p>{subteam.description}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default SubteamList;
