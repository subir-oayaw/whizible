import React, { useState, useEffect } from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown, DatePicker } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import currentstage from "../../../../assets/img/currentstage.svg";

function BasicDetailEdit({ formData, buttonData, handleFieldChange, handleGoBack }) {
  // Default number of tabs to show
  const [formDataState, setFormDataState] = useState({
    natureOfInitiative: "",
    initiativeCode: "",
    businessGroup: null,
    organizationUnit: null,
    plannedStart: null,
    plannedEnd: null
  });
  const renderDynamicButtons = () => {
    return buttonData.map((button, index) => {
      if (button.display) {
        return (
          <PrimaryButton key={index} className="topbtnblue" onClick={button.onClick}>
            <span>{button.label}</span>
          </PrimaryButton>
        );
      }
      return null;
    });
  };
  const renderFormElements = () => {
    return formData?.map((field, index) => {
      switch (field.type) {
        case "TextField":
          return field.display ? (
            <div key={index} className="col-md-4 mt-2 form-group">
              <TextField
                label={field.label}
                placeholder={field.placeholder}
                value={formDataState[field.stateKey] || ""}
                onChange={(ev, newValue) => handleFieldChange(newValue, field.stateKey)}
                required={field.required}
              />
            </div>
          ) : null;
        case "Dropdown":
          return field.display ? (
            <div key={index} className="col-md-4 mt-2 form-group">
              <Dropdown
                label={field.label}
                placeholder={field.placeholder}
                options={field.options}
                selectedKey={formDataState[field.stateKey]}
                onChange={(ev, item) => handleFieldChange(item ? item.key : null, field.stateKey)}
              />
            </div>
          ) : null;
        case "DatePicker":
          return field.display ? (
            <div key={index} className="col-md-4 mt-2 form-group">
              <DatePicker
                label={field.label}
                placeholder={field.placeholder}
                value={formDataState[field.stateKey]}
                onSelectDate={(date) => handleFieldChange(date, field.stateKey)}
                isRequired={field.isRequired}
              />
            </div>
          ) : null;
        default:
          return null;
      }
    });
  };
  return (
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
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
          {renderDynamicButtons()}
          <PrimaryButton className="topbtnblue" onClick={handleGoBack}>
            <span>Back</span>
          </PrimaryButton>
        </Stack>
      </div>
      <div className="form-group row mt-3">
        <div className="col-sm-12 text-end form-group">
          <label className="form- display: true,label IM_label">
            (<font color="red">*</font> Mandatory)
          </label>
        </div>
      </div>
      <form>
        <div className="form-group row mb-2">{renderFormElements()}</div>
      </form>
    </div>
  );
}

export default BasicDetailEdit;
