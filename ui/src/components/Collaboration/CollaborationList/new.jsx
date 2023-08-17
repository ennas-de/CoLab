// Import statements

const CollaborationList = ({ teamId, subteamId }) => {
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
      <h3>Collaboration List</h3>
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
    </div>
  );
};

export default CollaborationList;
