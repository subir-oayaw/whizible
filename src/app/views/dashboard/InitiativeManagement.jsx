import React, { useState } from "react";
import InitiativeList from "./InitiativeList";
import { Container, Typography, Button, Box } from "@mui/material";

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
      dueIn: 14,
      stages: [
        "Initiation",
        "Planning",
        "Execution",
        "Monitoring",
        "Control",
        "CEO Approval",
        "Review",
        "Approval",
        "Implementation",
        "Completion"
      ]
    },
    {
      id: "CR-023",
      title: "Init lorem ipsum title",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 3,
      totalStages: 10,
      currentStage: "CEO Approval",
      dueIn: 14,
      stages: [
        "Initiation",
        "Planning",
        "Execution",
        "Monitoring",
        "Control",
        "CEO Approval",
        "Review",
        "Approval",
        "Implementation",
        "Completion"
      ]
    },
    {
      id: "CR-023",
      title: "Init lorem ipsum title",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 9,
      totalStages: 10,
      currentStage: "Execution",
      dueIn: 14,
      stages: [
        "Initiation",
        "Planning",
        "Execution",
        "Monitoring",
        "Control",
        "CEO Approval",
        "Review",
        "Approval",
        "Implementation",
        "Completion"
      ]
    },
    {
      id: "CR-023",
      title: "Init lorem ipsum title",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 5,
      totalStages: 10,
      currentStage: "CEO Approval",
      dueIn: 14,
      stages: [
        "Initiation",
        "Planning",
        "Execution",
        "Monitoring",
        "Control",
        "CEO Approval",
        "Review",
        "Approval",
        "Implementation",
        "Completion"
      ]
    },
    {
      id: "CR-023",
      title: "Init lorem ipsum title",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 6,
      totalStages: 10,
      currentStage: "CEO Approval",
      dueIn: 14,
      stages: [
        "Initiation",
        "Planning",
        "Execution",
        "Monitoring",
        "Control",
        "CEO Approval",
        "Review",
        "Approval",
        "Implementation",
        "Completion"
      ]
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(initiatives.length / 2); // Calculate total pages based on number of initiatives and items per page

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Initiative Management
      </Typography>
      <InitiativeList initiatives={initiatives} page={currentPage} />
      {initiatives.length > 2 && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </Button>
          <Typography variant="body1" sx={{ margin: "0 16px" }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Page
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default InitiativeManagement;
