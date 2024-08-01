import React from "react";
import InitiativeTable from "./InitiativeTable";
import InitiativeCharts from "./InitiativeCharts";

const WithdrawnInitiatives = ({ data, loading, error }) => {
  return (
    <div className="container">
      <InitiativeCharts />
      <div className="mb-2"></div>
      <InitiativeTable data={data} loading={loading} error={error} />
    </div>
  );
};

export default WithdrawnInitiatives;
