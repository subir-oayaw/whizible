import React, { useState, useEffect } from "react";
import "./InitiativeCard2.css"; // Custom CSS for card styles
import CustomProgressBar from "app/utils/CustomProgressBar";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Chip
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import icon for the vertical dots
import CommentSection from "./CommentsSection";

const InitiativeCard2 = ({ dashboardData1, startEditing }) => {
  const [stagesCompleted, setStagesCompleted] = useState(0);
  const [totalStages, setTotalStages] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);

  console.log("Extract3", dashboardData1);

  // Extract data from dashboardData2
  const {
    title,
    createdOn,
    demandCode,
    employeeName,
    alertType,
    processName,
    percentageOfComplete,
    completedStage,
    noOfStageRemain,
    totalNoOfStage,
    instanceId,
    originator
  } = dashboardData1 || {};

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
    handleClose();
  };

  const handleFlagInitiative = () => {
    // Implement action for Flag Initiative
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
    setTotalStages(totalNoOfStage || 0);
    setStagesCompleted(completedStage || 0);
  }, [totalNoOfStage, completedStage]);

  // Render "No data" if dashboardData2 is empty or null
  if (!dashboardData1) {
    return (
      <Card className="initiative-card2">
        <CardContent className="card-content">
          <Typography variant="h6" component="div">
            No data
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="initiative-card2">
        <CardContent className="card-content">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              {title || "No Title"}
            </Typography>

            <IconButton
              aria-label="more"
              aria-controls="menu-card"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu id="menu-card" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleViewEdit}>View/Edit</MenuItem>
              <MenuItem onClick={handleInitiativeHistory}>Initiative History</MenuItem>
              <MenuItem onClick={handleFlagInitiative}>Flag Initiative</MenuItem>
              <MenuItem onClick={handleDiscussions}>Discussions</MenuItem>
            </Menu>
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Demand Code: {demandCode}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Process Name: {processName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Created On: {new Date(createdOn).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Stages Completed: {stagesCompleted}/{totalStages}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Remaining Stages: {noOfStageRemain}
          </Typography>
          <Divider sx={{ my: 2 }} /> {/* Horizontal line */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ ml: 2 }}></Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={originator?.profileImageUrl}
              sx={{ cursor: "pointer", width: 30, height: 30 }}
              alt={originator?.name}
            />
            <Typography variant="body2" color="textSecondary" style={{ marginLeft: "8px" }}>
              Created By: {employeeName || "Unknown"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <CommentSection
        initiativeId={instanceId}
        commentDrawerOpen={commentDrawerOpen}
        setCommentDrawerOpen={setCommentDrawerOpen}
      />
    </>
  );
};

export default InitiativeCard2;
