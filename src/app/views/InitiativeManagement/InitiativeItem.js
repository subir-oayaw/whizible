import React, { useState, useEffect, useRef } from "react";
import { Typography, IconButton, Tooltip, Drawer, Box, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button"; // Import Button from Material-UI
import "./InitiativeItem.css";
import { Icon } from "@fluentui/react/lib/Icon";
import { PrimaryButton } from "@fluentui/react/lib/Button"; // Import Fluent UI Button
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import CustomProgressBar from "app/utils/CustomProgressBar";
import CommentsSection from "./CommentsSection";
// import InitiativeHistoryDrawer from "./InitiativeHistoryDrawer";

const InitiativeItem = ({
  initiative,
  stagesLegend,
  setIsEditing,
  isEditing,
  SetinitiativesID,
  startEditing,
  stopEditing
}) => {
  const {
    title,
    instanceId,
    userId,
    originator,
    processName,
    stageName,
    createdOn,
    actionType,
    initiativeCode,
    stageOrder,
    maxStage,
    comments,
    initiativeListStageDetails
  } = initiative;

  // State for managing drawers and editing
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [flagDrawerOpen, setFlagDrawerOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(-1);
  const [comment, setComment] = useState(null); // Initialize comments with null
  const [totalStages, setTotalStages] = useState(0);
  const [stagesCompleted, setStagesCompleted] = useState(0);
  // Ref for the reply textarea
  const replyTextareaRef = useRef(null);
  console.log("initiativeListStageDetails", initiative);
  useEffect(() => {
    if (initiativeListStageDetails) {
      const stageDetails = initiativeListStageDetails || [];
      setTotalStages(stageDetails.length);
      const completedStages = stageDetails.reduce(
        (count, stage) => (stage.isStageApproved ? count : count),
        0
      );
      setStagesCompleted(completedStages);
    }
  }, [initiativeListStageDetails]);

  // Function to open comment drawer
  const openCommentDrawer = () => {
    setCommentDrawerOpen(true);
  };

  // Function to close comment drawer
  const closeCommentDrawer = () => {
    setCommentDrawerOpen(false);
  };

  // Function to open flag drawer
  const openFlagDrawer = () => {
    setFlagDrawerOpen(true);
  };

  const calculateDaysSince = (dateString) => {
    const currentDate = new Date();
    const givenDate = new Date(dateString);
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  // Function to format date as dd/mm/yy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  console.log("stages1", initiativeListStageDetails);

  return (
    <>
      <CommentsSection
        initiativeId={instanceId}
        commentDrawerOpen={commentDrawerOpen}
        setCommentDrawerOpen={setCommentDrawerOpen}
      />
      {/* <InitiativeHistoryDrawer isOpen={setHistoryDrawerOpen} onClose={setHistoryDrawerOpen} /> */}

      <tr>
        <td>
          <div className="initiative-title">
            <Typography variant="body1">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {originator}
            </Typography>
          </div>
        </td>
        <td style={{ textAlign: "start" }}>
          <Typography variant="body2">{processName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {calculateDaysSince(createdOn)}
          </Typography>
        </td>
        <td>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div className="left-side">
              <Typography variant="body2" className="due-in" color="textSecondary">
                Current Stage :{" "}
                <strong style={{ color: "grey" }}>
                  {" "}
                  {initiativeListStageDetails[0]?.requestStage}
                </strong>
              </Typography>
            </div>
            <div className="right-side">
              <Typography variant="body2" className="due-in" color="textSecondary">
                Due In :{" "}
                <strong style={{ color: "grey" }}>{calculateDaysSince(createdOn)} Days</strong>
              </Typography>
            </div>
          </Box>
          <CustomProgressBar stages={initiativeListStageDetails} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div className="left-side">
              <Typography variant="body2" className="due-in" color="textSecondary">
                <strong style={{ color: "grey" }}> {stagesCompleted} </strong> stages completed
              </Typography>
            </div>
            <div className="right-side">
              <Typography variant="body2" className="due-in" color="textSecondary">
                & 0 More stages...
              </Typography>
            </div>
          </Box>
        </td>
        <td>
          <div className="current-stage-container">
            <div className="current-stage">
              <div className="initiative-actions">
                {/* Edit Icon */}
                <div className="icon-button-container">
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        startEditing();
                        SetinitiativesID(instanceId);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="icon-button-container">
                  <Tooltip title="Comment">
                    <IconButton onClick={openCommentDrawer}>
                      <CommentIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="icon-button-container">
                  <Tooltip title="Delay">
                    <IconButton>
                      <AccessTimeIcon onClick={() => setHistoryDrawerOpen(true)} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="icon-button-container">
                  <Tooltip title="Flag">
                    <IconButton onClick={openFlagDrawer}>
                      <FlagIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default InitiativeItem;
