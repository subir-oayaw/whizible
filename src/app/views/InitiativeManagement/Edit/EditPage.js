import React, { useState, useEffect } from "react";
import { Nav, Table } from "react-bootstrap";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown, DatePicker } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import currentstage from "../../../../assets/img/currentstage.svg";
import { tabData, formData, buttonData } from "./EditDumy";
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
import GetInitiativeDiscussion from "../../../hooks/Editpage/GetInitiativeDiscussion";
import GetInitiativeHistory from "../../../hooks/Editpage/GetInitiativeHistory";
import GetInitiativeLinkAccess from "../../../hooks/Editpage/GetInitiativeLinkAccess";
import GetInitiativeWorkFlow from "../../../hooks/Editpage/GetInitiativeWorkFlow";
import GetInitiativeRisks from "../../../hooks/Editpage/GetInitiativeRisks";
import GetInitiativeActioItems from "../../../hooks/Editpage/GetInitiativeActioItems";
import GetPrioritizationCheckList from "app/hooks/Editpage/GetPrioritizationCheckList";
const EditPage = ({ initiativesID }) => {
  const [activeTab, setActiveTab] = useState(tabData[0]?.id);
  const [showMore, setShowMore] = useState(false);
  const [tabsToShow, setTabsToShow] = useState(4);
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
  const [initiativeDiscussion, setInitiativeDiscussion] = useState(null);
  const [initiativeHistory, setInitiativeHistory] = useState(null);
  const [initiativeLinkAccess, setInitiativeLinkAccess] = useState(null);
  const [initiativeWorkFlow, setInitiativeWorkFlow] = useState(null);
  const [initiativeRisks, setInitiativeRisks] = useState(null);
  const [initiativeActioItems, setInitiativeActioItems] = useState(null);
  const [prioritizationCheckList, setPrioritizationCheckList] = useState(null);

  const handleGoBack = () => {
    window.history.back();
  };

  const updateTabsToShow = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setTabsToShow(10);
    } else if (width >= 992) {
      setTabsToShow(8);
    } else {
      setTabsToShow(4);
    }
  };

  useEffect(() => {
    updateTabsToShow();
    window.addEventListener("resize", updateTabsToShow);
    return () => {
      window.removeEventListener("resize", updateTabsToShow);
    };
  }, []);

  useEffect(() => {
    const userdata = JSON.parse(sessionStorage.getItem("user"));
    setUserID(userdata?.employeeId);
  }, []);

  useEffect(() => {
    if (userID) {
      const fetchData = async () => {
        try {
          const detail = await GetInitiativeDetail(initiativesID, userID);
          setInitiativeDetail(detail);

          const roi = await GetInitiativeROIList(initiativesID);
          setInitiativeROI(roi);

          const stage = await GetInitiativeStageList(initiativesID);
          setInitiativeStage(stage);

          const document = await GetInitiativeDocumentList(initiativesID, userID);
          setInitiativeDocument(document);

          const timeline = await GetInitiativeTimeline(initiativesID, userID);
          setInitiativeTimeline(timeline);

          const resource = await GetInitiativeResourceList(initiativesID);
          setInitiativeResource(resource);

          const cost = await GetInitiativeCostList(initiativesID);
          setInitiativeCost(cost);

          const workOrder = await GetInitiativeWorkOrderList(initiativesID);
          setInitiativeWorkOrder(workOrder);

          const fund = await GetInitiativeFundList(initiativesID);
          setInitiativeFund(fund);

          const discussion = await GetInitiativeDiscussion(initiativesID);
          setInitiativeDiscussion(discussion);

          const history = await GetInitiativeHistory(initiativesID);
          setInitiativeHistory(history);

          const linkAccess = await GetInitiativeLinkAccess(initiativesID, userID);
          setInitiativeLinkAccess(linkAccess);

          const workFlow = await GetInitiativeWorkFlow(initiativesID);
          setInitiativeWorkFlow(workFlow);

          const risks = await GetInitiativeRisks(initiativesID, userID);
          setInitiativeRisks(risks);

          const actioItems = await GetInitiativeActioItems(initiativesID, userID);
          setInitiativeActioItems(actioItems);
          const PrioritizationCheckList = await GetPrioritizationCheckList(initiativesID, userID);
          setPrioritizationCheckList(PrioritizationCheckList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [userID, initiativesID]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

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

  const handleFieldChange = (value, stateKey) => {
    setFormDataState({ ...formDataState, [stateKey]: value });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "basic-details":
        return (
          <div className="container-fluid mt-3">
            {/* <BasicDetailEdit
              initiativeLinkAccess={initiativeLinkAccess}
              initiativeDetail={initiativeDetail}
              formData={formData}
              buttonData={buttonData}
              handleFieldChange={handleFieldChange}
              handleGoBack={handleGoBack}
            /> */}
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
            <WorkflowTabs initiativeWorkFlow={initiativeWorkFlow} />
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
            <InitiativeHistoryTab initiativeHistory={initiativeHistory} />
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}></Stack>
          </div>
        );
      case "more-actions":
        return (
          <div className="container-fluid mt-3">
            <MoreActions
              initiativeActioItems={initiativeActioItems}
              initiativeRisks={initiativeRisks}
              prioritizationCheckList={prioritizationCheckList}
            />
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
