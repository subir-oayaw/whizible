import React from "react";
import InitiativeTable from "./ProjectListTable";
import InitiativeCharts from "./ProjectListCharts";

const ProjectList = () => {
  return (
    <div className="container">
      <InitiativeCharts />
      <div className="mb-2"></div>
      <InitiativeTable />
    </div>
  );
};

export default ProjectList;
