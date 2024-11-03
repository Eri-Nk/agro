import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorScreen from "./ErrorScreen.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import UserProvider from "./contexts/UserProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </ErrorBoundary>
);
