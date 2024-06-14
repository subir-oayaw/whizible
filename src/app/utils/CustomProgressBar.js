import React, { useState, useEffect } from "react";
import { Box, Tooltip } from "@mui/material";
import InitiativeDetailsModal from "../views/InitiativeManagement/InitiativeDetailsModal";
import "./customProgressBar.css";

const CustomProgressBar = ({ stages }) => {
  const [stagesCompleted, setStagesCompleted] = useState(0);
  const [totalStages, setTotalStages] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (stages) {
      const stageDetails = stages.inboxForInitiativeDetails || [];
      setTotalStages(stageDetails.length);
      const completedStages = stageDetails.reduce(
        (count, stage) => (stage.isStageApproved ? count + 1 : count),
        0
      );
      setStagesCompleted(completedStages);
    }
  }, [stages]);

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const getStageClass = (index) => {
    if (stagesCompleted === 0) {
      return index === 0 ? "sbar sbar-green sbar-small" : "sbar sbar-gray sbar-small";
    }
    if (index < stagesCompleted) return "sbar sbar-green sbar-small";
    if (index === stagesCompleted) return "sbar sbar-orange sbar-large sbar-current";
    if (index === stagesCompleted + 1) return "sbar sbar-red sbar-small";
    return "sbar sbar-gray sbar-small";
  };

  return (
    <>
      <Box className="progress-container">
        <Box className="progress-bar-wrapper" onClick={handleClick}>
          {stages?.map((stage, index) => (
            <Tooltip key={index} title={`Stage ${index + 1}: ${stage.requestStage}`}>
              <div
                id={`stg-bar-${index + 1}`}
                className={getStageClass(index)}
                data-bs-toggle="tooltip"
                aria-label={`Stage ${index + 1}: ${stage.requestStage}`}
              >
                {stagesCompleted > 0 && (
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
      {/* <InitiativeDetailsModal
        open={openModal}
        handleClose={handleClose}
        initiative={initiative}
        stagesLegend={stagesLegend}
      /> */}
    </>
  );
};

export default CustomProgressBar;
