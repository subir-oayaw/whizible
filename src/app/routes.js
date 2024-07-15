import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import WhizLayout from "./components/WhizLayout/WhizLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("app/views/sessions/JwtRegister")));

// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
const ActionItems = Loadable(lazy(() => import("app/views/Action/ActionItems")));
const CompletedInitiativesList = Loadable(lazy(() => import("app/views/CompletedInitiativesList")));

const EditPage = Loadable(lazy(() => import("app/views/InitiativeManagement/Edit/EditPage")));
const ConvertedInitiatives = Loadable(
  lazy(() => import("app/views/ConvertedInitiatives/ConvertedInitiatives"))
);

const InitiativeStatusManagement = Loadable(
  lazy(() => import("app/views/InitiativeStatusManagement/index"))
);
const UnderConstruction = Loadable(lazy(() => import("app/views/UnderConstruction")));
const Warehouse = Loadable(lazy(() => import("app/views/Warehouse/Warehouse")));
const ExternalAudit = Loadable(lazy(() => import("app/views/ExternalAudit")));
const WithdrawnInitiatives = Loadable(lazy(() => import("app/views/WithdrawnInitiatives")));
const Reallocation = Loadable(lazy(() => import("app/views/Reallocation")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/utils/Analytics")));
const InitiativeManagement = Loadable(
  lazy(() => import("app/views/InitiativeManagement/InitiativeManagement"))
);

const routes = [
  {
    element: (
      <AuthGuard>
        <WhizLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/analytics", element: <Analytics />, auth: authRoles.admin },
      { path: "/dashboard/default", element: <InitiativeManagement />, auth: authRoles.admin },
      { path: "/Warehouse", element: <Warehouse /> },
      { path: "/CompletedInitiativesList", element: <CompletedInitiativesList /> },
      { path: "/ConvertedInitiatives", element: <ConvertedInitiatives /> },
      { path: "/WithdrawnInitiatives", element: <WithdrawnInitiatives /> },
      { path: "/InitiativeStatusManagement", element: <InitiativeStatusManagement /> },

      { path: "/ExternalAudit", element: <ExternalAudit /> },
      { path: "/actions", element: <ActionItems /> },
      {
        path: "/under-construction",
        element: <UnderConstruction />
      },
      { path: "/Reallocation", element: <Reallocation /> },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor }
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/signin", element: <JwtLogin /> },
  { path: "/signup", element: <JwtRegister /> },

  { path: "/EditPage", element: <EditPage initiativesID="adadadasdsadasdsad" /> },

  { path: "/", element: <Navigate to="dashboard/default" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
