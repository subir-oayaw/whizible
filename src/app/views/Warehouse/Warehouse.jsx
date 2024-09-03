import React from "react";
import InitiativeTable from "./InitiativeTable";
import InitiativeCharts from "./InitiativeCharts";
import WareHouseIni from "../../hooks/WareHouse/WareHouseIni"; // Ensure that you use the correct hook name
import GetConvertedIniGraphByNOI from "../../hooks/WareHouse/GetConvertedIniGraphByNOI";
import GetConvertedIniGraphByOU from "../../hooks/WareHouse/GetConvertedIniGraphByOU";
import GetConvertedIniGraphByConvertedTo from "../../hooks/WareHouse/GetConvertedIniGraphByConvertedTo";

const Warehouse = () => {
  const { wareHouseIni } = WareHouseIni();
  const { ConvertedIni2 } = GetConvertedIniGraphByNOI();
  const { ConvertedIni3 } = GetConvertedIniGraphByOU();
  const { ConvertedIni1 } = GetConvertedIniGraphByConvertedTo();
  console.log("ConvertedIni24", ConvertedIni2);
  console.log("ConvertedIni241", ConvertedIni3);
  console.log("ConvertedIni242", ConvertedIni1);
  return (
    <div className="container">
      <InitiativeCharts Graph={ConvertedIni3} NOIData={ConvertedIni2} ByOUData={ConvertedIni1} />
      <div className="mb-2"></div>
      <InitiativeTable wareHouseIni={wareHouseIni} />
    </div>
  );
};

export default Warehouse;
