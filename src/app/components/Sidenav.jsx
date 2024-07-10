import React, { Fragment, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Scrollbar from "react-perfect-scrollbar";
import { WhizVerticalNav } from "app/components";
import useSettings from "app/hooks/useSettings";
import useSidebar from "../hooks/useSidebar"; // Import the custom hook
import { Span } from "app/components/Typography";
import eDashboardIcon from "../../assets/img/e-dashboard.svg"; // Import the SVG icon
import { Search20Regular as SearchIcon } from "@fluentui/react-icons";
import SearchImage from "../../assets/img/search-icn.svg"; // Import the image
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Box } from "@mui/material";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative"
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: ".5rem",
  display: mode === "compact" ? "none" : "block"
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  width: "100vw",
  background: "rgba(0, 0, 0, 0.54)",
  [theme.breakpoints.up("lg")]: { display: "none" }
}));

const SearchContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer"
}));

const SearchInput = styled("input")(({ expanded }) => ({
  margin: "1rem",
  padding: "0.005rem",
  width: expanded ? "calc(100% - 2rem)" : 0,
  opacity: expanded ? 1 : 0,
  transition: "width 0.3s ease-in-out, opacity 0.3s ease-in-out"
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false); // State to manage expansion
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  const { SidebarData: navigations, loading, error } = useSidebar();
  const [filteredNavigations, setFilteredNavigations] = useState([]);

  useEffect(() => {
    if (navigations) {
      setFilteredNavigations(navigations);
    }
  }, [navigations]);

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredNavigations(navigations);
    } else {
      const filtered = navigations
        .map((navItem) => {
          const filteredChildren = navItem.children.filter((child) =>
            child.name.toLowerCase().includes(term)
          );

          if (filteredChildren.length > 0) {
            return {
              ...navItem,
              children: filteredChildren
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      setFilteredNavigations(filtered);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Fragment>
      <SearchContainer onClick={toggleExpand}>
        <Box display="flex" alignItems="center">
          <img
            src={SearchImage}
            style={{
              width: 36,
              height: 36,
              filter: "brightness(0) invert(1)",
              verticalAlign: "middle"
            }}
            alt="Search Icon"
          />
        </Box>
        <StyledSpan mode={mode} className="sidenavHoverShow">
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            expanded={expanded}
          />
        </StyledSpan>
      </SearchContainer>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        <WhizVerticalNav items={filteredNavigations} />
        {children}
      </StyledScrollBar>
      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
};

export default Sidenav;
