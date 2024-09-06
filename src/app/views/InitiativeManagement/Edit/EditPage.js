import React, { useState, useEffect } from "react";
import { Nav, Table } from "react-bootstrap";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown, DatePicker } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import currentstage from "../../../../assets/img/currentstage.svg";
import { tabData, formData, buttonData, resourcesData, costData } from "./EditDumy";
import ResourceEdit from "./ResourceEdit";
import BasicDetailEdit from "./BasicDetailEdit";
import CostTabContent from "./CostTabContent";
import FundingTab from "./Funding";
import WorkOrderTab from "./WorkOrder";
import ROIComponent from "./ROIComponent";
import StageComponent from "./StageComponent";
import TimelinesComponent from "./TimelinesComponent";
import DocumentsComponent from "./DocumentsComponent";
import WorkflowTabs from "./WorkFlow";
import Discussion from "./Discussion";
import InitiativeHistoryTab from "./InitiativeHistoryTab";
import MoreActions from "./MoreActions";

import GetInitiativeDetail from "../../../hooks/Editpage/GetInitiativeDetail";
import GetInitiativeROIList from "../../../hooks/Editpage/GetInitiativeROIList";
import GetInitiativeStageList from "../../../hooks/Editpage/GetInitiativeStageList";
import GetInitiativeDocumentList from "../../../hooks/Editpage/GetInitiativeDocumentList";
import GetInitiativeTimeline from "../../../hooks/Editpage/GetInitiativeTimeline";
import GetInitiativeResourceList from "../../../hooks/Editpage/GetInitiativeResourceList";
import GetInitiativeCostList from "../../../hooks/Editpage/GetInitiativeCostList";
import GetInitiativeWorkOrderList from "../../../hooks/Editpage/GetInitiativeWorkOrderList";
import GetInitiativeFundList from "../../../hooks/Editpage/GetInitiativeFundList";

const EditPage = ({ initiativesID }) => {
  const [activeTab, setActiveTab] = useState(tabData[0]?.id); // State to track active tab
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
  const [userID, setUserID] = useState(null);
  const [initiativeDetail, setInitiativeDetail] = useState(null);
  const [initiativeROI, setInitiativeROI] = useState(null);
  const [initiativeStage, setInitiativeStage] = useState(null);
  const [initiativeDocument, setInitiativeDocument] = useState(null);
  const [initiativeTimeline, setInitiativeTimeline] = useState(null);
  const [initiativeResource, setInitiativeResource] = useState(null);
  const [initiativeCost, setInitiativeCost] = useState(null);
  const [initiativeWorkOrder, setInitiativeWorkOrder] = useState(null);
  const [initiativeFund, setInitiativeFund] = useState(null);

  const handleGoBack = () => {
    window.history.back(); // Navigate back in browser history
  };
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

  // Fetch userID
  useEffect(() => {
    const userdata = JSON.parse(sessionStorage.getItem("user"));
    setUserID(userdata?.employeeId);
  }, []);

  // Fetch data based on the active tab
  useEffect(() => {
    if (userID) {
      const fetchData = async () => {
        try {
          const detail = await GetInitiativeDetail(82, userID);

          setInitiativeDetail(detail);

          const roi = await GetInitiativeROIList(82);
          console.log("initiativeROI1", roi);
          setInitiativeROI(roi);

          const stage = await GetInitiativeStageList(82);
          setInitiativeStage(stage);

          const document = await GetInitiativeDocumentList(82, userID);
          setInitiativeDocument(document);

          const timeline = await GetInitiativeTimeline(82, userID);
          setInitiativeTimeline(timeline);

          const resource = await GetInitiativeResourceList(82);
          console.log("setInitiativeResource", resource);
          setInitiativeResource(resource);

          const cost = await GetInitiativeCostList(82);
          setInitiativeCost(cost);

          const workOrder = await GetInitiativeWorkOrderList(82);
          setInitiativeWorkOrder(workOrder);

          const fund = await GetInitiativeFundList(82);
          setInitiativeFund(fund);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [userID, initiativesID]);

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
    switch (activeTab) {
      case "basic-details":
        return (
          <div className="container-fluid mt-3">
            <h3>Basic Details</h3>
            <BasicDetailEdit
              initiativeDetail={initiativeDetail}
              formData={formData}
              buttonData={buttonData}
              handleFieldChange={handleFieldChange}
              handleGoBack={handleGoBack}
            />
          </div>
        );
      case "resources":
        return (
          <div className="container-fluid mt-3">
            <ResourceEdit initiativeResource={initiativeResource} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "work-order":
        return (
          <div className="container-fluid mt-3">
            <WorkOrderTab initiativeWorkOrder={initiativeWorkOrder} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "cost":
        return (
          <div className="container-fluid mt-3">
            <CostTabContent costData={initiativeCost} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "funding":
        return (
          <div className="container-fluid mt-3">
            <FundingTab fundData={initiativeFund} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "roi":
        return (
          <div className="container-fluid mt-3">
            <ROIComponent initiativeROI={initiativeROI} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "stage":
        return (
          <div className="container-fluid mt-3">
            <StageComponent stageData={initiativeStage} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "timelines":
        return (
          <div className="container-fluid mt-3">
            <TimelinesComponent initiativeTimeline={initiativeTimeline} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "documents":
        return (
          <div className="container-fluid mt-3">
            <DocumentsComponent initiativeDocument={initiativeDocument} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "workflows":
        return (
          <div className="container-fluid mt-3">
            <WorkflowTabs />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "discussion-thread":
        return (
          <div className="container-fluid mt-3">
            <Discussion initiativeId={initiativesID} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );

      case "initiative-history":
        return (
          <div className="container-fluid mt-3">
            <InitiativeHistoryTab initiativeId={initiativesID} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "more-actions":
        return (
          <div className="container-fluid mt-3">
            <MoreActions initiativeId={initiativesID} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      default:
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
