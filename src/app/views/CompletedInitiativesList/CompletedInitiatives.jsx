import React from "react";
import InitiativeTable from "./InitiativeTable";
import InitiativeCharts from "./InitiativeCharts";

const CompletedInitiatives = () => {
  return (
    <div className="container">
      <InitiativeCharts />
      <div className="mb-2"></div>
      <InitiativeTable />
    </div>
  );
};

export default CompletedInitiatives;
