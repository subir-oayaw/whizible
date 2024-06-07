import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonBase, Icon, Box, styled } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import EDashboardIcon from "../../../assets/img/e-dashboard.svg";
import InitiativeDashboardIcon from "../../../assets/img/initiative-management-icn.svg";
import BusinessUserTrackingIcon from "../../../assets/img/program.svg";
import Project from "../../../assets/img/project.svg";
import InitiativeTracking from "../../../assets/img/initiative-tracking.svg";
import Reports from "../../../assets/img/reports.svg";
import Favorite from "../../../assets/img/favorite.svg";
import { initializeIcons } from "@fluentui/react";

// STYLED COMPONENTS
const NavExpandRoot = styled("div")(({ theme }) => ({
  "& .expandIcon": {
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)"
  },
  "& .collapseIcon": {
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)"
  },
  "& .expansion-panel": {
    overflow: "hidden",
    transition: "max-height 0.3s cubic-bezier(0, 0, 0.2, 1)"
  },
  "& .highlight": {
    background: theme.palette.primary.main
  },
  "&.compactNavItem": {
    width: 44,
    overflow: "hidden",
    justifyContent: "center !important",
    "& .itemText": { display: "none" },
    "& .itemIcon": { display: "none" }
  }
}));

const BaseButton = styled(ButtonBase)(({ theme }) => ({
  height: 44,
  width: "100%",
  whiteSpace: "pre",
  overflow: "hidden",
  paddingRight: "16px",
  borderRadius: "4px",
  marginBottom: "8px",
  display: "flex",
  justifyContent: "space-between !important",
  color: theme.palette.text.primary,
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
  "& .icon": {
    width: 36,
    fontSize: "18px",
    paddingLeft: "16px",
    paddingRight: "16px",
    verticalAlign: "middle"
  }
}));

const BulletIcon = styled("div")(({ theme }) => ({
  width: 4,
  height: 4,
  color: "inherit",
  overflow: "hidden",
  marginLeft: "20px",
  marginRight: "8px",
  borderRadius: "300px !important",
  // background: theme.palette.primary.contrastText,
  background: theme.palette.text.primary
}));

const ItemText = styled("span")(() => ({
  fontSize: "0.875rem",
  paddingLeft: "0.8rem",
  verticalAlign: "middle"
}));

const BadgeValue = styled("div")(() => ({
  padding: "1px 4px",
  overflow: "hidden",
  borderRadius: "300px"
}));
const iconMappings = {
  "e-Dashboard": "../../../assets/img/e-dashboard.svg",
  "Initiative Management": "../../../assets/img/initiative-management.svg",
  Program: "../../../assets/img/program.svg",
  Project: "../../../assets/img/project.svg",
  "Initiative Tracking": "../../../assets/img/initiative-tracking.svg",
  Reports: "../../../assets/img/reports.svg",
  Favorite: "../../../assets/img/favorite.svg"
  // Add mappings for other icons as needed
};
export default function WhizVerticalNavExpansionPanel({ item, children, mode }) {
  const [collapsed, setCollapsed] = useState(true);
  const elementRef = useRef(null);
  const componentHeight = useRef(0);
  const { pathname } = useLocation();
  const { name, icon, iconText, badge } = item;

  const handleClick = () => {
    componentHeight.current = 0;
    calculateHeight(elementRef.current);
    setCollapsed(!collapsed);
  };

  const calculateHeight = useCallback((node) => {
    if (node.name !== "child") {
      for (let child of node.children) {
        calculateHeight(child);
      }
    }

    if (node.name === "child") componentHeight.current += node.scrollHeight;
    else componentHeight.current += 44; //here 44 is node height
    return;
  }, []);

  useEffect(() => {
    if (!elementRef) return;

    calculateHeight(elementRef.current);

    // OPEN DROPDOWN IF CHILD IS ACTIVE
    for (let child of elementRef.current.children) {
      if (child.getAttribute("href") === pathname) {
        setCollapsed(false);
      }
    }
  }, [pathname, calculateHeight]);
  const getIconPath = (name) => {
    switch (name) {
      case "e-Dashboard":
        return EDashboardIcon;
      case "Initiative Management":
        return InitiativeDashboardIcon;
      case "Program":
        return BusinessUserTrackingIcon;
      case "Project":
        return Project;
      case "Initiative Tracking":
        return InitiativeTracking;
      case "Reports":
        return Reports;
      case "Favorite":
        return Favorite;
      default:
        return null;
    }
  };

  return (
    <NavExpandRoot>
      <BaseButton
        className={clsx({
          "has-submenu compactNavItem": true,
          compactNavItem: mode === "compact",
          open: !collapsed
        })}
        onClick={handleClick}
      >
        <Box display="flex" alignItems="center">
          {icon && <img src={getIconPath(name)} alt={name} style={{ fill: "white" }} />}
          {iconText && <BulletIcon />}
          <ItemText className="sidenavHoverShow">{name}</ItemText>
          {/* New Icon */}
        </Box>

        {badge && <BadgeValue className="sidenavHoverShow itemIcon">{badge.value}</BadgeValue>}

        <div
          className={clsx({
            sidenavHoverShow: true,
            collapseIcon: collapsed,
            expandIcon: !collapsed
          })}
        >
          <ChevronRight fontSize="small" sx={{ verticalAlign: "middle" }} />
        </div>
      </BaseButton>

      <div
        ref={elementRef}
        className="expansion-panel submenu"
        style={collapsed ? { maxHeight: "0px" } : { maxHeight: componentHeight.current + "px" }}
      >
        {children}
      </div>
    </NavExpandRoot>
  );
}
