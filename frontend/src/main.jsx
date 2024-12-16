import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import {WebsocketProvider} from "./providers/WebsocketProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <WebsocketProvider>
            <App />
        </WebsocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
