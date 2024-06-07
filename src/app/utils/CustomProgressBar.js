import React, { useState } from "react";
import { Box, Tooltip } from "@mui/material";
import InitiativeDetailsModal from "../views/InitiativeManagement/InitiativeDetailsModal";
import "./customProgressBar.css";

const CustomProgressBar = ({ stagesCompleted, totalStages, stages, initiative, stagesLegend }) => {
  const [openModal, setOpenModal] = useState(false);
  console.log("initiative", initiative);
  const handleClick = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const getStageClass = (index) => {
    const stageIndex = index + 1; // Adjust index to start from 1
    if (stageIndex < stagesCompleted) return "sbar sbar-green sbar-small";
    if (stageIndex === stagesCompleted) return "sbar sbar-orange sbar-large sbar-current";
    if (stageIndex === stagesCompleted + 1) return "sbar sbar-red sbar-small";
    return "sbar sbar-gray sbar-small";
  };

  return (
    <>
      <Box className="progress-container">
        <Box className="progress-bar-wrapper" onClick={handleClick}>
          {stages.map((stage, index) => (
            <Tooltip key={index} title={`Stage ${index + 1}`}>
              <div
                id={`stg-bar-${index + 1}`}
                className={getStageClass(index)}
                data-bs-toggle="tooltip"
                aria-label={`Stage ${index + 1}`}
              >
                {index === stagesCompleted - 1 && (
                  <a
                    href="javascript:;"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#IniMDetailsOffcanvas"
                    data-bs-placement="top"
                    style={{ zIndex: 2, position: "relative", fontSize: "smaller" }}
                    className="progress-text"
                  >
                    {`${((stagesCompleted / totalStages) * 100).toFixed(0)}% Completed`}
                  </a>
                )}
              </div>
            </Tooltip>
          ))}
        </Box>
      </Box>
      <InitiativeDetailsModal
        open={openModal}
        handleClose={handleClose}
        initiative={initiative}
        stagesLegend={stagesLegend}
      />
    </>
  );
};

export default CustomProgressBar;
