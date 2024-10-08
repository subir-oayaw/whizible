import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "@fluentui/react/dist/css/fabric.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WhizTheme } from "./components";

// ALL CONTEXTS
import { AuthProvider } from "./contexts/JWTAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
import "../fake-db";

import "./app.css";

export default function App() {
  const content = useRoutes(routes);

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
