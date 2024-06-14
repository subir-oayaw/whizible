import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { useHistory } from "react-router-dom";

import { Dropdown, TextField, DefaultButton } from "@fluentui/react";
import { ComboBox } from "@fluentui/react/lib/ComboBox";

const tabData = [
  {
    id: "basic-details",
    title: "Basic Details",
    content: (
      <>
        <h3>Basic Details</h3>
        <p>Content related to basic details goes here.</p>
      </>
    )
  },
  {
    id: "resources",
    title: "Resources",
    content: (
      <>
        <h3>Resources</h3>
        <p>Content related to resources goes here.</p>
      </>
    )
  },
  {
    id: "cost",
    title: "Cost",
    content: (
      <>
        <h3>Cost</h3>
        <p>Content related to cost goes here.</p>
      </>
    )
  },
  {
    id: "work-order",
    title: "Work Order",
    content: (
      <>
        <h3>Work Order</h3>
        <p>Content related to work order goes here.</p>
      </>
    )
  },
  {
    id: "funding",
    title: "Funding",
    content: (
      <>
        <h3>Funding</h3>
        <p>Content related to funding goes here.</p>
      </>
    )
  },
  {
    id: "roi",
    title: "ROI",
    content: (
      <>
        <h3>ROI</h3>
        <p>Content related to ROI goes here.</p>
      </>
    )
  },
  {
    id: "stage",
    title: "Stage",
    content: (
      <>
        <h3>Stage</h3>
        <p>Content related to stage goes here.</p>
      </>
    )
  },
  {
    id: "timelines",
    title: "Timelines",
    content: (
      <>
        <h3>Timelines</h3>
        <p>Content related to timelines goes here.</p>
      </>
    )
  },
  {
    id: "documents",
    title: "Documents",
    content: (
      <>
        <h3>Documents</h3>
        <p>Content related to documents goes here.</p>
      </>
    )
  },
  {
    id: "workflows",
    title: "Workflows",
    content: (
      <>
        <h3>Workflows</h3>
        <p>Content related to workflows goes here.</p>
      </>
    )
  },
  {
    id: "more-actions",
    title: "More Actions",
    content: (
      <>
        <h3>More Actions</h3>
        <p>Content related to more actions goes here.</p>
      </>
    )
  },
  {
    id: "discussion-thread",
    title: "Discussion Thread",
    content: (
      <>
        <h3>Discussion Thread</h3>
        <p>Content related to discussion thread goes here.</p>
      </>
    )
  },
  {
    id: "initiative-history",
    title: "Initiative History",
    content: (
      <>
        <h3>Initiative History</h3>
        <p>Content related to initiative history goes here.</p>
      </>
    )
  }
];

const EditPage = () => {
  const handleGoBack = () => {
    window.history.back(); // Navigate back in browser history
  };

  return (
    <div>
      <div id="IMInfopgtabs" className="IM_tabs bglightblue">
        <Nav variant="tabs" defaultActiveKey={`#${tabData[0].id}`}>
          {tabData.map((tab) => (
            <Nav.Item key={tab.id}>
              <Nav.Link href={`#${tab.id}`}>{tab.title}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      <div className="container-fluid mt-3">
        <div className="d-flex align-items-center">
          <div className="iniBasicDetailsTxt">
            <label className="textstrong">Basic details</label>
          </div>
          <div className="iniCurrStageTxt">
            <div className="stagesofinititative ps-lg-2 ps-xl-4">
              <small>(Nature Of Initiative)</small>
            </div>
            <div className="d-flex align-items-center">
              <div className="currStageImg">
                <a
                  href="javascript:;"
                  className=""
                  id="current_Imgstage"
                  data-bs-toggle="tooltip"
                  title="Current Stage"
                  data-bs-placement="bottom"
                >
                  <img src="../../WhizibleJQuery/dist/img/currentstage.svg" alt="" />
                </a>
              </div>
              <div className="currStageTxt w_text ps-2">
                Current&nbsp;stage&nbsp;:&nbsp;
                <span className="textstrong main_approval mx-0" id="name_approvalTop">
                  CFO Approval
                </span>
              </div>
            </div>
          </div>
          <div className="iniInfoAllBtns ms-auto">
            <ul className="iniInfoBtns list-unstyled d-flex align-items-center gap-0 pe-0 justify-content-end">
              <li>
                <PrimaryButton className="topbtnblue">
                  <span>[Push back]</span>
                </PrimaryButton>
              </li>
              <li>
                <PrimaryButton className="topbtnblue">
                  <span>[Approve]</span>
                </PrimaryButton>
              </li>
              <li>
                <PrimaryButton className="topbtnblue">
                  <span>[Withdraw Initiative]</span>
                </PrimaryButton>
              </li>
              <li>
                <PrimaryButton className="topbtnblue">
                  <span>[Save]</span>
                </PrimaryButton>
              </li>
              <li>
                <PrimaryButton className="topbtnblue">
                  <span>[Save & Draft]</span>
                </PrimaryButton>
              </li>
              <li>
                <PrimaryButton className="topbtnblue">
                  <span>[Send]</span>
                </PrimaryButton>
              </li>
              <li>
                <PrimaryButton className="topbtnblue">
                  <span>[Submit]</span>
                </PrimaryButton>
              </li>
              <li>
                <PrimaryButton className="topbtnblue" onClick={handleGoBack}>
                  <span>[Back]</span>
                </PrimaryButton>
              </li>
            </ul>
          </div>
        </div>
        <div className="form-group row mt-3">
          <div className="col-sm-12 text-end form-group">
            <label className="form-label IM_label">
              (<font color="red">*</font> Mandatory)
            </label>
          </div>
        </div>
      </div>

      <Tab.Content>
        {tabData.map((tab) => (
          <Tab.Pane key={tab.id} eventKey={`#${tab.id}`}>
            {tab.content}
          </Tab.Pane>
        ))}
      </Tab.Content>

      <div className="mt-3 text-end">
        <PrimaryButton>Save</PrimaryButton>
      </div>
    </div>
  );
};

export default EditPage;
