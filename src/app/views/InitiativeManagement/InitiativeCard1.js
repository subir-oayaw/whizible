import React, { useState, useEffect } from "react";

import "./InitiativeCard1.css"; // Custom CSS for card styles
import CustomProgressBar from "app/utils/CustomProgressBar";
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
      <Card className="initiative-card1 ">
        <CardContent className="card-content">
          <div className="content">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" component="div">
                {initiative.title}
              </Typography>
              {/* Dots Icon */}
              <IconButton
                aria-label="more"
                aria-controls="menu-card"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              {/* Dropdown Menu */}
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
            {/* Other content of the card */}
            <Typography variant="body2" color="text.secondary">
              {initiative.nature}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
              <Typography variant="body2" className="due-in" color="textSecondary">
                Current Stage:{" "}
                <strong style={{ color: "grey" }}>
                  {inboxForInitiativeDetails[0]?.requestStage}
                </strong>
              </Typography>
              <Typography
                variant="body2"
                className="due-in"
                color="textSecondary"
                style={{ textAlign: "right", flex: 1 }}
              >
                Due In:{" "}
                <strong style={{ color: "grey" }}>{calculateDaysSince(createdOn)} Days</strong>
              </Typography>
            </Box>
            <div className="stagesLegendContainer">
              <CustomProgressBar stages={inboxForInitiativeDetails} />
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px"
              }}
            >
              <Typography variant="body2" className="due-in" color="textSecondary">
                <strong style={{ color: "grey" }}>{stagesCompleted}</strong> stages completed
              </Typography>
              <Typography
                variant="body2"
                className="due-in"
                color="textSecondary"
                style={{ textAlign: "right" }}
              >
                & 0 More stages...
              </Typography>
            </Box>
          </div>
          <Divider sx={{ my: 2 }} /> {/* Horizontal line */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={originator?.profileImageUrl} alt={originator?.name} />
            <Typography variant="body2" color="textSecondary" style={{ marginLeft: "8px" }}>
              Created By: {originator?.name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <CommentSection
        initiativeId={instanceId}
        commentDrawerOpen={commentDrawerOpen}
        setCommentDrawerOpen={setCommentDrawerOpen}
      />
      {/* <InitiativeHistoryDrawer isOpen={setHistoryDrawerOpen} onClose={setHistoryDrawerOpen} /> */}
    </>
  );
};

export default InitiativeCard;
