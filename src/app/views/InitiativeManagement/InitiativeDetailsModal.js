import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Table } from "react-bootstrap";
import "./InitiativeDetailsModal.css";
import GetInitiativeStageDetails from "../../hooks/GetInitiativeStageDetails/GetInitiativeStageDetails";

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
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetInitiativeStageDetails(initiative?.ideaIdPk);
        console.log("ccccccccccc77", result);
        setData(result?.data?.initiativeStageDetailsEntity[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (initiative?.ideaIdPk) {
      fetchData();
    }
  }, [initiative?.ideaIdPk]);

  const getStatusClass = (stage) => {
    if (stage.isStageApproved === 1) return "status-approved";
    if (stage.isCurrentStage === 1) return "status-current";
    if (stage.isDelayed === 1) return "status-delayed";
    return ""; // Default if no condition matches
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
                          <td className="font-weight-600">{data?.title}</td>
                        </tr>
                        <tr>
                          <td>Initiated on&nbsp;:</td>
                          <td className="font-weight-600">
                            {data?.createdDate
                              ? new Date(data?.createdDate).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td>Business group&nbsp;:</td>
                          <td className="font-weight-600">{data?.businessGroup || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>Organization unit&nbsp;:</td>
                          <td className="font-weight-600">{data?.organizationunit || "N/A"}</td>
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
                          <td className="font-weight-600">{data?.initiativeCode || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>Nature of demand&nbsp;:</td>
                          <td className="font-weight-600">{data?.natureofDemand || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>Delivery unit&nbsp;:</td>
                          <td className="font-weight-600">{data?.deliveryUnit || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>Delivery team&nbsp;:</td>
                          <td className="font-weight-600">{data?.deliveryTeam || "N/A"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* New Table Section */}
              <div className="d-sec3 px-4 mt-4">
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>From Stage</th>
                      <th>To Stage</th>
                      <th>Date</th>
                      <th>Approved By</th>
                      <th>Approver List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.initiativeStageApprovalDetailsEntity?.map((stage, index) => (
                      <tr key={index}>
                        <td>
                          <span className={`status-circle ${getStatusClass(stage)}`}></span>
                        </td>
                        <td>{stage?.fromStage || "N/A"}</td>
                        <td>{stage?.toStage || "N/A"}</td>
                        <td>
                          {stage?.stagePlannedEndDate
                            ? new Date(stage?.stagePlannedEndDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>{stage?.approvedBy || "N/A"}</td>
                        <td>{stage?.approverList || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default InitiativeDetailsModal;
