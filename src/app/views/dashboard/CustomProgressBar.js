import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import "./customProgressBar.css";

const CustomProgressBar = ({ stagesCompleted, totalStages, stages }) => {
  return (
    <Box className="progress-container">
      <Box className="progress-bar-wrapper">
        {stages.map((stage, index) => (
          <Box key={index} className="progress-segment-container">
            <Box className={`progress-segment ${index < stagesCompleted ? "completed" : ""}`}>
              {index < stagesCompleted ? (
                <React.Fragment>
                  <CheckCircleIcon className="completed-icon" style={{ fontSize: 30 }} />
                  {index < stages.length - 1 && <div className="completed-line" />}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {index === stagesCompleted ? (
                    <ScheduleIcon
                      className="not-completed-icon"
                      style={{ top: "-9px", color: "#f5c330", fontSize: 30 }}
                    />
                  ) : (
                    <CircleIcon
                      className="not-completed-icon"
                      style={{ top: "-9px", fontSize: 30 }}
                    />
                  )}
                  {index < stages.length - 1 && <div className="not-completed-line" />}
                </React.Fragment>
              )}
            </Box>
            <Typography className="stage-name">{stage}</Typography>
          </Box>
        ))}
      </Box>
      <Typography className="progress-text">
        {((stagesCompleted / totalStages) * 100).toFixed(0)}% Completed [{stagesCompleted}/
        {totalStages}]
      </Typography>
    </Box>
  );
};

export default CustomProgressBar;
