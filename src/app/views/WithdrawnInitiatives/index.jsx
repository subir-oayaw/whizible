import React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import WithdrawnInitiatives from "./WithdrawnInitiatives";

const CompletedInitiativesList = () => {
  return (
    <div id="initiative-management" className="container">
      <Pivot>
        <PivotItem headerText="Completed Initiatives">
          <WithdrawnInitiatives />
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default CompletedInitiativesList;
