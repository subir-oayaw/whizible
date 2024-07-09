// TimelineHistoryDrawer.js

import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const TimelineHistoryDrawer = ({ open, onClose, historyData }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          width: "70%",
          maxWidth: "100%"
        }
      }}
    >
      <div className="offcanvas-body">
        <div id="initSnooze" className="inithistDetails">
          <div className="graybg container-fluid py-2 mb-2">
            <div className="row">
              <div className="col-sm-10">
                <h5 className="offcanvasTitle">Timeline History</h5>
              </div>
              <div className="col-sm-2 text-end">
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          </div>

          <div className="historyHeight">
            <div className="table-responsive offTable_wrapper">
              <table id="inithistoryTbl" className="table table-striped table-hover mb-0">
                <thead>
                  <tr>
                    <th>Comments</th>
                    <th>Stage</th>
                    <th>Planned Start Date</th>
                    <th>Planned End Date</th>
                    <th>Planned Duration</th>
                    <th>Modified By</th>
                    <th>Modified Date</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item, index) => (
                    <tr key={index} className="TRhistory">
                      <td>{item.comments}</td>
                      <td>{item.stage}</td>
                      <td>{item.plannedStartDate}</td>
                      <td>{item.plannedEndDate}</td>
                      <td>{item.plannedDuration}</td>
                      <td>{item.modifiedBy}</td>
                      <td>{item.modifiedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="clearfix"></div>
          <div id="IMhistory_pagination" className="text-center Init_pagination"></div>
          <div className="clearfix"></div>
        </div>
      </div>
    </Drawer>
  );
};

export default TimelineHistoryDrawer;
