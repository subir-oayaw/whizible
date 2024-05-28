import React from "react";
import { Typography, IconButton, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import CustomProgressBar from "./CustomProgressBar";
import "./InitiativeItem.css";

const InitiativeItem = ({ initiative }) => {
  const { title, id, type, date, stagesCompleted, totalStages, currentStage, dueIn, stages } =
    initiative;

  return (
    <tr>
      <td>
        <div className="initiative-title">
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {id}
          </Typography>
        </div>
      </td>
      <td style={{ textAlign: "start" }}>
        <Typography variant="body2">{type}</Typography>
        <Typography variant="body2" color="textSecondary">
          {date}
        </Typography>
      </td>
      <td>
        <div className="left-side">
          <Typography variant="body2" className="due-in" color="textSecondary">
            {dueIn} Days
          </Typography>
        </div>

        <CustomProgressBar
          stagesCompleted={stagesCompleted}
          totalStages={totalStages}
          stages={stages}
        />
        <Typography variant="body2" color="textSecondary">
          {stagesCompleted} stages completed
        </Typography>
      </td>
      <td>
        <div className="current-stage-container">
          <div className="current-stage">
            <div className="initiative-actions">
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
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default InitiativeItem;
