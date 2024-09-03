import React, { useState, useEffect } from "react";
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

function BasicDetailEdit({
  initiativeDetail = {},
  buttonData = [],
  handleFieldChange,
  handleGoBack
}) {
  const [formDataState, setFormDataState] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initiativeDetail?.data?.listInitiativeDetailEntity) {
      // Initialize formDataState with initiativeDetail
      const initialData = {};
      initiativeDetail.data.listInitiativeDetailEntity.forEach((field) => {
        if (field.applicable === 1) {
          initialData[field.fieldName] = field.controlValue || "";
        }
      });
      console.log("Initialized data:", initialData);
      setFormDataState(initialData);
      setLoading(false);
    } else {
      console.log("Initiative detail data is missing or incorrect");
    }
  }, [initiativeDetail]);

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
    // Ensure that listInitiativeDetailEntity is an array and not undefined
    const fields = Array.isArray(initiativeDetail?.data?.listInitiativeDetailEntity)
      ? [...initiativeDetail?.data?.listInitiativeDetailEntity]
      : [];

    // Filter and sort fields
    const sortedFields = fields
      .filter((field) => field.applicable === 1)
      .sort((a, b) => a.pageRowNo - b.pageRowNo || a.pageOrderNo - b.pageOrderNo);

    console.log("Sorted fields:", sortedFields);

    return sortedFields.map((field, index) => {
      if (field.applicable === 1) {
        const isRequired = field.mandatory === 1;
        switch (field.controlType) {
          case "Text Box":
            console.log("TextField");
            return (
              <div key={index} className={`col-md-4 mt-2 form-group row-${field.pageRowNo}`}>
                <TextField
                  label={
                    <>
                      <span style={{ color: isRequired ? "red" : "black" }}>*</span>{" "}
                      {field.fieldName}
                    </>
                  }
                  placeholder={field.controlValue}
                  value={formDataState[field.fieldName] || ""}
                  onChange={(ev, newValue) => {
                    setFormDataState({ ...formDataState, [field.fieldName]: newValue });
                    handleFieldChange(newValue, field.fieldName);
                  }}
                  required={isRequired}
                />
              </div>
            );
          case "Combo Box":
            return (
              <div key={index} className={`col-md-4 mt-2 form-group row-${field.pageRowNo}`}>
                <Dropdown
                  label={
                    <>
                      <span style={{ color: isRequired ? "red" : "black" }}>*</span>{" "}
                      {field.fieldName}
                    </>
                  }
                  placeholder={field.controlValue}
                  options={field.options || []}
                  selectedKey={formDataState[field.fieldName]}
                  onChange={(ev, item) => {
                    const value = item ? item.key : null;
                    setFormDataState({ ...formDataState, [field.fieldName]: value });
                    handleFieldChange(value, field.fieldName);
                  }}
                />
              </div>
            );
          case "Date":
            return (
              <div key={index} className={`col-md-4 mt-2 form-group row-${field.pageRowNo}`}>
                <DatePicker
                  label={
                    <>
                      <span style={{ color: isRequired ? "red" : "black" }}>*</span>{" "}
                      {field.fieldName}
                    </>
                  }
                  value={
                    formDataState[field.fieldName] instanceof Date
                      ? formDataState[field.fieldName]
                      : null
                  }
                  onSelectDate={(date) => {
                    setFormDataState({ ...formDataState, [field.fieldName]: date });
                    handleFieldChange(date, field.fieldName);
                  }}
                  isRequired={isRequired}
                />
              </div>
            );
          default:
            return null;
        }
      }
      return null;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                <img src={currentstage} alt="Current Stage" />
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
        containerClassName={classNames.modal}
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
