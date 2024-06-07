import React from "react";
import { Drawer, IconButton, Tooltip } from "@fluentui/react/lib/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const InitiativeHistoryDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="offcanvas offcanvas-end inithistoryOffcanvas offcanvas-70" tabIndex="-1">
        <div className="offcanvas-body">
          <div id="inithist_Sec" className="inithistDetails">
            <div className="graybg container-fluid py-2 mb-2">
              <div className="row">
                <div className="col-sm-10">
                  <h5 className="offcanvasTitle">Initiative History</h5>
                </div>
                <div className="col-sm-2 text-end">
                  <Tooltip title="Close">
                    <IconButton onClick={onClose} className="close offClose">
                      <i className="fa-solid fa-xmark"></i>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
            {/* Rest of your HTML content */}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default InitiativeHistoryDrawer;
