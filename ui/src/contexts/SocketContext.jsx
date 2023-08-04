// frontend/src/contexts/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ socketServerUrl, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection when the component mounts
    const newSocket = io(socketServerUrl);
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [socketServerUrl]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
