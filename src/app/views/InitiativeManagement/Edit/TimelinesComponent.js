import React, { useState } from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Modal } from "react-bootstrap";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TimelineHistoryDrawer from "./TimelineHistoryDrawer"; // Adjust path as needed

const TimelinesComponent = () => {
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  // Function to fetch historical data (simulated)
  const fetchHistoryData = () => {
    // Simulate API call or data fetching
    setTimeout(() => {
      const dummyData = [
        {
          comments: "Approve",
          stage: "Current",
          plannedStartDate: "08/01/2023",
          plannedEndDate: "28/01/2023",
          plannedDuration: "20",
          modifiedBy: "MK",
          modifiedDate: "29/01/2023"
        },
        {
          comments: "",
          stage: "Current",
          plannedStartDate: "08/01/2023",
          plannedEndDate: "28/01/2023",
          plannedDuration: "20",
          modifiedBy: "MK",
          modifiedDate: "29/01/2023"
        }
        // Add more dummy data as needed
      ];
      setHistoryData(dummyData);
      setHistoryDrawerOpen(true); // Open the history drawer after data is fetched
    }, 500); // Simulated delay of 500ms
  };

  // Function to close history drawer
  const handleHistoryDrawerClose = () => {
    setHistoryDrawerOpen(false);
  };

  return (
    <div className="tab-pane" id="Ini_Timelines">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <label className="textstrong ps-2">Timelines</label>
          </div>
          <div className="col-12 col-sm-6">
            <div id="TimelinestopActions" className="toprightactionsCol text-end pe-2">
              <PrimaryButton
                className="me-2"
                iconProps={{ iconName: "History" }}
                text="History"
                onClick={fetchHistoryData}
              >
                History
              </PrimaryButton>
              <PrimaryButton className="me-2" iconProps={{ iconName: "Save" }} text="Save">
                Save
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div id="Project_Grid_panel_7" className="init_grid_panel m-3">
        <div className="table_wrapper stageGridPanel">
          <table
            className="table_Workorder table table-hover init-stickytable mb-0"
            id="Tbl_ini_Timelines"
          >
            <thead>
              <tr>
                <th>Nature of initiatives</th>
                <th>Stage</th>
                <th>Resource/Approver</th>
                <th width="14%">Planned in date</th>
                <th width="14%">Planned out date</th>
                <th width="10%">Planned TAT</th>
                <th>Actual in date</th>
                <th>Actual out date</th>
                <th className="text-center">Actual TAT</th>
              </tr>
            </thead>
            <tbody className="tbodyROI">
              <tr className="TRtimelines">
                <td>Organizational Ap...</td>
                <td>Start</td>
                <td>Submitted By : Admin</td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan1StartDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan1StartDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light border-start-0 d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan1EndDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan1EndDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td className="IMrequired d-flex">
                  <input
                    className="form-control input-sm text-center required"
                    placeholder="00"
                    type="text"
                    id="inputROItext1"
                  />
                </td>
                <td>10 Aug 2022</td>
                <td>10 Aug 2022</td>
                <td className="text-center">0</td>
              </tr>
              {/* Additional rows omitted for brevity */}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Drawer */}
      <TimelineHistoryDrawer
        open={historyDrawerOpen}
        onClose={handleHistoryDrawerClose}
        historyData={historyData}
      />
    </div>
  );
};

export default TimelinesComponent;
