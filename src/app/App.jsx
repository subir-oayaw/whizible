import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { WhizTheme } from "./components";
// ALL CONTEXTS
import { AuthProvider } from "./contexts/JWTAuthContext";
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
import "../fake-db";

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
