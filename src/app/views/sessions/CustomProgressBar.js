import React from "react";
import { Box, Typography } from "@mui/material";
import "./CustomProgressBar.css";

const CustomProgressBar = ({ stagesCompleted, totalStages }) => {
  const progressPercentage = (stagesCompleted / totalStages) * 100;

  return (
    <Box className="progress-container">
      <Box className="progress-bar-wrapper">
        {[...Array(totalStages)].map((_, index) => (
          <Box
            key={index}
            className={`progress-segment ${
              index < stagesCompleted
                ? "completed"
                : index === stagesCompleted
                ? "current"
                : index === stagesCompleted + 1
                ? "next"
                : "not-completed"
            }`}
          />
        ))}
      </Box>
      <Typography className="progress-text">
        {progressPercentage.toFixed(0)}% Completed [{stagesCompleted}/{totalStages}]
      </Typography>
    </Box>
  );
};

export default CustomProgressBar;
