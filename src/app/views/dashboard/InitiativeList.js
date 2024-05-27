import React from "react";
import InitiativeItem from "./InitiativeItem";
import { Box } from "@mui/material";

const ITEMS_PER_PAGE = 2; // Define the number of items per page

const InitiativeList = ({ initiatives, page }) => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const initiativesToShow = initiatives.slice(startIndex, endIndex);

  return (
    <Box>
      {initiativesToShow.map((initiative) => (
        <InitiativeItem key={initiative.id} initiative={initiative} />
      ))}
    </Box>
  );
};

export default InitiativeList;
