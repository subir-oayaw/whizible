import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ButtonBase, styled } from "@mui/material";
import useSettings from "app/hooks/useSettings";
import { Paragraph, Span } from "../Typography";
import WhizVerticalNavExpansionPanel from "./WhizVerticalNavExpansionPanel";

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

const InternalLink = styled(Box)(({ theme }) => ({
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
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" }
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

export default function WhizVerticalNav({ items, isHovered }) {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Initiative");

  const handleClick = (item) => {
    if (!item.isParent) {
      setSelectedItem(item.tagDescription);
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
        case "Initiative Management":
          navigate("/Reallocation");
          break;
        case "External Audit":
          navigate("/ExternalAudit");
          break;
        case "Initiative Status Management":
          navigate("/InitiativeStatusManagement");
          break;
        default:
          navigate("/under-construction");
          break;
      }
    }
  };

  const renderLevels = (data) => {
    return data.map((item, index) => {
      if (item.type === "label") {
        return (
          <ListLabel key={index} mode={mode} className="sidenavHoverShow">
            {item.label}
          </ListLabel>
        );
      }

      if (item.children && item.isParent) {
        return (
          <WhizVerticalNavExpansionPanel mode={mode} item={item} key={index} isHovered={isHovered}>
            {renderLevels(item.children)}
          </WhizVerticalNavExpansionPanel>
        );
      }

      return (
        <InternalLink key={index}>
          <ButtonBase
            key={item.tagName}
            name="child"
            sx={{ width: "100%", paddingLeft: "6px" }} // Added padding here
            onClick={() => handleClick(item)}
          >
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
