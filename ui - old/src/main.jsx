// frontend/src/main.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import App from "./App";
import SocketContextProvider from "./contexts/SocketContext";
import "./index.css";

const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketContextProvider socketServerUrl={socketServerUrl}>
          <App />
        </SocketContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
