import React, { useState } from "react";
import InitiativeList from "./InitiativeList";
import { Container, Typography } from "@mui/material";

const InitiativeManagement = () => {
  const [initiatives, setInitiatives] = useState([
    {
      id: "CR-034",
      title: "Metro Small",
      type: "Budget",
      date: "07 Aug 2022",
      stagesCompleted: 6,
      totalStages: 10,
      currentStage: "CEO Approval",
      dueIn: 14
    },
    {
      id: "CR-023",
      title: "Init lorem ipsum title",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 3,
      totalStages: 10,
      currentStage: "CEO Approval",
      dueIn: 14
    }
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Initiative Management
      </Typography>
      <InitiativeList initiatives={initiatives} />
    </Container>
  );
};

export default InitiativeManagement;
