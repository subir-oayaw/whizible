import { Fragment, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Scrollbar from "react-perfect-scrollbar";
import { MatxVerticalNav } from "app/components";
import useSettings from "app/hooks/useSettings";
import { navigations } from "app/navigations";
import { Span } from "app/components/Typography";
// STYLED COMPONENTS
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

export default function Sidenav({ children }) {
  const { settings, updateSettings } = useSettings();
  const [searchTerm, setSearchTerm] = useState("");
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const [filteredNavigations, setFilteredNavigations] = useState(navigations);
  const { mode } = leftSidebar;
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

  return (
    <Fragment>
      <StyledSpan mode={mode} className="sidenavHoverShow">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ margin: "1rem", padding: "0.005rem", width: "calc(100% - 2rem)" }}
        />
      </StyledSpan>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        <MatxVerticalNav items={filteredNavigations} />
        {children}
      </StyledScrollBar>
      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
}
