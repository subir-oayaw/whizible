import React from "react";
import { Stack, Text } from "@fluentui/react";

const WorkflowStages = () => {
  return (
    <div className="container-fluid">
      <div className="stages-div px-2 mt-3 mb-2" id="stages-div1">
        <div className="stage-status d-flex justify-content-between">
          <div className="stage-title">
            <h5 className="mb-0">Legends</h5>
          </div>
          <div className="stage-content d-flex">
            <ul className="list-unstyled main-box">
              <li className="d-flex gap-1 ms-3">
                <div className="StageboxDiv clearedStage"></div>
                <div className="span-clrs">Cleared stage</div>
              </li>
            </ul>
            <ul className="list-unstyled main-box">
              <li className="d-flex gap-1 ms-3">
                <div className="StageboxDiv pendingStage"></div>
                <div className="span-clrs">Current stage</div>
              </li>
            </ul>
            <ul className="list-unstyled main-box">
              <li className="d-flex gap-1 ms-3">
                <div className="StageboxDiv currStage"></div>
                <div className="span-clrs">Delayed current stage</div>
              </li>
            </ul>
            <ul className="list-unstyled main-box">
              <li className="d-flex gap-1 ms-3">
                <div className="StageboxDiv notstartStage"></div>
                <div className="span-clrs">Stage not started yet</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="current-stage mx-3" id="current-stage11">
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
            className="s-process s-yellow text-center"
            data-bs-toggle="offcanvas"
            data-bs-target="#IniInfoDetailsOffcanvas"
          >
            <a href="javascript:;" title="Current Stage">
              30% Completed [3/10]
            </a>
          </div>
          <div
            className="s-process s-red"
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
  );
};

export default WorkflowStages;
