import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import CustomProgressBar from "./CustomProgressBar";
import "./InitiativeItem.css";

const InitiativeItem = ({ initiative }) => {
  const { title, id, type, date, stagesCompleted, totalStages, currentStage, dueIn, stages } =
    initiative;

  return (
    <Box className="initiative-item list-view">
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
        <CustomProgressBar
          stagesCompleted={stagesCompleted}
          totalStages={totalStages}
          stages={stages}
        />
        <Box className="current-stage-container">
          <Typography variant="body2" className="current-stage">
            Current Stage: {currentStage}
          </Typography>
          <Box className="due-in-actions">
            <Typography variant="body2" className="due-in">
              Due in: {dueIn} Days
            </Typography>
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
        </Box>
      </Box>
    </Box>
  );
};

export default InitiativeItem;
