import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getAllTeams } from "../../../redux/features/team/team.actions";
import { Link } from "react-router-dom";

const TeamList = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const teams = useSelector((state) => state.team.teams);

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  // Redirect to login if not authenticated
  // You can also add role-based access control here if required
  const user = useSelector((state) => state.auth.user);
  // if (!user) {
  //   navigate("/login");
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Team List</h1>
        <div className="grid grid-cols-3 gap-4">
          {/* Display list of teams */}
          {teams.map((team) => (
            // console.log(team)
            <Link to={`/dashboard/teams/${team._id}`} key={team._id}>
              <div
                key={team._id}
                className="border rounded-lg p-4 shadow-md bg-white">
                <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
                <p className="text-gray-600">{team.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamList;
