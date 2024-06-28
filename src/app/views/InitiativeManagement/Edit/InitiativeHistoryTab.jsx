import React from "react";
import { Dropdown, DropdownMenuItemType } from "@fluentui/react/lib/Dropdown";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Label, Stack } from "@fluentui/react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const InitiativeHistoryTab = () => {
  const actionOptions = [
    { key: "select", text: "Select Action Taken" },
    { key: "approved", text: "Approved" },
    { key: "rejected", text: "Rejected" },
    { key: "submitted", text: "Submitted" },
    { key: "system", text: "System" }
  ];

  const historyData = [
    {
      eventTime: "17/07/2023 3:32:02 PM",
      actionTaken: "Approved",
      fromStage: "Deployment",
      toStage: "Completed",
      approver: "Admin",
      comments: "Force pushed by Admin"
    },
    {
      eventTime: "17/07/2023 3:32:02 PM",
      actionTaken: "Approved",
      fromStage: "CFO Approval",
      toStage: "Deployment",
      approver: "Admin",
      comments: "Force pushed by Admin"
    },
    {
      eventTime: "17/07/2023 3:29:35 PM",
      actionTaken: "Approved",
      fromStage: "Start",
      toStage: "QA Lead Approval",
      approver: "Admin",
      comments: "ok"
    },
    {
      eventTime: "06/06/2023 11:06:41 AM",
      actionTaken: "Submitted",
      fromStage: "Start",
      toStage: "Completed",
      approver: "Admin",
      comments: "ok"
    },
    {
      eventTime: "17/07/2023 3:32:02 PM",
      actionTaken: "Rejected",
      fromStage: "QA Lead Approval",
      toStage: "Completed",
      approver: "Admin",
      comments: "ok"
    },
    {
      eventTime: "06/06/2023 11:05:48 AM",
      actionTaken: "Submitted",
      fromStage: "Start",
      toStage: "Completed",
      approver: "Admin",
      comments: "ok"
    }
  ];

  return (
    <div className="tab-pane py-0" id="Initiative_HistoryTab">
      <div className="container-fluid mt-2">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <Label className="textstrong">Initiative History</Label>
          </div>
        </div>
      </div>
      <div className="init_grid_panel">
        <div className="row mb-3 mt-3 mx-2">
          <div className="col-sm-3">
            <Label className="form-label IM_label">Action Taken</Label>
            <Dropdown
              placeholder="Select Action Taken"
              options={actionOptions}
              styles={{ dropdown: { width: "100%" } }}
            />
          </div>
          <div className="col-sm-6 text-start">
            <Label className="form-label IM_label col-sm-12">&nbsp;</Label>
            <PrimaryButton id="filtershowbtn" text="Show" />
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div id="Project_History_Grid_panel_2" className="m-3">
          <div className="table_wrapper stageGridPanel">
            <Table className="init_borderedTbl_History table-hover table-striped init-stickytable mb-0">
              <thead>
                <tr>
                  <th>Event Time</th>
                  <th>Action Taken</th>
                  <th>From Stage</th>
                  <th>To Stage</th>
                  <th>Approver</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody className="tbodyHistory">
                {historyData.map((row, index) => (
                  <tr className="TR_history" key={index}>
                    <td>{row.eventTime}</td>
                    <td>{row.actionTaken}</td>
                    <td>{row.fromStage}</td>
                    <td>{row.toStage}</td>
                    <td>{row.approver}</td>
                    <td>{row.comments}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div id="IM_History_tab_pagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>
    </div>
  );
};

export default InitiativeHistoryTab;
