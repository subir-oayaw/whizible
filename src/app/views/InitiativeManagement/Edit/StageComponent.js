// StageComponent.js

import React from "react";
import Table from "react-bootstrap/Table";

const StageComponent = () => {
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
              <th>Nature of demand</th>
              <th>Order no</th>
              <th>Stage name</th>
              <th className="text-center">Approvers</th>
            </tr>
          </thead>
          <tbody className="tbodystage">
            {[...Array(7)].map((_, index) => (
              <tr key={`stage-${index}`} className="TR_stages">
                <td>Organizational Approval</td>
                <td>{11 + index}</td>
                <td>Start</td>
                <td className="text-center">Admin</td>
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
