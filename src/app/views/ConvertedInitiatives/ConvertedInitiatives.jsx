import React from "react";
import InitiativeTable from "./InitiativeTable";
import InitiativeCharts from "./InitiativeCharts";
import ConvertedIni from "../../hooks/ConvertedInitiative/ConvertedIni";
import GetConvertedIniGraphByNOI from "../../hooks/ConvertedInitiative/GetConvertedIniGraphByNOI";
import GetConvertedIniGraphByOU from "../../hooks/ConvertedInitiative/GetConvertedIniGraphByOU";
import GetConvertedIniGraphByConvertedTo from "../../hooks/ConvertedInitiative/GetConvertedIniGraphByConvertedTo";

const ConvertedInitiatives = () => {
  const { convertedIni } = ConvertedIni();
  const { ConvertedIni2 } = GetConvertedIniGraphByNOI();
  const { ConvertedIni3 } = GetConvertedIniGraphByOU();
  const { ConvertedIni1 } = GetConvertedIniGraphByConvertedTo();
  console.log("GraphIMPPPP", convertedIni, ConvertedIni3, ConvertedIni2, ConvertedIni1);
  return (
    <div className="container">
      <InitiativeCharts Graph={ConvertedIni3} NOIData={ConvertedIni2} ByOUData={ConvertedIni1} />
      <div className="mb-2"></div>
      <InitiativeTable convertedIni={convertedIni} />
    </div>
  );
};

export default ConvertedInitiatives;
