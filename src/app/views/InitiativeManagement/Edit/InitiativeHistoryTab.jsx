import React from "react";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Label } from "@fluentui/react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const InitiativeHistoryTab = ({ initiativeHistory }) => {
  // Extract the history data from the initiativeHistory prop
  const historyData = initiativeHistory?.data?.listInitiativeHistoryListEntity || [];

  const actionOptions = [
    { key: "select", text: "Select Action Taken" },
    { key: "approved", text: "Approved" },
    { key: "rejected", text: "Rejected" },
    { key: "submitted", text: "Submitted" },
    { key: "system", text: "System" }
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
                    <td>{new Date(row.eventTime).toLocaleString()}</td>
                    <td>{row.actionType}</td>
                    <td>{row.fromStage}</td>
                    <td>{row.toStage}</td>
                    <td>{row.userName}</td>
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
