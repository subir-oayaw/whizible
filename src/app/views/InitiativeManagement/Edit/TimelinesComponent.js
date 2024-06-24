// TimelinesComponent.js

import React from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Modal } from "react-bootstrap";

const TimelinesComponent = () => {
  return (
    <div className="tab-pane" id="Ini_Timelines">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <label className="textstrong ps-2">Timelines</label>
          </div>
          <div className="col-12 col-sm-6">
            <div id="TimelinestopActions" className="toprightactionsCol text-end pe-2">
              <PrimaryButton
                id="addhistory"
                className="btn closelink add-new6"
                data-bs-toggle="tooltip"
                data-bs-original-title="History"
              >
                <span data-bs-toggle="offcanvas" data-bs-target="#timeline_historyOffcanvas">
                  History
                </span>
              </PrimaryButton>
              <PrimaryButton
                id="saveInitBtn_timeline"
                className="btn btnblue"
                data-bs-toggle="tooltip"
                title="Save"
              >
                <span data-bs-toggle="modal" data-bs-target="#timeline_save_comment">
                  Save
                </span>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div id="Project_Grid_panel_7" className="init_grid_panel m-3">
        <div className="table_wrapper stageGridPanel">
          <table
            className="table_Workorder table table-hover init-stickytable mb-0"
            id="Tbl_ini_Timelines"
          >
            <thead>
              <tr>
                <th>Nature of initiatives</th>
                <th>Stage</th>
                <th>Resource/Approver</th>
                <th width="14%">Planned in date</th>
                <th width="14%">Planned out date</th>
                <th width="10%">Planned TAT</th>
                <th>Actual in date</th>
                <th>Actual out date</th>
                <th className="text-center">Actual TAT</th>
              </tr>
            </thead>
            <tbody className="tbodyROI">
              <tr className="TRtimelines">
                <td>Organizational Ap...</td>
                <td>Start</td>
                <td>Submitted By : Admin</td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan1StartDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan1StartDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light border-start-0 d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan1EndDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan1EndDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td className="IMrequired d-flex">
                  <input
                    className="form-control input-sm text-center required"
                    placeholder="00"
                    type="text"
                    id="inputROItext1"
                  />
                </td>
                <td>10 Aug 2022</td>
                <td>10 Aug 2022</td>
                <td className="text-center">0</td>
              </tr>

              <tr className="TRtimelines">
                <td></td>
                <td>CEO Approval</td>
                <td>Madeleine Swann, Robin</td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan2StartDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan2StartDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light border-start-0 d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan2EndDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan2EndDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    className="form-control input-sm text-center"
                    placeholder="00"
                    type="text"
                    id="inputROItext2"
                  />
                </td>
                <td>10 Aug 2022</td>
                <td>10 Aug 2022</td>
                <td className="text-center">1</td>
              </tr>

              <tr className="TRtimelines">
                <td></td>
                <td>CEO Approval</td>
                <td>Kavya, Madeleine Swann, Nirbhay, Rob Miller, Robin, Sam</td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan3StartDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan3StartDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light border-start-0 d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan3EndDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan3EndDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light border-start-0 d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    className="form-control input-sm text-center"
                    placeholder="00"
                    type="text"
                    id="inputROItext3"
                  />
                </td>
                <td>10 Aug 2022</td>
                <td>10 Aug 2022</td>
                <td className="text-center">0</td>
              </tr>

              <tr className="TRtimelines">
                <td></td>
                <td>Completed</td>
                <td>Stake Holders</td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan4StartDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan4StartDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light border-start-0 d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="input-group datefield">
                    <div className="col-sm-2 input-group date datepicker" id="Plan4EndDate">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        id="date_Plan4EndDate"
                        placeholder="Select Date"
                      />
                      <span className="input-group-append">
                        <span className="input-group-text bg-light d-block">
                          <img src="../../WhizibleJQuery/dist/img/Datepicker.svg" alt="" />
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    className="form-control input-sm text-center"
                    placeholder="00"
                    type="text"
                    id="txtplannedin"
                  />
                </td>
                <td>10 Aug 2022</td>
                <td>10 Aug 2022</td>
                <td className="text-center">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="clearfix"></div>
      <div id="IMTimelines_pagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>
    </div>
  );
};

export default TimelinesComponent;
