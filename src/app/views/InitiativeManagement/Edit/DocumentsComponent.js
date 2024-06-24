// DocumentsComponent.js

import React from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";

const DocumentsComponent = () => {
  return (
    <div className="tab-pane" id="Ini_Documents">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-3 text-start">
            <label className="textstrong ps-2">Documents</label>
          </div>
          <div className="col-12 col-sm-9">
            <div id="Documents_topActions" className="toprightactionsCol text-end pe-2">
              <PrimaryButton className="tital1" data-bs-toggle="tooltip" title="Download template">
                Download template
              </PrimaryButton>
              &nbsp;
              <PrimaryButton
                className="tital1"
                data-bs-toggle="modal"
                data-bs-target="#Doc_uploadTab"
                title="Upload document"
              >
                Upload document
              </PrimaryButton>
              &nbsp;
              <PrimaryButton
                className="btn nostylebtn closelink"
                data-bs-toggle="modal"
                data-bs-target="#stageActionAttachURLModal"
              >
                Attach URL
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div id="Project_Grid_panel_8" className="init_grid_panel m-3">
        <div className="table_wrapper stageGridPanel">
          <table
            className="table_document table table-hover init-stickytable mb-0"
            id="Tbl_ini_mainDocuments"
          >
            <thead className="IM_document">
              <tr className="cart-table-head">
                <th>Documents name</th>
                <th>Documents category</th>
                <th>Uploaded by</th>
                <th>Uploaded date</th>
                <th>Last modified</th>
                <th width="7%">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="TRDocument">
                <td>Organizational Approval</td>
                <td width="26%">
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapsed_etaildata_One"
                  >
                    Functional Specifications
                  </a>
                </td>
                <td>Start</td>
                <td>Admin</td>
                <td>10 Aug 2022</td>
                <td className="text-center">
                  <a
                    href="javascript:;"
                    className="historyicon"
                    data-bs-toggle="modal"
                    data-bs-target="#Document_history"
                  >
                    <img
                      src="../../WhizibleJQuery/dist/img/history.svg"
                      alt="Flag"
                      data-bs-toggle="tooltip"
                      title="History"
                    />
                  </a>
                  <a href="javascript:;">
                    <img
                      src="../../WhizibleJQuery/dist/img/Delete.svg"
                      alt="Flag"
                      data-bs-toggle="tooltip"
                      title="Delete"
                    />
                  </a>
                </td>
              </tr>
              <tr className="TRDocument">
                <td></td>
                <td>
                  <div id="collapsed_etaildata_One" className="panel-collapse collapse in mt-3">
                    <div className="panel-body">
                      <div className="form-group row mb-3">
                        <div className="col-sm-12 form-group">
                          <div className="form-group row">
                            <div className="col-sm-7 form-group">
                              <label className="form-label IM_label text-start">
                                Document Name(Latest)
                              </label>
                            </div>
                            <div className="col-sm-5 form-group">
                              <label className="form-label IM_label text-start">
                                <a href="javascript:;">Screenshot (1).png</a>
                              </label>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-7 form-group">
                              <label className="form-label IM_label text-start">Uploaded By:</label>
                            </div>
                            <div className="col-sm-5 form-group">
                              <label className="form-label IM_label text-start">Admin</label>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-7 form-group">
                              <label className="form-label IM_label text-start">Upload Date:</label>
                            </div>
                            <div className="col-sm-5 form-group">
                              <label className="form-label IM_label text-start">25/05/2023</label>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-7">
                              <label className="form-label IM_label text-start">
                                File Size(KB):
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <label className="form-label IM_label text-start">130.48</label>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-7">
                              <label className="form-label IM_label text-start">
                                Last Modified:
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <label className="form-label IM_label text-start">25/05/2023</label>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-7">
                              <label className="form-label IM_label text-start">Review:</label>
                            </div>
                            <div className="col-sm-5">
                              <label className="form-label IM_label text-start">
                                <span>
                                  <a
                                    href="javascript:;"
                                    data-bs-toggle="modal"
                                    data-bs-target="#Doc_review_modal"
                                  >
                                    Review
                                  </a>
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-7">
                              <label className="form-label IM_label text-start">History:</label>
                            </div>
                            <div className="col-sm-5">
                              <label className="form-label IM_label text-start">
                                <span>
                                  <a
                                    href="javascript:;"
                                    data-bs-toggle="modal"
                                    data-bs-target="#Document_history"
                                  >
                                    History
                                  </a>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {/* Additional rows as per your data */}
            </tbody>
          </table>
        </div>
      </div>

      <div className="clearfix"></div>
      <div id="IMDocument_pagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>
    </div>
  );
};

export default DocumentsComponent;
