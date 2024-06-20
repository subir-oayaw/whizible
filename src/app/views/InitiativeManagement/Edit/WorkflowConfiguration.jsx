import React from "react";
import { Stack, Text } from "@fluentui/react";

const WorkflowConfiguration = () => {
  return (
    <div className="details-div py-3">
      <div className="row pt-3">
        <div className="col-sm-12">
          <label className="tital22">1. Stage Configuration</label>
        </div>
      </div>
      <div className="row details-div py-2">
        <div className="col-sm-12 pt-2 pb-2">
          <span className="tital11">
            You are using 'Budget' Nature Of initiative for 'Metro Pune Small' Initiative for
            approval. Click on
            <a
              id="Configurationa"
              href="javascript:;"
              data-bs-toggle="offcanvas"
              data-bs-target="#Stage_Configuration"
            >
              Stage Configurationa
            </a>
            to skip few stages from approval cycle.
          </span>
        </div>
      </div>

      <div className="row pt-3">
        <div className="col-sm-4">
          <label className="tital22 form-label">2. Change Nature of Initiative</label>
          <select
            className="selectpicker"
            aria-label="select Requested By"
            data-live-search="true"
            id="change_nature_Initiative"
          >
            <option>Category</option>
            <option>Plan</option>
          </select>
        </div>
        <div className="col-sm-8 text-start pt-4 mt-2">
          <a
            className="Workflowwye"
            data-bs-toggle="collapse"
            href="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <img
              src="../../WhizibleJQuery/dist/img/eye.svg"
              alt="eye"
              data-bs-toggle="tooltip"
              title="Preview"
            />
          </a>
        </div>
      </div>

      <div className="form-label pt-2">Preview for New Initiative Stages :</div>
      <div className="collapse" id="collapseExample">
        <div className="current-stage mx-3 pe-2" id="current-stage22">
          <div className="c-stage-div">
            <div className="row">
              <div className="c-stages">
                <div className="Ini_ROI-txt">
                  <p>
                    Current stage: <span className="textstrong">Ini_ROI Approval</span>
                  </p>
                </div>
                <div className="due-days">
                  <p>
                    Due in: <span className="textstrong">14 days</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="c-stage-process d-flex align-items-center">
            <div
              className="s-process s-green s-green1"
              data-bs-toggle="offcanvas"
              data-bs-target="#IniInfoDetailsOffcanvas"
            ></div>
            <div
              className="s-process s-green s-green2"
              data-bs-toggle="offcanvas"
              data-bs-target="#IniInfoDetailsOffcanvas"
            ></div>
            <div
              className="s-process s-green s-green3"
              data-bs-toggle="offcanvas"
              data-bs-target="#IniInfoDetailsOffcanvas"
            ></div>
            <div
              className="s-process s-grey s-grey1"
              data-bs-toggle="offcanvas"
              data-bs-target="#IniInfoDetailsOffcanvas"
            ></div>
            <div
              className="s-process s-grey s-grey2"
              data-bs-toggle="offcanvas"
              data-bs-target="#IniInfoDetailsOffcanvas"
            ></div>
            <div
              className="s-process s-grey s-grey3"
              data-bs-toggle="offcanvas"
              data-bs-target="#IniInfoDetailsOffcanvas"
            ></div>
            <div
              className="s-process s-grey s-grey4"
              data-bs-toggle="offcanvas"
              data-bs-target="#IniInfoDetailsOffcanvas"
            ></div>
            <div
              className="s-process s-grey s-grey5"
              data-bs-toggle="offcanvas"
              data-bs-target="#IniInfoDetailsOffcanvas"
            ></div>
          </div>
        </div>
      </div>

      <div className="col-sm-12 ">
        If you need new approval cycle,{" "}
        <a
          id="approval_cycle"
          href="javascript:;"
          data-bs-toggle="offcanvas"
          data-bs-target="#ChangenatureOffcanvas"
        >
          Click here
        </a>
      </div>
    </div>
  );
};

export default WorkflowConfiguration;
