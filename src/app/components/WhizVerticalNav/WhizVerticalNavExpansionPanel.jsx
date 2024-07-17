import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonBase, Box, styled } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import EDashboardIcon from "../../../assets/img/e-dashboard.svg";
import InitiativeDashboardIcon from "../../../assets/img/initiative-management-icn.svg";
import BusinessUserTrackingIcon from "../../../assets/img/program.svg";
import Project from "../../../assets/img/project.svg";
import InitiativeTracking from "../../../assets/img/initiative-tracking.svg";
import Reports from "../../../assets/img/reports.svg";
import Favorite from "../../../assets/img/favorite.svg";

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
    transition: "max-height 0.3s cubic-bezier(0, 0, 0.2, 1)",
    marginLeft: "0px" // Add margin-left of 15px
    // Add other styles as needed
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
  background: theme.palette.text.primary
}));

const ItemText = styled("span")(() => ({
  fontSize: "12px", // Font size set to 12px
  paddingLeft: "0.8rem",
  verticalAlign: "middle",
  color: "#e7e7e7"
}));

const BadgeValue = styled("div")(() => ({
  padding: "1px 4px",
  overflow: "hidden",
  borderRadius: "300px"
}));

const IconImage = styled("img")({
  width: 45,
  height: 45,
  filter: "brightness(0) invert(1)"
});

const iconMappings = {
  Dashboard: EDashboardIcon,
  "Initiative Management": InitiativeDashboardIcon,
  Program: BusinessUserTrackingIcon,
  Projects: Project,
  "Initiative Tracking": InitiativeTracking,
  Reports: Reports,
  Favorite: Favorite
};

export default function WhizVerticalNavExpansionPanel({ item, children, mode, isHovered }) {
  const [collapsed, setCollapsed] = useState(true);
  const elementRef = useRef(null);
  const componentHeight = useRef(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { tagName, icon, iconText, badge, isExpanded, pageName, isParent } = item;

  const handleClick = () => {
    console.log("under", item);

    if (!isExpanded) {
      // Check if the item is a leaf node (not expandable)

      // Toggle collapsed state and calculate height for expandable items
      componentHeight.current = 0;
      calculateHeight(elementRef.current);
      setCollapsed(!collapsed);
    } else {
      componentHeight.current = 0;
      calculateHeight(elementRef.current);
      setCollapsed(!collapsed);
    }
  };

  const calculateHeight = useCallback((node) => {
    if (node.name !== "child") {
      for (let child of node.children) {
        calculateHeight(child);
      }
    }

    if (node.name === "child") componentHeight.current += node.scrollHeight;
    else componentHeight.current += 44; // here 44 is node height
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
    return iconMappings[name] || null;
  };
  useEffect(() => {
    setCollapsed(true);
  }, [isHovered]);

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
          <IconImage src={getIconPath(tagName)} />
          {iconText && <BulletIcon />}
          <ItemText className="sidenavHoverShow">{tagName}</ItemText>
        </Box>

        {badge && <BadgeValue className="sidenavHoverShow itemIcon">{badge.value}</BadgeValue>}

        {isExpanded && (
          <div
            className={clsx({
              sidenavHoverShow: true,
              collapseIcon: collapsed,
              expandIcon: !collapsed
            })}
          >
            <ChevronRight fontSize="small" sx={{ verticalAlign: "middle" }} />
          </div>
        )}
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
