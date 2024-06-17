import React, { useState } from "react";
import { Nav, Tab, Row, Col } from "react-bootstrap";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown, DatePicker } from "@fluentui/react";

import { Stack } from "@fluentui/react/lib/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import currentstage from "../../../assets/img/currentstage.svg";
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
  const [plannedStart, setPlannedStart] = useState(null);
  const [plannedEnd, setPlannedEnd] = useState(null);
  const [initiativeSubmissionDate, setInitiativeSubmissionDate] = useState(null);
  const [requestedBy, setRequestedBy] = useState(null);
  const [objectives, setObjectives] = useState("");
  const [conceptualizationStart, setConceptualizationStart] = useState(null);
  const [conceptualizationEnd, setConceptualizationEnd] = useState(null);
  const [conceptualizationComments, setConceptualizationComments] = useState("");
  const [plannedSolutioningStart, setPlannedSolutioningStart] = useState(null);
  const [plannedSolutioningEnd, setPlannedSolutioningEnd] = useState(null);
  const [solutioningComments, setSolutioningComments] = useState("");
  const [plannedExecutionStart, setPlannedExecutionStart] = useState(null);
  const [plannedExecutionEnd, setPlannedExecutionEnd] = useState(null);
  const [executionComments, setExecutionComments] = useState("");
  const [plannedAcceptanceStart, setPlannedAcceptanceStart] = useState(null);
  const [plannedAcceptanceEnd, setPlannedAcceptanceEnd] = useState(null);
  const [acceptanceComments, setAcceptanceComments] = useState("");
  const [customFieldText1, setCustomFieldText1] = useState("");
  const [customFieldText2, setCustomFieldText2] = useState("");
  const [customFieldText3, setCustomFieldText3] = useState("");
  const [customFieldText4, setCustomFieldText4] = useState("");
  const [customFieldText5, setCustomFieldText5] = useState("");
  const [customFieldNumeric1, setCustomFieldNumeric1] = useState("");
  const [customFieldNumeric2, setCustomFieldNumeric2] = useState("");
  const [customFieldNumeric3, setCustomFieldNumeric3] = useState("");
  const [customFieldNumeric4, setCustomFieldNumeric4] = useState("");
  const [customFieldNumeric5, setCustomFieldNumeric5] = useState("");
  const [customFieldDate1, setCustomFieldDate1] = useState(null);
  const [customFieldDate2, setCustomFieldDate2] = useState(null);
  const [customFieldDate3, setCustomFieldDate3] = useState(null);
  const [customTextArea1, setCustomTextArea1] = useState("");
  const [customTextArea2, setCustomTextArea2] = useState("");
  const [customTextArea3, setCustomTextArea3] = useState("");
  const [natureOfInitiative, setNatureOfInitiative] = useState("");
  const [initiativeCode, setInitiativeCode] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handler for date picker change
  const handleDateChange = (date, fieldName) => {
    switch (fieldName) {
      case "plannedStart":
        setPlannedStart(date);
        break;
      case "plannedEnd":
        setPlannedEnd(date);
        break;
      case "initiativeSubmissionDate":
        setInitiativeSubmissionDate(date);
        break;
      case "conceptualizationStart":
        setConceptualizationStart(date);
        break;
      case "conceptualizationEnd":
        setConceptualizationEnd(date);
        break;
      case "plannedSolutioningStart":
        setPlannedSolutioningStart(date);
        break;
      case "plannedSolutioningEnd":
        setPlannedSolutioningEnd(date);
        break;
      case "plannedExecutionStart":
        setPlannedExecutionStart(date);
        break;
      case "plannedExecutionEnd":
        setPlannedExecutionEnd(date);
        break;
      case "plannedAcceptanceStart":
        setPlannedAcceptanceStart(date);
        break;
      case "plannedAcceptanceEnd":
        setPlannedAcceptanceEnd(date);
        break;
      case "customFieldDate1":
        setCustomFieldDate1(date);
        break;
      case "customFieldDate2":
        setCustomFieldDate2(date);
        break;
      case "customFieldDate3":
        setCustomFieldDate3(date);
        break;
      default:
        break;
    }
  };
  const handleEmojiSelect = (emojiId) => {
    setSelectedEmoji(emojiId);
    // Handle emoji selection logic here if needed
  };
  // Dropdown options
  const requestedByOptions = [
    { key: "bobc1", text: "Bob C1" },
    { key: "bobc2", text: "Bob C2" }
  ];
  const businessGroupOptions = [
    { key: "bg1", text: "Construction-1" },
    { key: "bg2", text: "Construction-2" },
    { key: "bg3", text: "Construction-3" },
    { key: "bg4", text: "Construction-4" }
  ];

  const organizationUnitOptions = [
    { key: "ou1", text: "Pune" },
    { key: "ou2", text: "Mumbai" },
    { key: "ou3", text: "UK" },
    { key: "ou4", text: "Pune" }
  ];

  const deliveryUnitOptions = [
    { key: "du1", text: "Pune" },
    { key: "du2", text: "Construction2" },
    { key: "du3", text: "3" },
    { key: "du4", text: "4" }
  ];

  const deliveryTeamOptions = [
    { key: "dt1", text: "Alpha" },
    { key: "dt2", text: "Petrol" }
  ];

  const projectManagerOptions = [
    { key: "pm1", text: "Michel Stark" },
    { key: "pm2", text: "Michel Stark" }
  ];

  const sponsorOptions = [
    { key: "s1", text: "-" },
    { key: "s2", text: "-" }
  ];

  const sizeOptions = [
    { key: "high", text: "High" },
    { key: "medium", text: "Medium" },
    { key: "low", text: "Low" }
  ];

  const applicationOptions = [
    { key: "app1", text: "Application 1" },
    { key: "app2", text: "Application 2" }
  ];

  const resourceApproachOptions = [
    { key: "high", text: "High" },
    { key: "close", text: "Close" }
  ];

  const reportingFrequencyOptions = [
    { key: "high", text: "High" },
    { key: "low", text: "Low" }
  ];

  const handleFileUpload = (event) => {
    // Handle file upload logic here
  };

  const handleSelectIcon = (emojiId) => {
    // Handle emoji selection logic here
  };

  return (
    <div>
      <div id="IMInfopgtabs" className="IM_tabs bglightblue">
        <Nav variant="tabs" defaultActiveKey={`#${tabData[0].id}`}>
          {tabData?.map((tab) => (
            <Nav.Item key={tab.id}>
              <Nav.Link href={`#${tab.id}`}>{tab.title}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      <div className="container-fluid mt-3">
        <div className="d-flex align-items-center">
          <div className="iniCurrStageTxt">
            <div className="stagesofinititative ps-lg-2 ps-xl-4">
              <small>(Nature Of Initiative)</small>
            </div>
            <div className="d-flex align-items-center">
              <div className="currStageImg">
                <a
                  href="#!"
                  className=""
                  id="current_Imgstage"
                  data-bs-toggle="tooltip"
                  title="Current Stage"
                  data-bs-placement="bottom"
                >
                  <img src={currentstage} alt="" />
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
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
              <PrimaryButton className="topbtnblue">
                <span>Push back</span>
              </PrimaryButton>
              <PrimaryButton className="topbtnblue">
                <span>Approve</span>
              </PrimaryButton>
              <PrimaryButton className="topbtnblue">
                <span>Withdraw Initiative</span>
              </PrimaryButton>
              <PrimaryButton className="topbtnblue">
                <span>Save</span>
              </PrimaryButton>
              <PrimaryButton className="topbtnblue">
                <span>Save & Draft</span>
              </PrimaryButton>
              <PrimaryButton className="topbtnblue">
                <span>Send</span>
              </PrimaryButton>
              <PrimaryButton className="topbtnblue">
                <span>Submit</span>
              </PrimaryButton>
              <PrimaryButton className="topbtnblue" onClick={handleGoBack}>
                <span>Back</span>
              </PrimaryButton>
            </Stack>
          </div>
        </div>
        <div className="form-group row mt-3">
          <div className="col-sm-12 text-end form-group">
            <label className="form-label IM_label">
              (<font color="red">*</font> Mandatory)
            </label>
          </div>
        </div>

        <form>
          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group required">
              <TextField
                label="Nature Of Initiative"
                placeholder="Enter nature of initiative"
                value={natureOfInitiative}
                onChange={(ev, newValue) => setNatureOfInitiative(newValue)}
                required
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="Initiative Code"
                placeholder="Enter initiative code"
                value={initiativeCode}
                onChange={(ev, newValue) => setInitiativeCode(newValue)}
              />
            </div>

            <div className="col-md-4 mt-2 form-group">
              <label>Select Initiative Icon (Upload)</label>
              <input
                type="file"
                name="initiative_icon_upload"
                onChange={handleFileUpload}
                className="form-control-file"
              />
              {selectedFile && <p>Selected file: {selectedFile.name}</p>}
            </div>
          </div>

          {/* Initiative icon selection and file upload */}

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group required">
              <Dropdown
                label="Business Group"
                placeholder="Select Business Group"
                options={businessGroupOptions}
                required
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <Dropdown
                label="Organization Unit"
                placeholder="Select Organization Unit"
                options={organizationUnitOptions}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <Dropdown
                label="Delivery Unit"
                placeholder="Select Delivery Unit"
                options={deliveryUnitOptions}
              />
            </div>
          </div>
          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <Dropdown
                label="Delivery Team"
                placeholder="Select Delivery Team"
                options={deliveryTeamOptions}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <Dropdown
                label="Project Manager"
                placeholder="Select Project Manager"
                options={projectManagerOptions}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <Dropdown label="Sponsor" placeholder="Select Sponsor" options={sponsorOptions} />
            </div>
          </div>
          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="Overall Initiative Effort (PD)"
                placeholder="Enter overall initiative effort"
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <Dropdown label="Size" placeholder="Select Size" options={sizeOptions} />
            </div>
            <div className="col-md-4 mt-2 form-group required">
              <Dropdown
                label="Application"
                placeholder="Select Application"
                options={applicationOptions}
                required
              />
            </div>
          </div>
          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <Dropdown
                label="Resource Approach"
                placeholder="Select Resource Approach"
                options={resourceApproachOptions}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <Dropdown
                label="Initiative Reporting Frequency"
                placeholder="Select Initiative Reporting Frequency"
                options={reportingFrequencyOptions}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField label="Vendor" placeholder="Enter vendor name" defaultValue="L&T" />
            </div>
          </div>
          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group required">
              <DatePicker
                label="Planned High Level Start Date"
                placeholder="Select date"
                value={plannedStart}
                onSelectDate={(date) => handleDateChange(date, "plannedStart")}
                isRequired
              />
            </div>
            <div className="col-md-4 mt-2 form-group required">
              <DatePicker
                label="Planned High Level End Date"
                placeholder="Select date"
                value={plannedEnd}
                onSelectDate={(date) => handleDateChange(date, "plannedEnd")}
                isRequired
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="Initiative Submission Date"
                placeholder="Select date"
                value={initiativeSubmissionDate}
                onSelectDate={(date) => handleDateChange(date, "initiativeSubmissionDate")}
              />
            </div>
          </div>

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <Dropdown
                label="Requested By"
                placeholder="Select"
                options={requestedByOptions}
                selectedKey={requestedBy}
                onChange={(ev, item) => setRequestedBy(item ? item.key : null)}
              />
            </div>
          </div>

          {/* Horizontal line separator */}
          <hr />

          <div className="form-group row mb-2">
            <div className="col-md-12 mt-2 form-group">
              <TextField
                label="Objectives and Planned Results of Proposed Program"
                placeholder="Enter objectives"
                multiline
                rows={3}
                value={objectives}
                onChange={(ev, newValue) => setObjectives(newValue)}
              />
            </div>
          </div>

          {/* Horizontal line separator */}
          <hr />

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group required">
              <DatePicker
                label="Conceptualization Start Date"
                placeholder="Select date"
                value={conceptualizationStart}
                onSelectDate={(date) => handleDateChange(date, "conceptualizationStart")}
                isRequired
              />
            </div>
            <div className="col-md-4 mt-2 form-group required">
              <DatePicker
                label="Conceptualization End Date"
                placeholder="Select date"
                value={conceptualizationEnd}
                onSelectDate={(date) => handleDateChange(date, "conceptualizationEnd")}
                isRequired
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="Conceptualization Comments"
                placeholder="Enter comments"
                multiline
                rows={3}
                value={conceptualizationComments}
                onChange={(ev, newValue) => setConceptualizationComments(newValue)}
              />
            </div>
          </div>

          {/* Horizontal line separator */}
          <hr />

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="Planned Solutioning Start Date"
                placeholder="Select date"
                value={plannedSolutioningStart}
                onSelectDate={(date) => handleDateChange(date, "plannedSolutioningStart")}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="Planned Solutioning End Date"
                placeholder="Select date"
                value={plannedSolutioningEnd}
                onSelectDate={(date) => handleDateChange(date, "plannedSolutioningEnd")}
              />
            </div>
          </div>

          {/* Horizontal line separator */}
          <hr />

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="Solutioning Comments"
                placeholder="Enter comments"
                multiline
                rows={3}
                value={solutioningComments}
                onChange={(ev, newValue) => setSolutioningComments(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="Planned Execution Start Date"
                placeholder="Select date"
                value={plannedExecutionStart}
                onSelectDate={(date) => handleDateChange(date, "plannedExecutionStart")}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="Planned Execution End Date"
                placeholder="Select date"
                value={plannedExecutionEnd}
                onSelectDate={(date) => handleDateChange(date, "plannedExecutionEnd")}
              />
            </div>
          </div>

          {/* Horizontal line separator */}
          <hr />
          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="Planned Acceptance Start Date"
                placeholder="Select date"
                value={plannedAcceptanceStart}
                onSelectDate={(date) => handleDateChange(date, "plannedAcceptanceStart")}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="Planned Acceptance End Date"
                placeholder="Select date"
                value={plannedAcceptanceEnd}
                onSelectDate={(date) => handleDateChange(date, "plannedAcceptanceEnd")}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="Acceptance Comments"
                placeholder="Enter comments"
                multiline
                rows={3}
                value={acceptanceComments}
                onChange={(ev, newValue) => setAcceptanceComments(newValue)}
              />
            </div>
          </div>

          {/* Horizontal line separator */}
          <hr />

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldText1"
                placeholder="Enter text"
                value={customFieldText1}
                onChange={(ev, newValue) => setCustomFieldText1(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldText2"
                placeholder="Enter text"
                value={customFieldText2}
                onChange={(ev, newValue) => setCustomFieldText2(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldText3"
                placeholder="Enter text"
                value={customFieldText3}
                onChange={(ev, newValue) => setCustomFieldText3(newValue)}
              />
            </div>
          </div>

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldText4"
                placeholder="Enter text"
                value={customFieldText4}
                onChange={(ev, newValue) => setCustomFieldText4(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldText5"
                placeholder="Enter text"
                value={customFieldText5}
                onChange={(ev, newValue) => setCustomFieldText5(newValue)}
              />
            </div>
          </div>

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldNumeric1"
                placeholder="Enter number"
                value={customFieldNumeric1}
                onChange={(ev, newValue) => setCustomFieldNumeric1(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldNumeric2"
                placeholder="Enter number"
                value={customFieldNumeric2}
                onChange={(ev, newValue) => setCustomFieldNumeric2(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldNumeric3"
                placeholder="Enter number"
                value={customFieldNumeric3}
                onChange={(ev, newValue) => setCustomFieldNumeric3(newValue)}
              />
            </div>
          </div>

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldNumeric4"
                placeholder="Enter number"
                value={customFieldNumeric4}
                onChange={(ev, newValue) => setCustomFieldNumeric4(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomFieldNumeric5"
                placeholder="Enter number"
                value={customFieldNumeric5}
                onChange={(ev, newValue) => setCustomFieldNumeric5(newValue)}
              />
            </div>
          </div>

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="CustomFieldDate1"
                placeholder="Select date"
                value={customFieldDate1}
                onSelectDate={(date) => handleDateChange(date, "customFieldDate1")}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="CustomFieldDate2"
                placeholder="Select date"
                value={customFieldDate2}
                onSelectDate={(date) => handleDateChange(date, "customFieldDate2")}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <DatePicker
                label="CustomFieldDate3"
                placeholder="Select date"
                value={customFieldDate3}
                onSelectDate={(date) => handleDateChange(date, "customFieldDate3")}
              />
            </div>
          </div>

          <div className="form-group row mb-2">
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomTextArea1"
                placeholder="Enter text"
                multiline
                rows={3}
                value={customTextArea1}
                onChange={(ev, newValue) => setCustomTextArea1(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomTextArea2"
                placeholder="Enter text"
                multiline
                rows={3}
                value={customTextArea2}
                onChange={(ev, newValue) => setCustomTextArea2(newValue)}
              />
            </div>
            <div className="col-md-4 mt-2 form-group">
              <TextField
                label="CustomTextArea3"
                placeholder="Enter text"
                multiline
                rows={3}
                value={customTextArea3}
                onChange={(ev, newValue) => setCustomTextArea3(newValue)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
