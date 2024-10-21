import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorScreen from "./ErrorScreen.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import UserProvider from "./contexts/UserProvider.jsx";
import SearchProvider from "./contexts/SearchProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </ErrorBoundary>
);
