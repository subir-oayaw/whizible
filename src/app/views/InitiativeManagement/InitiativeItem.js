import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  IconButton,
  Tooltip,
  Drawer,
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import "./InitiativeItem.css";
import { Icon } from "@fluentui/react/lib/Icon";
import { PrimaryButton } from "@fluentui/react/lib/Button"; // Import Fluent UI Button
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import CustomProgressBar from "app/utils/CustomProgressBar";
import CommentsSection from "./CommentsSection";

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
    completedStage,
    employeeName,
    initiativeListStageDetails,
    canEdit
  } = initiative;

  // State for managing drawers and editing
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [flagDrawerOpen, setFlagDrawerOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(-1);
  const [comment, setComment] = useState(null); // Initialize comments with null

  const [stagesCompleted, setStagesCompleted] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [dewdate, setDewdate] = useState(0);
  const [cstageName, setCStageName] = useState(0);
  const [totalStages, setTotalStages] = useState(0);
  const replyTextareaRef = useRef(null);

  // Function to open comment drawer
  const openCommentDrawer = () => {
    setCommentDrawerOpen(true);
  };

  // Function to open flag drawer
  const openFlagDrawer = () => {
    setFlagDrawerOpen(true);
  };

  // Function to handle when user doesn't have edit rights
  const handleDisabledClick = (message) => {
    setModalMessage(message);
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to calculate the number of days since a given date
  const calculateDaysSince = (date) => {
    const now = new Date();
    const diff = now - date;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // Function to format date as dd/mm/yy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };
  console.log("initiativeListStageDetails", initiative);
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
              {employeeName}
            </Typography>
          </div>
        </td>
        <td style={{ textAlign: "start" }}>
          <Typography variant="body2">{processName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {formatDate(new Date(createdOn))}
          </Typography>
        </td>
        <td>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%" // Ensure the container takes full width
            }}
          >
            <div className="left-side">
              <Typography
                variant="body2"
                className="due-in"
                color="textSecondary"
                style={{ fontSize: "0.6rem" }}
              >
                Current Stage : <strong style={{ color: "grey" }}> {cstageName}</strong>
              </Typography>
            </div>
            <div className="right-side" style={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                className="due-in"
                color="textSecondary"
                style={{ fontSize: "0.6rem" }}
              >
                Due In : <strong style={{ color: "grey" }}>{dewdate} Days</strong>
              </Typography>
            </div>
          </Box>

          <CustomProgressBar
            stages={initiativeListStageDetails}
            setDewdate={setDewdate}
            setCStageName={setCStageName}
            percentageOfComplete={initiative?.percentageOfComplete}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div className="left-side">
              <Typography
                variant="body2"
                className="due-in"
                color="textSecondary"
                style={{ fontSize: "0.6rem" }}
              >
                <strong style={{ color: "grey" }}> {completedStage} </strong> stages completed
              </Typography>
            </div>
            <div className="right-side" style={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                className="due-in"
                color="textSecondary"
                style={{ fontSize: "0.6rem" }}
              >
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
                  <Tooltip title={!canEdit ? "No Rights to edit" : ""}>
                    <IconButton
                      onClick={() => {
                        if (canEdit) {
                          startEditing();
                          SetinitiativesID(instanceId);
                        } else {
                          handleDisabledClick("No rights to edit");
                        }
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

      {/* Modal for showing disabled edit message */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Action Not Allowed"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{modalMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InitiativeItem;
