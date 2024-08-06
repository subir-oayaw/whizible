import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  Hidden,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NotificationProvider } from "app/contexts/NotificationContext";
import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { Span } from "app/components/Typography";
import { WhizMenu, WhizSearchBox } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";
import { themeShadows } from "app/components/WhizTheme/themeColors";
import { topBarHeight } from "app/utils/constant";

import {
  Home,
  Menu,
  Person,
  Settings,
  WebAsset,
  MailOutline,
  StarOutline,
  PowerSettingsNew
} from "@mui/icons-material";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease"
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  // Function to handle mailto
  const handleMailClick = () => {
    if (userdata?.emailId) {
      const mailtoLink = `mailto:${userdata.emailId}?subject=Subject%20Here&body=Body%20Content%20Here`;
      window.location.href = mailtoLink;
    }
  };
  const handleHome = () => {
    navigate("/");
  };
  // Determine the label based on the current URL path
  const path = location.pathname.split("/")[1];
  let label;
  switch (path) {
    case "InitiativeManagement":
      label = "Initiative";
      break;
    case "Warehouse":
      label = "Warehouse";
      break;
    case "CompletedInitiativesList":
      label = "Completed Initiatives";
      break;
    case "WithdrawnInitiatives":
      label = "Withdrawn Initiatives";
      break;
    case "Actions":
      label = "Action Items";
      break;
    case "ConvertedInitiatives":
      label = "Converted Initiatives";
      break;
    case "Reallocation":
      label = "Initiative Management";
      break;
    case "ExternalAudit":
      label = "External Audit";
      break;
    case "InitiativeStatusManagement":
      label = "Initiative Status Management";
      break;
    case "InitiativePrioritization":
      label = "Initiative Prioritization";
      break;
    case "InitiativeProgress":
      label = "Initiative Progress";
      break;
    case "InitiativeLinking":
      label = "Initiative Linking";
      break;
    case "ManComPrioritization":
      label = "Man-Com Prioritization";
      break;
    case "currency":
      label = "Currency";
      break;
    default:
      label = "Under Construction";
      break;
  }

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Menu />
          </StyledIconButton>

          <IconBox>
            <StyledIconButton onClick={handleMailClick}>
              <MailOutline />
            </StyledIconButton>

            <StyledIconButton>
              <Home onClick={handleHome} />
            </StyledIconButton>

            {/* <StyledIconButton></StyledIconButton> */}
          </IconBox>
        </Box>

        {/* Center URL display */}
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="body1" color="inherit">
            {label}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          {/* <WhizSearchBox /> */}

          <NotificationProvider>
            <StarOutline />
          </NotificationProvider>
          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>
          {/* <ShoppingCart /> */}

          <WhizMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{userdata?.employeeName}</strong>
                  </Span>
                </Hidden>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar src={user?.avatar} sx={{ cursor: "pointer" }} />
                  <Span sx={{ fontSize: 12, color: "grey" }}>{userdata?.roleName}</Span>
                </Box>
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Home />
                <Span>Home</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Person />
                <Span>Profile</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Settings />
              <Span>Settings</Span>
            </StyledItem>

            <StyledItem onClick={logout}>
              <PowerSettingsNew />
              <Span>Logout</Span>
            </StyledItem>
          </WhizMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
