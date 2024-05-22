import React from "react";
import { Box, Typography, Paper, Grid, IconButton, Tooltip, LinearProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import "./InitiativeItem.css";

const InitiativeItem = ({ initiative }) => {
  const { title, id, type, date, stagesCompleted, totalStages, currentStage, dueIn } = initiative;
  const progress = (stagesCompleted / totalStages) * 100;

  return (
    <Paper elevation={3} className="initiative-item">
      <Box className="initiative-header">
        <Box className="initiative-title">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {id}
          </Typography>
        </Box>
        <Box className="initiative-details">
          <Typography variant="body2" color="textSecondary">
            {type}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {date}
          </Typography>
        </Box>
      </Box>
      <Box className="initiative-progress-container">
        <Box className="initiative-progress">
          <Box className="progress-bar-container">
            <LinearProgress
              variant="determinate"
              value={progress}
              className={`progress-bar ${
                progress < 50 ? "progress-bar-warning" : "progress-bar-normal"
              }`}
            />
          </Box>
          <Typography variant="body2" className="progress-text">
            {`${stagesCompleted}/${totalStages} Completed`}
          </Typography>
        </Box>
        <Box className="current-stage">
          <Typography variant="body2">{currentStage}</Typography>
          <Typography variant="body2" className="due-in">
            Due in: {dueIn} Days
          </Typography>
        </Box>
      </Box>
      <Box className="initiative-actions">
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delay">
          <IconButton>
            <AccessTimeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Flag">
          <IconButton>
            <FlagIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default InitiativeItem;
