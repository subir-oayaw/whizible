import React, { useState } from "react";
import {
  Pivot,
  PivotItem,
  Dropdown,
  Label,
  PrimaryButton,
  TextField,
  Stack,
  Icon,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Checkbox
} from "@fluentui/react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExternalAudit = () => {
  const [selectedTab, setSelectedTab] = useState("iniReallocationTab");
  const [currentApprover, setCurrentApprover] = useState("");
  const [natureOfInitiative, setNatureOfInitiative] = useState("");
  const [businessGroup, setBusinessGroup] = useState("");
  const [stageOfApproval, setStageOfApproval] = useState("");
  const [initiativeTitle, setInitiativeTitle] = useState("");

  const dropdownOptions = (options) => options.map((option) => ({ key: option, text: option }));

  const currentApproverOptions = dropdownOptions(["James", "Kavya", "Mac", "Nirbhay", "Robin"]);
  const initiativeOptions = dropdownOptions(["Initiative 1", "Initiative 2", "Initiative 3"]);
  const businessGroupOptions = dropdownOptions(["Construction", "India International"]);
  const stageApprovalOptions = dropdownOptions([
    "CEO Approval",
    "CFO Approval",
    "Completed",
    "Delivery Manager"
  ]);

  const columns = [
    {
      key: "column1",
      name: "Stage Status",
      fieldName: "stageStatus",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: "column2",
      name: "Order No.",
      fieldName: "orderNo",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: "column3",
      name: "Stage of Approval",
      fieldName: "stageOfApproval",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: "column4",
      name: "Approvers",
      fieldName: "approvers",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: "column5",
      name: "Delete",
      fieldName: "delete",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => <Checkbox />
    }
  ];

  const items = [
    {
      key: 1,
      stageStatus: "Pending Stage",
      orderNo: 4,
      stageOfApproval: "Deployment",
      approvers: "James, Kavya"
    },
    {
      key: 2,
      stageStatus: "Delayed Stage",
      orderNo: 5,
      stageOfApproval: "Deployment",
      approvers: "Mac, Nirbhay"
    }
  ];

  return (
    <div className="tab-content px-2">
      <div className="tab-pane active" id="iniManagement">
        <div id="IMActiontabs" className="IM_tabs bglightblue">
          <Pivot
            selectedKey={selectedTab}
            onLinkClick={(item) => setSelectedTab(item.props.itemKey)}
          >
            <PivotItem headerText="Initiative Reallocation" itemKey="iniReallocationTab" />
            <PivotItem headerText="Watch List Configuration" itemKey="watchListConfTab" />
            <PivotItem headerText="Initiative Activate - Snooze" itemKey="iniActivateSnoozeTab" />
          </Pivot>
        </div>

        <div className="tab-content px-2">
          <div className="tab-pane active" id={selectedTab}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h2>Advanced Search</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="container-fluid">
                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <div className="note-txt">
                        <span className="note-title">
                          <Icon iconName="Lightbulb" />{" "}
                        </span>
                        Initiative Reallocation helps to manage the approval process such a way that
                        an initiative is not 'stranded' at any stage. So the approval process
                        continues smoothly...
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-3">
                    <div className="col-12 col-sm-12">
                      <Stack tokens={{ childrenGap: 10 }}>
                        <Stack horizontal tokens={{ childrenGap: 10 }}>
                          <Dropdown
                            label="Select Current Approver"
                            selectedKey={currentApprover}
                            onChange={(e, option) => setCurrentApprover(option.key)}
                            options={currentApproverOptions}
                          />
                          <Dropdown
                            label="Nature of Initiative"
                            selectedKey={natureOfInitiative}
                            onChange={(e, option) => setNatureOfInitiative(option.key)}
                            options={initiativeOptions}
                          />
                          <Dropdown
                            label="Business Group"
                            selectedKey={businessGroup}
                            onChange={(e, option) => setBusinessGroup(option.key)}
                            options={businessGroupOptions}
                          />
                        </Stack>

                        <Stack horizontal tokens={{ childrenGap: 10 }}>
                          <Dropdown
                            label="Stage of Approval"
                            selectedKey={stageOfApproval}
                            onChange={(e, option) => setStageOfApproval(option.key)}
                            options={stageApprovalOptions}
                          />
                          <TextField
                            label="Initiative Title"
                            value={initiativeTitle}
                            onChange={(e, newValue) => setInitiativeTitle(newValue)}
                          />
                          <PrimaryButton text="Next" />
                        </Stack>
                      </Stack>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>

            <div className="IR_main_content">
              <div className="selectedApproverDiv bglightblue mb-4">
                <div className="container-fluid">
                  <div className="sApproverDetails d-flex align-items-center justify-content-end">
                    <span className="text-center">
                      Selected Approver :{" "}
                      <img src="profile-pic.jpg" alt="" className="img-fluid approverImg mx-2" />{" "}
                      Nikhil Adtakar
                    </span>
                  </div>
                </div>
              </div>

              <div className="stages-div px-4 pt-3" id="stages-div">
                <div className="stage-status d-flex justify-content-between">
                  <div className="stage-title">
                    <h5 className="mb-0">Legends</h5>
                  </div>
                  <div className="stage-content d-flex">
                    <ul className="list-unstyled main-box">
                      <li className="d-flex gap-1 ms-3">
                        <div className="StageboxDiv clearedStage"></div>
                        <div className="span-clrs">Cleared stage</div>
                      </li>
                    </ul>
                    <ul className="list-unstyled main-box">
                      <li className="d-flex gap-1 ms-3">
                        <div className="StageboxDiv pendingStage"></div>
                        <div className="span-clrs">Pending stage</div>
                      </li>
                    </ul>
                    <ul className="list-unstyled main-box">
                      <li className="d-flex gap-1 ms-3">
                        <div className="StageboxDiv currStage"></div>
                        <div className="span-clrs">Delayed stage</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="Init-Grid1" className="table-responsive init_grid_panel mx-3">
                <DetailsList
                  items={items}
                  columns={columns}
                  setKey="set"
                  layoutMode={DetailsListLayoutMode.fixedColumns}
                  selectionMode={SelectionMode.none}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalAudit;
