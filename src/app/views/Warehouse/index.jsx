import React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import CompletedInitiatives from "./CompletedInitiatives";

const CompletedInitiativesList = () => {
  return (
    <div id="initiative-management" className="container">
      <Pivot>
        <PivotItem headerText="Completed Initiatives">
          <CompletedInitiatives />
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default CompletedInitiativesList;
