import React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import { IconButton, Stack, Checkbox, ProgressIndicator, TooltipHost } from "@fluentui/react";
import "bootstrap/dist/css/bootstrap.min.css";

const MoreActions = () => {
  return (
    <div className="tab-pane py-0" id="Ini_more">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <Pivot>
              <PivotItem headerText="Risks">
                <TooltipHost content="Risks">
                  <span>Risks</span>
                </TooltipHost>
              </PivotItem>
              <PivotItem headerText="Prioritization checklist">
                <TooltipHost content="Prioritization checklist">
                  <span>Prioritization checklist</span>
                </TooltipHost>
              </PivotItem>
              <PivotItem headerText="Action items">
                <TooltipHost content="Action items">
                  <span>Action items</span>
                </TooltipHost>
              </PivotItem>
            </Pivot>
          </div>
          <div className="col-12 col-sm-6">{/* Additional content if needed */}</div>
        </div>

        <div className="tab-content">
          <div id="tbl_moreaction_Risks" className="tab-pane active py-0">
            <Stack horizontal horizontalAlign="end" className="pe-2">
              <TooltipHost content="Add Risk">
                <IconButton iconProps={{ iconName: "Add" }} ariaLabel="Add Risk" />
              </TooltipHost>
              <TooltipHost content="Delete">
                <IconButton iconProps={{ iconName: "Delete" }} ariaLabel="Delete" />
              </TooltipHost>
            </Stack>

            <div className="table-responsive table_wrapper">
              <table
                className="table table-hover init-stickytable mb-0 table_Documents"
                id="Tbl_ini_moreaction_Risks"
              >
                <thead>
                  <tr className="sm-wid">
                    <th>Risks</th>
                    <th>Probability</th>
                    <th>Impact</th>
                    <th width="19%">Rationale</th>
                    <th>Status</th>
                    <th>Identified on</th>
                    <th>Identified by</th>
                    <th width="5%" className="text-center">
                      <Checkbox />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="9">
                      <strong>Financial</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#" data-bs-toggle="offcanvas" data-bs-target="#AddRiskoffcanvas">
                        Risk Managed
                      </a>
                    </td>
                    <td>1</td>
                    <td>2</td>
                    <td>Minor Impact on cost and medium impact on schedule.</td>
                    <td>Identified</td>
                    <td>15/05/2023</td>
                    <td>Sayali</td>
                    <td className="sm-wid text-center">
                      <Checkbox />
                    </td>
                  </tr>
                  {/* Additional rows as needed */}
                </tbody>
              </table>
            </div>

            <div className="prob-matrix-sec" id="prob_matrix_sec">
              <div className="prob_title_div ms-4 mb-3">{/* Title content if needed */}</div>
              <div className="main-prob-matrix" id="prob_matrix_main">
                <div className="row d-flex">
                  <div className="col-2 col-sm-1 txt-spacing d-flex justify-content-end align-items-center p-0">
                    <div className="prob_txt_div">
                      <span className="prob_txt">Probability</span>
                    </div>
                  </div>
                  <div className="col-9 col-sm-8 col-md-6 col-lg-5 col-xl-4 p-0 m-0">
                    <div className="prob_impact_matrix" id="prob_impact_matrix_div">
                      {/* Probability matrix content */}
                    </div>
                    <div className="prob_footer_div">
                      <div className="matrix_footer_txt text-center">Impact</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-pane py-0" id="tbl_Prioritization">
            <div className="accordion Init_acordian_panel mb-3" id="Prioriti_accor1">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading_Prioriti">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#PhscollapseTHREE"
                    aria-expanded="true"
                  >
                    Prioritization Checklist Details
                  </button>
                </h2>
                <div
                  id="PhscollapseTHREE"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                >
                  <div className="accordion-body">
                    <div className="row gx-1">
                      <div className="col-sm-6">
                        <div className="table-responsive table_wrapper">
                          <table className="table table-hover init-stickytable mb-0">
                            <thead>
                              <tr>
                                <th>Responded By</th>
                                <th>Priority Checklist</th>
                                <th>Priority Rating</th>
                                <th>Stage</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Sam</td>
                                <td>
                                  <a
                                    role="button"
                                    data-bs-toggle="collapse"
                                    data-parent="#accordion"
                                    href="#PhscollapseTwo"
                                    aria-expanded="true"
                                  >
                                    <span className="infoToggler togglerup float-end"></span>
                                    Prioritization Checklist First
                                  </a>
                                </td>
                                <td>
                                  <ProgressIndicator percentComplete={0.75} />
                                </td>
                                <td>CFO Approval</td>
                              </tr>
                              {/* Additional rows as needed */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="table-responsive table_wrapper">
                          <table className="table table-hover mb-0">
                            <thead>
                              <tr>
                                <th>Category</th>
                                <th>Category Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Finance</td>
                                <td>
                                  <ProgressIndicator percentComplete={0.5} />
                                </td>
                              </tr>
                              {/* Additional rows as needed */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional accordions and tabs as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreActions;
