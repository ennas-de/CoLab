// frontend/src/features/collaboration/components/CollaborationList.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSocket } from "./../../../contexts/SocketContext";
import { getAllCollaborationsByTeamAndSubteam } from "../../../redux/features/collaboration/collaboration.actions";

const CollaborationList = ({ teamId, subteamId }) => {
  //, socketServerUrl
  const dispatch = useDispatch();
  const socket = useSocket(); // Use the useSocket hook to get the socket instance
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    // Fetch all collaborations for the current team and subteam
    dispatch(getAllCollaborationsByTeamAndSubteam({ teamId, subteamId }))
      .unwrap()
      .then((data) => {
        setCollaborations(data);
      })
      .catch((error) => {
        console.log("Failed to fetch collaborations:", error);
      });
  }, [teamId, subteamId, dispatch]);

  return (
    <div>
      {collaborations.length > 1 ? (
        <ul>
          {collaborations.map((collaboration) => (
            <li key={collaboration._id}>
              <Link
                to={`/team/${teamId}/subteam/${subteamId}/collaboration/${collaboration._id}`}>
                {collaboration.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No collaborations yet.</p>
      )}
    </div>
  );
};

export default CollaborationList;
