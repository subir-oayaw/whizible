import React, { useState, useEffect } from "react";
import { Nav, Table } from "react-bootstrap";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown, DatePicker } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import currentstage from "../../../../assets/img/currentstage.svg";
import { tabData, formData, buttonData, resourcesData } from "./EditDumy";
import ResourceEdit from "./ResourceEdit";
import BasicDetailEdit from "./BasicDetailEdit";
const EditPage = () => {
  const [activeTab, setActiveTab] = useState(tabData[0]?.id); // State to track active tab

  const handleGoBack = () => {
    window.history.back(); // Navigate back in browser history
  };

  const [showMore, setShowMore] = useState(false); // State to toggle between show more and show less
  const [tabsToShow, setTabsToShow] = useState(4); // Default number of tabs to show
  const [formDataState, setFormDataState] = useState({
    natureOfInitiative: "",
    initiativeCode: "",
    businessGroup: null,
    organizationUnit: null,
    plannedStart: null,
    plannedEnd: null
  });

  // Update tabsToShow state based on screen size
  const updateTabsToShow = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setTabsToShow(10); // Show 10 tabs for large screens
    } else if (width >= 992) {
      setTabsToShow(8); // Show 8 tabs for medium-large screens
    } else {
      setTabsToShow(4); // Show 4 tabs for smaller screens
    }
  };

  // Effect to update tabsToShow on mount and window resize
  useEffect(() => {
    updateTabsToShow();
    window.addEventListener("resize", updateTabsToShow);
    return () => {
      window.removeEventListener("resize", updateTabsToShow);
    };
  }, []);

  // Handler for toggling show more/less tabs
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Handler for changing active tab
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Render tabs with "More..." option for responsiveness
  const renderTabs = () => {
    const displayedTabs = showMore ? tabData : tabData.slice(0, tabsToShow);

    return (
      <>
        {displayedTabs?.map((tab) => (
          <Nav.Item key={tab.id}>
            <Nav.Link href={`#${tab.id}`} onClick={() => handleTabClick(tab.id)}>
              {tab.title}
            </Nav.Link>
          </Nav.Item>
        ))}
        {tabData.length > tabsToShow && (
          <Nav.Item>
            <Nav.Link href="#!" className="more-tabs" onClick={toggleShowMore}>
              {showMore ? "Show Less" : "More..."}
            </Nav.Link>
          </Nav.Item>
        )}
      </>
    );
  };

  // Handler for form field changes
  const handleFieldChange = (value, stateKey) => {
    setFormDataState({ ...formDataState, [stateKey]: value });
  };

  // Render content based on active tab
  const renderContent = () => {
    if (activeTab === "basic-details") {
      // Render specific content for "Basic Details" tab
      return (
        <div className="container-fluid mt-3">
          <h3>Resources</h3>
          <BasicDetailEdit
            formData={formData}
            buttonData={buttonData}
            handleFieldChange={handleFieldChange}
            handleGoBack={handleGoBack}
          />
        </div>
      );
    } else if (activeTab === "resources") {
      return (
        <div className="container-fluid mt-3">
          <h3>Resources</h3>
          <ResourceEdit resourcesData={resourcesData} />
          <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
        </div>
      );
    } else {
      // Render default content for other tabs
      return (
        <div>
          <h3>{tabData.find((tab) => tab.id === activeTab)?.title}</h3>
          <p>
            Content related to {tabData.find((tab) => tab.id === activeTab)?.title.toLowerCase()}{" "}
            goes here.
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      <div id="IMInfopgtabs" className="IM_tabs bglightblue">
        <Nav variant="tabs" defaultActiveKey={`#${tabData[0]?.id}`}>
          {renderTabs()}
        </Nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default EditPage;
