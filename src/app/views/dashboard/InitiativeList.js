import React from "react";
import InitiativeItem from "./InitiativeItem";
import { Box } from "@mui/material";

const InitiativeList = ({ initiatives }) => {
  return (
    <Box width="100%">
      {initiatives.map((initiative) => (
        <InitiativeItem key={initiative.id} initiative={initiative} />
      ))}
    </Box>
  );
};

export default InitiativeList;
