import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorScreen from "./ErrorScreen.jsx";
import ColorTheme from "./ColorTheme.jsx";
import UserProvider from "./UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <Router>
      <ColorTheme>
        <UserProvider>
          <App />
        </UserProvider>
      </ColorTheme>
    </Router>
  </ErrorBoundary>
);
