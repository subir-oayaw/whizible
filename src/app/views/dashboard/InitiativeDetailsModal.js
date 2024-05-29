import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TableProgressBar from "./TableProgressBar"; // Import the new component
import "./InitiativeDetailsModal.css";
import CustomProgressBar from "./CustomProgressBar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh", // Limiting max height to 80% of viewport height
  overflowY: "auto" // Enable vertical scrolling
};

const InitiativeDetailsModal = ({ open, handleClose, initiative, stagesLegend }) => {
  const { stagesCompleted, totalStages, stages, currentStage } = initiative;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="initiative-details-title"
      aria-describedby="initiative-details-description"
    >
      <Box sx={style}>
        <div className="modal-header">
          <Typography variant="h5" component="h2" id="initiative-details-title">
            Initiative Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modal-content">
          <div className="IniDetailsMainContent">
            <div className="IniDetailsDivDesktop py-3 d-lg-block d-none" id="IniDetailsDivDesktop">
              <div className="row">
                <div className="details-main-sec">
                  <div className="d-sec1 px-4">
                    <table className="table details-table1 mb-0">
                      <tbody>
                        <tr>
                          <td>Initiative title&nbsp;:</td>
                          <td className="font-weight-600">{initiative?.title}</td>
                        </tr>
                        <tr>
                          <td>Initiated on&nbsp;:</td>
                          <td className="font-weight-600">{initiative?.date}</td>
                        </tr>
                        <tr>
                          <td>Business group&nbsp;:</td>
                          <td className="font-weight-600">{initiative?.businessGroup}</td>
                        </tr>
                        <tr>
                          <td>Delivery unit&nbsp;:</td>
                          <td className="font-weight-600">{initiative?.deliveryUnit}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="vertical-line"></div>
                  <div className="d-sec2 px-4">
                    <table className="table details-table2 mb-0">
                      <tbody>
                        <tr>
                          <td>Initiative code&nbsp;:</td>
                          <td className="font-weight-600">{initiative?.code}</td>
                        </tr>
                        <tr>
                          <td>Initiative category&nbsp;:</td>
                          <td className="font-weight-600">{initiative?.category}</td>
                        </tr>
                        <tr>
                          <td>Organization unit&nbsp;:</td>
                          <td className="font-weight-600">{initiative?.organizationUnit}</td>
                        </tr>
                        <tr>
                          <td>Delivery team&nbsp;:</td>
                          <td className="font-weight-600">{initiative?.deliveryTeam}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Box display="flex" alignItems="center" p={2} border={1} borderColor="grey.300" mb={2}>
              <Typography variant="h6" component="h3" style={{ marginRight: "16px" }}>
                Legend:
              </Typography>
              <div className="stagesLegendContainer">{stagesLegend}</div>
            </Box>

            <Box p={2} border={1} borderColor="grey.300" mb={2}>
              <div className="left-side">
                <Typography variant="body2" className="due-in" color="textSecondary">
                  {initiative.dueIn} Days
                </Typography>
              </div>
              <CustomProgressBar
                stagesCompleted={stagesCompleted}
                totalStages={totalStages}
                stages={stages}
                initiative={initiative}
              />
              <Typography variant="body2" color="textSecondary">
                {stagesCompleted} stages completed
              </Typography>
            </Box>
            <div id="Project_Grid_panel" className="table-responsive stageGridtable m-3">
              <table
                className="table table-striped table-hover table-bordered init_borderedTbl"
                id="stage-table"
              >
                <thead>
                  <tr className="cart-table-head">
                    <th style={{ width: "50px" }}>Progress</th>
                    <th>From Stage</th>
                    <th>To Stage</th>
                    <th>Action Taken</th>
                    <th>Approver</th>
                    <th>Completed on</th>
                    <th>Comments</th>
                    <th>Delayed by</th>
                  </tr>
                </thead>
                <tbody>
                  {stages.map((stage, index) => (
                    <tr key={index}>
                      <td>
                        <TableProgressBar
                          stageIndex={index} // Pass the current stage index
                          currentStage={stagesCompleted} // Pass the current stage
                        />
                      </td>
                      <td>{stage.from}</td>
                      <td>{stage.to}</td>
                      <td>{stage.actionTaken}</td>
                      <td>{stage.approver}</td>
                      <td>{stage.completedOn}</td>
                      <td>{stage.comments}</td>
                      <td>{stage.delayedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default InitiativeDetailsModal;
