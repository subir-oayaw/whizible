import React, { useState, useEffect } from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown, DatePicker } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import { Modal } from "@fluentui/react/lib/Modal";
import { getTheme, mergeStyleSets } from "@fluentui/react/lib/Styling";
import "bootstrap/dist/css/bootstrap.min.css";
import currentstage from "../../../../assets/img/currentstage.svg";

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
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: theme.spacing.m
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: theme.spacing.m
  }
});

function BasicDetailEdit({
  initiativeLinkAccess,
  initiativeDetail = {},
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

  const handleSubmit = () => {
    console.log("Submitting comment:", comments);
    closeModal();
  };

  const renderDynamicButtons = () => {
    return (initiativeLinkAccess?.data?.listInitiativeLinkAccessEntity || []).map(
      (button, index) => {
        if (button.display === 1) {
          return (
            <PrimaryButton
              key={index}
              className="topbtnblue mr-1"
              onClick={() => openModal(button.linkName)}
            >
              <span>{button.linkName}</span>
            </PrimaryButton>
          );
        }
        return null;
      }
    );
  };

  const renderFormElements = () => {
    const fields = Array.isArray(initiativeDetail?.data?.listInitiativeDetailEntity)
      ? [...initiativeDetail?.data?.listInitiativeDetailEntity]
      : [];

    // Filter applicable fields
    const applicableFields = fields.filter((field) => field.applicable === 1);

    // Group fields by pageRowNo
    const groupedFields = applicableFields.reduce((acc, field) => {
      if (!acc[field.pageRowNo]) {
        acc[field.pageRowNo] = [];
      }
      acc[field.pageRowNo].push(field);
      return acc;
    }, {});

    // Sort fields within each row by pageOrderNo
    Object.keys(groupedFields).forEach((rowNo) => {
      groupedFields[rowNo].sort((a, b) => a.pageOrderNo - b.pageOrderNo);
    });

    // Sort rows by pageRowNo
    const sortedRows = Object.keys(groupedFields).sort((a, b) => a - b);

    return sortedRows.map((rowNo) => (
      <div className="row" key={rowNo}>
        {groupedFields[rowNo].map((field, index) => {
          const isRequired = field.mandatory === 1;
          switch (field.controlType) {
            case "Text Box":
              return (
                <div key={index} className={`col-md-4 mt-2 form-group row-${field.pageRowNo}`}>
                  <TextField
                    label={<>{field.label}</>}
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
                        <span style={{ color: isRequired ? "red" : "black" }}>*</span> {field.label}
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
                    label={<>{field.label}</>}
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
            case "Text Area":
              return (
                <div key={index} className={`col-md-4 mt-2 form-group row-${field.pageRowNo}`}>
                  <TextField
                    label={<>{field.label}</>}
                    placeholder={field.controlValue}
                    value={formDataState[field.fieldName] || ""}
                    onChange={(ev, newValue) => {
                      setFormDataState({ ...formDataState, [field.fieldName]: newValue });
                      handleFieldChange(newValue, field.fieldName);
                    }}
                    multiline
                    autoAdjustHeight
                    required={isRequired}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid mt-3">
      <div className={classNames.headerRow}>
        <div className="iniCurrStageTxt">
          <div className="stagesofinititative ps-lg-2 ps-xl-4">
            <small>(Nature Of Initiative)</small>
          </div>
          <div className="container-fluid">
            <div className="d-flex justify-content-end">
              <div className="d-flex align-items-center">
                <div className="currStageImg">
                  <a title="Current Stage" data-bs-placement="bottom">
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
          </div>
        </div>
      </div>
      <div className={classNames.buttonRow}>
        {renderDynamicButtons()}
        <PrimaryButton className="topbtnblue" onClick={handleGoBack}>
          <span>Back</span>
        </PrimaryButton>
      </div>
      <form>
        <div className={classNames.container}>{renderFormElements()}</div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onDismiss={closeModal}
        isBlocking={false}
        containerClassName={classNames.modal}
      >
        <div className={classNames.header}>
          <span>{modalTitle}</span>
        </div>
        <div className={classNames.body}>
          <TextField
            label="Comments"
            value={comments}
            onChange={(ev, newValue) => setComments(newValue)}
            multiline
            autoAdjustHeight
          />
        </div>
        <div className={classNames.footer}>
          <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}

export default BasicDetailEdit;
