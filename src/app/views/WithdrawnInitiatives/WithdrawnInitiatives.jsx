import React from "react";
import InitiativeTable from "./InitiativeTable";
import InitiativeCharts from "./InitiativeCharts";
import WithdrawnIni from "../../hooks/Withdrawn/WithdrawnIni";
import GetWithdrawInitiativeGraphByOU from "../../hooks/Withdrawn/GetWithdrawInitiativeGraphByOU";
import GetWithdrawInitiativeGraphByStage from "../../hooks/Withdrawn/GetWithdrawInitiativeGraphByStage";
import GetWithdrawInitiativeGraphByMonth from "../../hooks/Withdrawn/GetWithdrawInitiativeGraphByMonth";

const WithdrawnInitiatives = () => {
  const { withdrawnIni } = WithdrawnIni();
  const { WithdrawInitiative2 } = GetWithdrawInitiativeGraphByOU();
  const { WithdrawInitiative3 } = GetWithdrawInitiativeGraphByStage();
  const { WithdrawInitiative1 } = GetWithdrawInitiativeGraphByMonth();
  return (
    <div className="container">
      <InitiativeCharts
        Graph={WithdrawInitiative2}
        NOIData={WithdrawInitiative3}
        ByOUData={WithdrawInitiative1}
      />
      <div className="mb-2"></div>
      <InitiativeTable convertedIni={withdrawnIni} />
    </div>
  );
};

export default WithdrawnInitiatives;
