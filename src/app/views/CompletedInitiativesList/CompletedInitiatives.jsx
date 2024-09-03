import React from "react";
import InitiativeTable from "./InitiativeTable";
import InitiativeCharts from "./InitiativeCharts";
import CompletedIni from "../../hooks/CompletedInitiative/CompletedIni"; // Ensure that you use the correct hook name
import GetConvertedIniGraphByNOI from "../../hooks/CompletedInitiative/GetConvertedIniGraphByNOI";
import GetConvertedIniGraphByOU from "../../hooks/CompletedInitiative/GetConvertedIniGraphByOU";
import GetConvertedIniGraphByConvertedTo from "../../hooks/CompletedInitiative/GetConvertedIniGraphByConvertedTo";

const CompletedInitiatives = () => {
  const { completedIni } = CompletedIni();
  const { ConvertedIni2 } = GetConvertedIniGraphByNOI();
  const { ConvertedIni3 } = GetConvertedIniGraphByOU();
  const { ConvertedIni1 } = GetConvertedIniGraphByConvertedTo();
  console.log("CompletedIni", completedIni);
  console.log("Graph-cc", ConvertedIni3, ConvertedIni2, ConvertedIni1);
  return (
    <div className="container">
      <InitiativeCharts Graph={ConvertedIni3} NOIData={ConvertedIni2} ByOUData={ConvertedIni1} />
      <div className="mb-2"></div>
      <InitiativeTable completedIni={completedIni} />
    </div>
  );
};

export default CompletedInitiatives;
