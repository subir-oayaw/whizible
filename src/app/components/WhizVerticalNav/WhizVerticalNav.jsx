import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css"; // Ensure this path is correct
import { app } from "@microsoft/teams-js";
import EDashboardIcon from "../../../assets/img/e-dashboard.svg";
import InitiativeDashboardIcon from "../../../assets/img/initiative-management-icn.svg";
import BusinessUserTrackingIcon from "../../../assets/img/program.svg";
import Project from "../../../assets/img/project.svg";
import InitiativeTracking from "../../../assets/img/initiative-tracking.svg";
import Reports from "../../../assets/img/reports.svg";
import Favorite from "../../../assets/img/favorite.svg";
import Configuration from "../../../assets/img/configuration.svg";
import Security from "../../../assets/img/reports.svg";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import "./SidebarComponent.css"; // Import the CSS file

const iconMappings = {
  Dashboard: EDashboardIcon,
  "Initiative Management": InitiativeDashboardIcon,
  Program: BusinessUserTrackingIcon,
  Projects: Project,
  "Initiative Tracking": InitiativeTracking,
  Reports: Reports,
  Favorite: Favorite,
  Configuration: Configuration,
  Security: Security
};

const WhizVerticalNav = ({ items, isHovered, mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(isHovered !== "full");
  const [theme, setTheme] = useState({
    background: "rgba(241, 241, 241, 255)",
    color: "black" // Default text color for light mode
  });

  useEffect(() => {
    console.log("black", app);
    if (app) {
      app.initialize(() => {
        app.getContext((context) => {
          if (context.theme === "dark") {
            setTheme({
              background: "black",
              color: "white" // Text color for dark mode
            });
          } else {
            setTheme({
              background: "rgba(241, 241, 241, 255)",
              color: "black" // Text color for light mode
            });
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isHovered || mode === "full") setIsCollapsed(false);
    else setIsCollapsed(true);
  }, [isHovered]);

  const handleClick = (path, tagDescription) => {
    setSelectedItem(path);

    switch (tagDescription) {
      case "Initiative":
        navigate("/dashboard/default");
        break;
      case "Warehouse":
        navigate("/Warehouse");
        break;
      case "Completed Initiatives":
        navigate("/CompletedInitiativesList");
        break;
      case "Withdrawn Initiatives":
        navigate("/WithdrawnInitiatives");
        break;
      case "Action Items":
        navigate("/Actions");
        break;
      case "Converted Initiatives":
        navigate("/ConvertedInitiatives");
        break;
      case "Initiative Management":
        navigate("/Reallocation");
        break;
      case "External Audit":
        navigate("/ExternalAudit");
        break;
      case "Initiative Status Management":
        navigate("/InitiativeStatusManagement");
        break;
      case "Initiative Prioritization":
        navigate("/InitiativePrioritization");
        break;
      case "Initiative Progress":
        navigate("/InitiativeProgress");
        break;
      case "Initiative Linking":
        navigate("/InitiativeLinking");
        break;
      case "Man-Com Prioritization":
        navigate("/ManComPrioritization");
        break;
      case "Currency":
        navigate("/currency");
        break;
      default:
        navigate("/under-construction");
        break;
    }
  };

  const renderMenuItems = (data) => {
    return data.map((item, index) => {
      const isActive = selectedItem === item.path;

      const childIcon = <PanoramaFishEyeIcon style={{ fontSize: 10 }} />;

      if (item.isParent) {
        return (
          <SubMenu
            key={index}
            title={item.tagName}
            icon={
              iconMappings[item.tagName] ? (
                <img src={iconMappings[item.tagName]} alt={item.tagName} className="sidebar-icon" />
              ) : (
                <PanoramaFishEyeIcon style={{ color: "white", fontSize: 16 }} />
              )
            }
            style={{ color: theme.color }} // Apply text color here
          >
            {item.children && renderMenuItems(item.children)}
          </SubMenu>
        );
      }

      return (
        <MenuItem
          key={index}
          icon={
            iconMappings[item.tagName] ? (
              <img src={iconMappings[item.tagName]} alt={item.tagName} className="sidebar-icon" />
            ) : (
              childIcon
            )
          }
          active={isActive}
          className={isActive ? "active-menu-item" : ""}
          onClick={() => handleClick(item.path, item.tagDescription)}
          style={{ color: theme.color }} // Apply text color here
        >
          {item.tagName}
          {item.badge && <span className="badge">{item.badge.value}</span>}
        </MenuItem>
      );
    });
  };

  console.log("backgroundColor", theme);
  return (
    <ProSidebar
      collapsed={isCollapsed}
      style={{ backgroundColor: theme.background, color: theme.color }} // Set dynamic background and text color
    >
      <Menu>{renderMenuItems(items)}</Menu>
    </ProSidebar>
  );
};

export default WhizVerticalNav;
