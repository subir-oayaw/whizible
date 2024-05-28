import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

const InitiativeDetailsModal = ({ open, handleClose, initiative }) => {
  const { title, id, type, date, stagesCompleted, totalStages, currentStage, dueIn, stages } =
    initiative;

  // Helper function to get the CSS class for stage status
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "t-green";
      case "current":
        return "t-yellow";
      case "delayed":
        return "t-red";
      default:
        return "t-grey";
    }
  };

  // Helper function to calculate the height of stage status bar
  const calculateHeight = (stage) => {
    // Replace with your logic to calculate height based on stage data
    return "50px"; // Example height
  };

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
            <div className="IniDetailsDivMob py-3 d-lg-none d-block" id="IniDetailsDivMob">
              <table className="table details_table_mob mb-0">
                <tbody>
                  <tr>
                    <td className="col-sm-6 col-6 pb-0">Initiative title&nbsp;:</td>
                    <td className="col-sm-6 col-6 pb-0">Initiative Code&nbsp;:</td>
                  </tr>
                  <tr>
                    <td className="col-sm-6 col-6 font-weight-600">{initiative?.title}</td>
                    <td className="col-sm-6 col-6 font-weight-600">{initiative?.code}</td>
                  </tr>
                  <tr>
                    <td className="col-sm-6 col-6 pb-0">Initiated on&nbsp;:</td>
                    <td className="col-sm-6 col-6 pb-0">Initiative category&nbsp;:</td>
                  </tr>
                  <tr>
                    <td className="col-sm-6 col-6 font-weight-600">{initiative?.date}</td>
                    <td className="col-sm-6 col-6 font-weight-600">{initiative?.category}</td>
                  </tr>
                  <tr>
                    <td className="col-sm-6 col-6 pb-0">Business group&nbsp;:</td>
                    <td className="col-sm-6 col-6 pb-0">Organization unit&nbsp;:</td>
                  </tr>
                  <tr>
                    <td className="col-sm-6 col-6 font-weight-600">{initiative?.businessGroup}</td>
                    <td className="col-sm-6 col-6 font-weight-600">
                      {initiative?.organizationUnit}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-sm-6 col-6 pb-0">Delivery unit&nbsp;:</td>
                    <td className="col-sm-6 col-6 pb-0">Delivery team&nbsp;:</td>
                  </tr>
                  <tr>
                    <td className="col-sm-6 col-6 font-weight-600">{initiative?.deliveryUnit}</td>
                    <td className="col-sm-6 col-6 font-weight-600">{initiative?.deliveryTeam}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Box p={2} border={1} borderColor="grey.300" mb={2}>
              <div className="left-side">
                <Typography variant="body2" className="due-in" color="textSecondary">
                  {dueIn} Days
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
                    <th style={{ width: "50px" }}>&nbsp;</th>
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
                      <td id={`tdOuter${index + 1}`}>
                        <div className="s-table" id={`outer-stage${index + 1}`}>
                          <div
                            id={`t-stage${index + 1}`}
                            className={`t-process ${getStatusClass(stage.status)}`}
                            data-bs-toggle="tooltip"
                            aria-label={`Stage ${index + 1}`}
                            data-bs-original-title={`Stage ${index + 1}`}
                            style={{ height: calculateHeight(stage) }}
                          ></div>
                        </div>
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
