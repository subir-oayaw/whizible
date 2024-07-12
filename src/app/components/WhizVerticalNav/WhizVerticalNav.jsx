import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, ButtonBase, Icon, styled } from "@mui/material";
import useSettings from "app/hooks/useSettings";
import { Paragraph, Span } from "../Typography";
import WhizVerticalNavExpansionPanel from "./WhizVerticalNavExpansionPanel";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warehouse as WarehouseIcon,
  AssignmentLate as AuditIcon,
  SwapHoriz as SwapHorizIcon,
  TrackChanges as TrackChangesIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Link as LinkIcon,
  Search as SearchIcon,
  List as ListIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  AttachMoney as AttachMoneyIcon
} from "@mui/icons-material";

// Styled components
const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
  fontSize: "12px",
  marginTop: "20px",
  marginLeft: "15px",
  marginBottom: "10px",
  textTransform: "uppercase",
  display: mode === "compact" ? "none" : "block",
  color: theme.palette.text.secondary
}));

const ExtAndIntCommon = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  borderRadius: "4px",
  height: 44,
  whiteSpace: "nowrap",
  marginBottom: "8px",
  textDecoration: "none",
  justifyContent: "space-between",
  transition: "all 150ms ease-in",
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
  "&.compactNavItem": {
    overflow: "hidden",
    justifyContent: "center !important"
  },
  "& .icon": {
    fontSize: "18px",
    paddingLeft: "16px",
    paddingRight: "16px",
    verticalAlign: "middle"
  }
}));

const InternalLink = styled(Box)(({ theme }) => ({
  "& a": {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary
  },
  "& .navItemActive": {
    backgroundColor: "rgba(255, 255, 255, 0.16)"
  }
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: "0.875rem",
  paddingLeft: "0.8rem",
  display: mode === "compact" ? "none" : "block",
  whiteSpace: "nowrap"
}));

const BadgeValue = styled("div")(() => ({
  padding: "1px 8px",
  overflow: "hidden",
  borderRadius: "300px"
}));

const iconMappings = {
  "Initiative Management": DashboardIcon,
  Initiative: AssignmentIcon,
  "Converted Initiatives": AssignmentTurnedInIcon,
  "Completed Initiatives": CheckCircleIcon,
  "Withdrawn Initiatives": CancelIcon,
  Warehouse: WarehouseIcon,
  "Action Items": AssignmentTurnedInIcon,
  "External Audit": AuditIcon,
  "Initiative Reallocation": SwapHorizIcon,
  "Initiative Status Management": TrackChangesIcon,
  "Initiative Tracking": TrackChangesIcon,
  "Initiative Prioritization": FormatListNumberedIcon,
  "Initiative Linking": LinkIcon,
  "Initiative Search": SearchIcon,
  "Man-Com Prioritization": FormatListNumberedIcon,
  Program: ListIcon,
  "Program List": ListIcon,
  "Projects List": ListIcon,
  "Project Health Sheet Approval": HealthAndSafetyIcon,
  "Update Actual Cost": AttachMoneyIcon
};

export default function WhizVerticalNav({ items }) {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (!item.isParent) {
      switch (item.tagDescription) {
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
        case "External Audit":
          navigate("/Reallocation");
          break;
        default:
          navigate("/under-construction");
          break;
      }
    }
  };

  const renderLevels = (data) => {
    return data.map((item, index) => {
      const IconComponent = iconMappings[item.tagDescription];
      if (item.type === "label") {
        return (
          <ListLabel key={index} mode={mode} className="sidenavHoverShow">
            {item.label}
          </ListLabel>
        );
      }

      if (item.children && item.isParent) {
        return (
          <WhizVerticalNavExpansionPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </WhizVerticalNavExpansionPanel>
        );
      }

      return (
        <InternalLink key={index}>
          <ButtonBase
            key={item.tagName}
            name="child"
            sx={{ width: "100%" }}
            onClick={() => handleClick(item)}
          >
            <Icon className="icon" sx={{ width: 36 }}>
              {IconComponent && <IconComponent />}
            </Icon>
            <StyledText mode={mode} className="sidenavHoverShow">
              {item.tagName}
            </StyledText>
            <Box mx="auto" />
            {item.badge && <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>}
          </ButtonBase>
        </InternalLink>
      );
    });
  };

  return <div className="navigation">{renderLevels(items)}</div>;
}
