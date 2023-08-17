// frontend/src/main.js
// import "core-js/features/global-this";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/app/store";
import App from "./App";
import SocketContextProvider from "./contexts/SocketContext";
import "./index.css";

const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SocketContextProvider socketServerUrl={socketServerUrl}>
            <App />
          </SocketContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
