// ROIComponent.js

import React from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import Table from "react-bootstrap/Table";

const ROIComponent = () => {
  return (
    <div className="tab-pane" id="Ini_ROI">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <label className="textstrong ps-2">ROI</label>
          </div>
          <div className="col-12 col-sm-6">
            <div id="ROItopActions" className="toprightactionsCol text-end pe-2">
              <PrimaryButton
                id="addBtn_roi"
                className="btn closelink add-new4"
                data-bs-toggle="offcanvas"
                data-bs-target="#iniROIOffcanvas"
              >
                <span data-bs-toggle="tooltip" data-bs-original-title="Add">
                  <i className="fa-solid fa-plus"></i>Add
                </span>
              </PrimaryButton>
              <PrimaryButton
                id="deleteBtn_roi"
                className="btn closelink add-new1"
                data-bs-toggle="tooltip"
                data-bs-original-title="Delete"
              >
                Delete
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div id="Project_Grid_panel_5" className="init_grid_panel m-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Projected ROI</th>
              <th className="text-center">
                <div className="custom_chckbox">
                  <input id="dltAllroi" className="chckHead" type="checkbox" />
                  <label htmlFor="dltAllroi"></label>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="tbodyROI">
            {[...Array(10)].map((_, index) => (
              <tr key={`roi-${index}`} className="TR_ROI">
                <td>
                  <a
                    href="javascript:;"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#iniROIOffcanvas"
                  >
                    January
                  </a>
                </td>
                <td>2024</td>
                <td>6,21,75,838</td>
                <td className="text-center">
                  <div className="custom_chckbox">
                    <input
                      id={`checkroi${index + 1}`}
                      className="chckHead main_roichck"
                      type="checkbox"
                    />
                    <label htmlFor={`checkroi${index + 1}`}></label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="clearfix"></div>
      <div id="IMROI_pagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>
    </div>
  );
};

export default ROIComponent;
