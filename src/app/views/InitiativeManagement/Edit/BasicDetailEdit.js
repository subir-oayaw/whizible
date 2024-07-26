import React, { useState } from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown, DatePicker } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import { Modal } from "@fluentui/react/lib/Modal";
import { getTheme, mergeStyleSets } from "@fluentui/react/lib/Styling";
import "bootstrap/dist/css/bootstrap.min.css";
import currentstage from "../../../../assets/img/currentstage.svg";

// Get theme to use its spacing
const theme = getTheme();

const classNames = mergeStyleSets({
  modal: {
    maxWidth: "40vw",
    width: "40vw",
    maxHeight: "80vh",
    padding: theme.spacing.m,
    selectors: {
      [".ms-Modal-scrollableContent"]: {
        overflowY: "auto",
        padding: theme.spacing.m
      }
    }
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${theme.spacing.s1} ${theme.spacing.m}`,
    borderBottom: `1px solid ${theme.palette.neutralLight}`
  },
  body: {
    padding: theme.spacing.m
  },
  footer: {
    padding: `${theme.spacing.s1} ${theme.spacing.m}`,
    borderTop: `1px solid ${theme.palette.neutralLight}`,
    display: "flex",
    justifyContent: "flex-end"
  }
});

function BasicDetailEdit({ initiativesID, formData, buttonData, handleFieldChange, handleGoBack }) {
  const [formDataState, setFormDataState] = useState({
    natureOfInitiative: "",
    initiativeCode: initiativesID,
    businessGroup: null,
    organizationUnit: null,
    plannedStart: null,
    plannedEnd: null
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [comments, setComments] = useState("");

  const openModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setComments("");
  };

  const renderDynamicButtons = () => {
    return buttonData.map((button, index) => {
      if (button.display) {
        return (
          <PrimaryButton key={index} className="topbtnblue" onClick={() => openModal(button.label)}>
            <span>{button.label}</span>
          </PrimaryButton>
        );
      }
      return null;
    });
  };

  const renderFormElements = () => {
    return formData?.map((field, index) => {
      const isDisabled = field.stateKey === "initiativeCode";
      return field.display ? (
        <div key={index} className={`${classNames.formGroup} col-md-4 mt-2 form-group`}>
          {field.type === "TextField" ? (
            <TextField
              label={field.label}
              placeholder={field.placeholder}
              value={formDataState[field.stateKey] || ""}
              onChange={(ev, newValue) => {
                if (!isDisabled) {
                  setFormDataState({ ...formDataState, [field.stateKey]: newValue });
                  handleFieldChange(newValue, field.stateKey);
                }
              }}
              required={field.required}
              readOnly={isDisabled}
              className={isDisabled ? classNames.disabledInput : ""}
            />
          ) : field.type === "Dropdown" ? (
            <Dropdown
              label={field.label}
              placeholder={field.placeholder}
              options={field.options}
              selectedKey={formDataState[field.stateKey]}
              onChange={(ev, item) => {
                const value = item ? item.key : null;
                setFormDataState({ ...formDataState, [field.stateKey]: value });
                handleFieldChange(value, field.stateKey);
              }}
            />
          ) : field.type === "DatePicker" ? (
            <DatePicker
              label={field.label}
              placeholder={field.placeholder}
              value={formDataState[field.stateKey]}
              onSelectDate={(date) => {
                setFormDataState({ ...formDataState, [field.stateKey]: date });
                handleFieldChange(date, field.stateKey);
              }}
              isRequired={field.isRequired}
            />
          ) : null}
        </div>
      ) : null;
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
      <form>
        <div className="form-group row mt-3">
          <div className="col-sm-12 text-end form-group">
            <label className="form- display: true,label IM_label">
              (<font color="red">*</font> Mandatory)
            </label>
          </div>
        </div>
        <div className="form-group row mb-2">{renderFormElements()}</div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onDismiss={closeModal}
        isBlocking={false}
        containerClassName={classNames.modal} // Apply custom styles here
      >
        <div className={classNames.header}>
          <h5 className="modal-title">{modalTitle}</h5>
          <button type="button" className="close" aria-label="Close" onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className={classNames.body}>
          <TextField
            label="Comments"
            placeholder="Enter comments"
            value={comments}
            onChange={(ev, newValue) => setComments(newValue)}
            required
          />
        </div>
        <div className={classNames.footer}>
          <PrimaryButton onClick={closeModal}>
            <span>Submit</span>
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}

export default BasicDetailEdit;
