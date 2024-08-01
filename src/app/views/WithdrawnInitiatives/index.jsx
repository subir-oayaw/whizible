import React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import WithdrawnInitiatives from "./WithdrawnInitiatives";
import useWithdrawnIni from "../../hooks/useWithdrawnIni";

const WithdrawnInitiativesList = () => {
  const { withdrawnIni: data, loading, error } = useWithdrawnIni();

  return (
    <div id="initiative-management" className="container">
      <Pivot>
        <PivotItem headerText="Withdrawn Initiatives">
          <WithdrawnInitiatives data={data} loading={loading} error={error} />
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default WithdrawnInitiativesList;
