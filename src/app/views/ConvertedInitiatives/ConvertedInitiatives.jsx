import React from "react";
import InitiativeTable from "./InitiativeTable";
import InitiativeCharts from "./InitiativeCharts";
import ConvertedIni from "../../hooks/ConvertedInitiative/ConvertedIni";
import GetConvertedIniGraphByNOI from "../../hooks/ConvertedInitiative/GetConvertedIniGraphByNOI";
import GetConvertedIniGraphByOU from "../../hooks/ConvertedInitiative/GetConvertedIniGraphByOU";
import GetConvertedIniGraphByConvertedTo from "../../hooks/ConvertedInitiative/GetConvertedIniGraphByConvertedTo";

const ConvertedInitiatives = () => {
  const { convertedIni } = ConvertedIni();
  const { Graph } = GetConvertedIniGraphByNOI();
  const { NOIData } = GetConvertedIniGraphByOU();
  const { ByOUData } = GetConvertedIniGraphByConvertedTo();
  return (
    <div className="container">
      <InitiativeCharts Graph={Graph} NOIData={NOIData} ByOUData={ByOUData} />
      <div className="mb-2"></div>
      <InitiativeTable convertedIni={convertedIni} />
    </div>
  );
};

export default ConvertedInitiatives;
