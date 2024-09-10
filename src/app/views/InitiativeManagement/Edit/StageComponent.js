import React from "react";
import Table from "react-bootstrap/Table";

const StageComponent = ({ stageData }) => {
  // Sort the stageData by orderno
  const sortedStageData = [...stageData.data.listInitiativeStageListEntity].sort(
    (a, b) => a.orderno - b.orderno
  );

  return (
    <div className="tab-pane" id="Ini_Stage">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <label className="textstrong ps-2">Stage</label>
          </div>
        </div>
      </div>
      <div id="Project_Grid_panel_6" className="init_grid_panel m-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nature of Demand</th>
              <th>Order No</th>
              <th>Stage Name</th>
              <th className="text-center">Approvers</th>
            </tr>
          </thead>
          <tbody className="tbodystage">
            {sortedStageData.map((stage, index) => (
              <tr key={`stage-${index}`} className="TR_stages">
                <td>{stage.natureofDemand}</td>
                <td>{stage.orderno}</td>
                <td>{stage.requestStage}</td>
                <td className="text-center">{stage.stakeHolderNames}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="clearfix"></div>
      <div id="IMstages_pagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>
    </div>
  );
};

export default StageComponent;
