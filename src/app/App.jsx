import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "@fluentui/react/dist/css/fabric.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WhizTheme } from "./components";
import fetchUserProfile from "../app/hooks/fetchUserProfile";
// ALL CONTEXTS
import { AuthProvider } from "./contexts/JWTAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
import "../fake-db";

import "./app.css";

export default function App() {
  const navigate = useNavigate();
  const content = useRoutes(routes);

  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.action === "tokenReceived") {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
          sessionStorage.setItem("access_token", accessToken);

          try {
            const user = await fetchUserProfile(accessToken);
            console.log("user", JSON.stringify(user));
            sessionStorage.setItem("user", JSON.stringify(user));
          } catch (error) {
            console.error("Failed to fetch user profile", error);
            // Optionally handle the error, e.g., show an error message
          }

          // Redirect the user after user profile is fetched
          navigate("/landingPage");
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  return (
    <SettingsProvider>
      <AuthProvider>
        <WhizTheme>
          <CssBaseline />
          {content}
        </WhizTheme>
      </AuthProvider>
    </SettingsProvider>
  );
}
