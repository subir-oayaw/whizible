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
const ProfilePage = Loadable(lazy(() => import("app/views/Profile/Profile")));
const InitiativeStatusManagement = Loadable(
  lazy(() => import("app/views/InitiativeStatusManagement/index"))
);
const LoadingPage = Loadable(lazy(() => import("../app/views/LoadingPage")));
const UnderConstruction = Loadable(lazy(() => import("app/views/UnderConstruction")));
const Warehouse = Loadable(lazy(() => import("app/views/Warehouse/Warehouse")));
const ExternalAudit = Loadable(lazy(() => import("app/views/ExternalAudit")));
const WithdrawnInitiatives = Loadable(lazy(() => import("app/views/WithdrawnInitiatives")));
const Reallocation = Loadable(lazy(() => import("app/views/Reallocation")));
const Currency = Loadable(lazy(() => import("app/views/Currency")));
const Skills = Loadable(lazy(() => import("app/views/Skills/SkillsInfo")));
const Country = Loadable(lazy(() => import("app/views/Country/CountryInformation")));
const AuditTypeDefinition = Loadable(
  lazy(() => import("app/views/AuditTypeDefinition/AuditTypeDefiInfo"))
);
const DocumentsCategory = Loadable(lazy(() => import("app/views/DocumentsCategory/DocCategory")));
const DepartmentMaster = Loadable(
  lazy(() => import("app/views/DepartmentMaster/DepartmentMaster"))
);

// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/utils/Analytics")));
const InitiativePrioritization = Loadable(lazy(() => import("app/views/InitiativePrioritization")));
const InitiativeManagement = Loadable(
  lazy(() => import("app/views/InitiativeManagement/InitiativeManagement"))
);
const InitiativeConversion = Loadable(lazy(() => import("app/views/InitiativeConversion")));
const InitiativeProgress = Loadable(lazy(() => import("app/views/InitiativeProgress")));
const ManComPrioritization = Loadable(lazy(() => import("app/views/ManComPrioritization")));
const InitiativeLinking = Loadable(lazy(() => import("app/views/InitiativeLinking")));
const Program = Loadable(lazy(() => import("app/views/Program")));
const ProjectMain = Loadable(lazy(() => import("app/views/ProjectMain")));
const LandingPage = Loadable(lazy(() => import("app/views/LandingPage")));

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
      { path: "/InitiativeManagement", element: <InitiativeManagement />, auth: authRoles.admin },
      { path: "/Warehouse", element: <Warehouse /> },
      { path: "/CompletedInitiativesList", element: <CompletedInitiativesList /> },
      { path: "/ConvertedInitiatives", element: <ConvertedInitiatives /> },
      { path: "/WithdrawnInitiatives", element: <WithdrawnInitiatives /> },
      { path: "/InitiativeStatusManagement", element: <InitiativeStatusManagement /> },
      { path: "/page-layouts/user-profile", element: <ProfilePage /> },
      { path: "/InitiativePrioritization", element: <InitiativePrioritization /> },
      { path: "/ExternalAudit", element: <ExternalAudit /> },
      { path: "/actions", element: <ActionItems /> },
      {
        path: "/under-construction",
        element: <UnderConstruction />
      },
      { path: "/InitiativeProgress", element: <InitiativeProgress /> },
      { path: "/InitiativeConversion", element: <InitiativeConversion /> },
      { path: "/ManComPrioritization", element: <ManComPrioritization /> },
      { path: "/InitiativeLinking", element: <InitiativeLinking /> },
      { path: "/Program", element: <Program /> },
      { path: "/Reallocation", element: <Reallocation /> },
      { path: "/ProjectMain", element: <ProjectMain /> },

      { path: "/edit/:id", element: <EditPage /> },
      { path: "/Currency", element: <Currency /> },
      { path: "/Skills", element: <Skills /> },
      { path: "/Country", element: <Country /> },
      { path: "/AuditTypeDefinition", element: <AuditTypeDefinition /> },
      { path: "/DocumentsCategory", element: <DocumentsCategory /> },
      { path: "/DepartmentMaster", element: <DepartmentMaster /> },
      { path: "/", element: <LandingPage /> },
      { path: "/landingPage", element: <LandingPage /> },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor }
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/signin", element: <JwtLogin /> },
  { path: "/signup", element: <JwtRegister /> },
  { path: "/LoadingPage", element: <LoadingPage /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
