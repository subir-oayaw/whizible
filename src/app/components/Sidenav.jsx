import { Fragment, useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css"; // Import the CSS
import { WhizVerticalNav } from "app/components";
import useSettings from "app/hooks/useSettings";
import useSidebar from "../hooks/useSidebar";
import { Span } from "app/components/Typography";
import eDashboardIcon from "../../assets/img/e-dashboard.svg";
import { Search20Regular as SearchIcon } from "@fluentui/react-icons";
import Search from "../../assets/img/search-icn.svg";

// STYLED COMPONENTS
const ScrollContainer = styled("div")({
  height: "calc(100vh - 64px)", // Adjust based on header/footer height
  overflowY: "auto" // Enable vertical scrolling
});

const StyledScrollBar = styled(Scrollbar)(({ theme }) => ({
  height: "100%", // Take up the full height of the parent container
  paddingLeft: "1rem",
  paddingRight: "1rem",
  overflowY: "auto", // Ensure vertical scrolling
  overflowX: "hidden", // Hide horizontal overflow if not needed
  "& .ps__rail-y": {
    zIndex: 1 // Ensure the scrollbar is above other elements
  },
  "& .ps__thumb-y": {
    background: theme.palette.primary.main // Customize scrollbar color
  }
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

export default function Sidenav({ children, isHovered }) {
  const { settings, updateSettings } = useSettings();
  const [searchTerm, setSearchTerm] = useState("");
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  const { SidebarData: navigations, loading, error } = useSidebar();
  const [filteredNavigations, setFilteredNavigations] = useState([]);
  const [expandedItems, setExpandedItems] = useState(new Set()); // Track expanded items

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

  const handleToggleExpand = useCallback((itemId) => {
    setExpandedItems((prevExpandedItems) => {
      const newExpandedItems = new Set(prevExpandedItems);
      if (newExpandedItems.has(itemId)) {
        newExpandedItems.delete(itemId);
      } else {
        newExpandedItems.add(itemId);
      }
      return newExpandedItems;
    });
  }, []);

  useEffect(() => {
    // Force a re-render on expand/collapse to update scrollbar height
    setFilteredNavigations([...filteredNavigations]);
  }, [expandedItems]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Fragment>
      <StyledSpan mode={mode} className="sidenavHoverShow">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ margin: "1rem", padding: "0.5rem", width: "calc(100% - 2rem)" }}
        />
      </StyledSpan>
      <ScrollContainer>
        <StyledScrollBar options={{ suppressScrollX: true }}>
          <WhizVerticalNav
            items={filteredNavigations}
            isHovered={isHovered}
            onToggleExpand={handleToggleExpand} // Pass the toggle function
            expandedItems={expandedItems} // Pass the expanded items state
          />
          {children}
        </StyledScrollBar>
      </ScrollContainer>
      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
}
