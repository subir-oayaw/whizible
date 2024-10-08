import React, { useState } from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { DatePicker } from "@fluentui/react";
import TimelineHistoryDrawer from "./TimelineHistoryDrawer"; // Adjust path as needed

const TimelinesComponent = ({ initiativeTimeline }) => {
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
                <th>Nature of Initiatives</th>
                <th>Stage</th>
                <th>Resource/Approver</th>
                <th width="14%">Planned In Date</th>
                <th width="14%">Planned Out Date</th>
                <th width="10%">Planned TAT</th>
                <th>Actual In Date</th>
                <th>Actual Out Date</th>
                <th className="text-center">Actual TAT</th>
              </tr>
            </thead>
            <tbody className="tbodyROI">
              {initiativeTimeline.data.listInitiativeTimeLineEntity.map((timeline, index) => (
                <tr key={`timeline-${index}`} className="TRtimelines">
                  <td>{timeline.natureofDemand}</td>
                  <td>{timeline.requestStage}</td>
                  <td>{timeline.stakeHolderNames}</td>
                  <td>
                    <DatePicker
                      value={
                        timeline.stagePlannedStartDate
                          ? new Date(timeline.stagePlannedStartDate)
                          : null
                      }
                      ariaLabel="Select a date"
                    />
                  </td>
                  <td>
                    <DatePicker
                      value={
                        timeline.stagePlannedEndDate ? new Date(timeline.stagePlannedEndDate) : null
                      }
                      ariaLabel="Select a date"
                    />
                  </td>
                  <td className="IMrequired d-flex">
                    <input
                      className="form-control input-sm text-center required"
                      placeholder="00"
                      type="text"
                      value={timeline.plannedDuration || ""}
                      readOnly
                    />
                  </td>
                  <td>
                    {timeline.stageInDate
                      ? new Date(timeline.stageInDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {timeline.stageOutDate
                      ? new Date(timeline.stageOutDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="text-center">{timeline.actualDuration || "0"}</td>
                </tr>
              ))}
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
