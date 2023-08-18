// frontend/src/contexts/SocketServerUrlContext.js
import React, { createContext, useContext } from "react";

const SocketServerUrlContext = createContext();

export const useSocketServerUrl = () => {
  return useContext(SocketServerUrlContext);
};

export const SocketServerUrlProvider = ({ socketServerUrl, children }) => {
  return (
    <SocketServerUrlContext.Provider value={socketServerUrl}>
      {children}
    </SocketServerUrlContext.Provider>
  );
};
