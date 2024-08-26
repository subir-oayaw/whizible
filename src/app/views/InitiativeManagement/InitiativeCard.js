import React, { useState, useEffect } from "react";

import "./InitiativeCard.css"; // Custom CSS for card styles
// import CustomProgressBar from "app/utils/CustomProgressBar";
// import InitiativeHistoryDrawer from "./InitiativeHistoryDrawer";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import icon for the vertical dots
import CommentSection from "./CommentsSection";

const InitiativeCard = ({ initiative, setIsEditing, startEditing, stopEditing }) => {
  const [stagesCompleted, setStagesCompleted] = useState(0);
  const [totalStages, setTotalStages] = useState(0);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const { title, createdOn, inboxForInitiativeDetails, instanceId, originator } = initiative;
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  console.log("InitiativeCard", initiative);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewEdit = () => {
    startEditing();
  };

  const handleInitiativeHistory = () => {
    // Implement action for Initiative History
    // Example: open offcanvas for initiative history
    handleClose();
  };

  const handleFlagInitiative = () => {
    // Implement action for Flag Initiative
    // Example: open offcanvas for flagging initiative
    handleClose();
  };

  const handleDiscussions = () => {
    setCommentDrawerOpen(true);
    handleClose();
  };

  const calculateDaysSince = (dateString) => {
    const currentDate = new Date();
    const givenDate = new Date(dateString);
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  useEffect(() => {
    if (inboxForInitiativeDetails) {
      const stageDetails = inboxForInitiativeDetails || [];
      setTotalStages(stageDetails.length);
      const completedStages = stageDetails.filter((stage) => stage.isStageApproved).length;
      setStagesCompleted(completedStages);
    }
  }, [inboxForInitiativeDetails]);

  return (
    <>
      <Card className="initiative-card ">
        <CardContent className="card-content">
          <div className="content">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" component="div">
                {initiative.title}
              </Typography>
              <IconButton
                aria-label="more"
                aria-controls="menu-card"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-card"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleViewEdit}>View/Edit</MenuItem>
                <MenuItem onClick={handleInitiativeHistory}>Initiative History</MenuItem>
                <MenuItem onClick={handleFlagInitiative}>Flag Initiative</MenuItem>
                <MenuItem onClick={handleDiscussions}>Discussions</MenuItem>
              </Menu>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Nature of Demand: {initiative.natureofDemandID}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
              <Typography variant="body2" className="due-in" color="textSecondary">
                Current Stage:{" "}
                <strong style={{ color: "grey" }}>
                  {initiative.initiativeListStageDetails[0]?.stageName}
                </strong>
              </Typography>
              <Typography
                variant="body2"
                className="due-in"
                color="textSecondary"
                style={{ textAlign: "right", flex: 1 }}
              >
                Due In:{" "}
                <strong style={{ color: "grey" }}>
                  {calculateDaysSince(initiative.createdOn)} Days
                </strong>
              </Typography>
            </Box>

            {/* <div className="stagesLegendContainer">
              <CustomProgressBar stages={initiative.initiativeListStageDetails} />
            </div> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px"
              }}
            >
              <Typography variant="body2" className="due-in" color="textSecondary">
                <strong style={{ color: "grey" }}>{initiative.completedStage}</strong> stages
                completed
              </Typography>
              <Typography
                variant="body2"
                className="due-in"
                color="textSecondary"
                style={{ textAlign: "right" }}
              >
                & {initiative.totalNoOfStage - initiative.completedStage} more stages...
              </Typography>
            </Box>
          </div>
          <Divider sx={{ my: 2 }} /> {/* Horizontal line */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={initiative.originator?.profileImageUrl} alt={initiative.originatorName} />
            <Typography variant="body2" color="textSecondary" style={{ marginLeft: "8px" }}>
              Created By: {initiative.originatorName}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <CommentSection
        initiativeId={initiative.id}
        commentDrawerOpen={commentDrawerOpen}
        setCommentDrawerOpen={setCommentDrawerOpen}
      />
    </>
  );
};

export default InitiativeCard;
