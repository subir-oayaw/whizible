import React from "react";
import InitiativeItem from "./InitiativeItem";
import { Box } from "@mui/material";

const InitiativeList = ({ initiatives }) => {
  return (
    <Box>
      {initiatives.map((initiative) => (
        <InitiativeItem key={initiative.id} initiative={initiative} />
      ))}
    </Box>
  );
};

export default InitiativeList;
