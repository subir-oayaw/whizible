import React from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Modal } from "@fluentui/react/lib/Modal";
import { Stack, TextField } from "@fluentui/react";

const modalStyles = {
  root: {
    maxWidth: "70vw",
    maxHeight: "70vh",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%"
  }
};

const DocumentsComponent = ({ initiativeDocument }) => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Function to handle modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Handle file upload logic
  };

  return (
    <div className="tab-pane" id="Ini_Documents">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-3 text-start">
            <label className="textstrong ps-2">Documents</label>
          </div>
          <div className="col-12 col-sm-9">
            <div className="toprightactionsCol text-end pe-2">
              <PrimaryButton className="tital1" data-bs-toggle="tooltip" title="Download template">
                Download template
              </PrimaryButton>
              &nbsp;
              <PrimaryButton className="tital1" onClick={toggleModal}>
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

      {/* Modal for document upload */}
      <Modal isOpen={isModalOpen} onDismiss={toggleModal} isBlocking={false} styles={modalStyles}>
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <h3>Upload Document (* Mandatory)</h3>
          </div>
          <Stack tokens={{ childrenGap: 10 }}>
            <TextField label="Document Name" />
            <TextField label="Uploaded By" />
            <TextField label="Upload Date" />
            <input type="file" id="fileUpload" onChange={handleFileUpload} />
            <PrimaryButton text="Upload" onClick={toggleModal} />
          </Stack>
        </div>
      </Modal>

      {/* Table structure */}
      <div className="init_grid_panel m-3">
        <div className="table_wrapper stageGridPanel">
          <table className="table_document table table-hover init-stickytable mb-0">
            <thead className="IM_document">
              <tr className="cart-table-head">
                <th>Document name</th>
                <th>Document category</th>
                <th>Uploaded by</th>
                <th>Uploaded date</th>
                <th>Last modified</th>
                <th width="7%">Action</th>
              </tr>
            </thead>
            <tbody>
              {initiativeDocument?.data?.listInitiativeDocumentListEntity?.map((doc, index) => (
                <tr className="TRDocument" key={index}>
                  <td>{doc.fileName}</td>
                  <td>{doc.category}</td>
                  <td>{doc.uploadedBy}</td>
                  <td>{new Date(doc.uploadedDate).toLocaleDateString()}</td>
                  <td>{new Date(doc.updatedDate).toLocaleDateString()}</td>
                  <td className="text-center">
                    <a href="javascript:;">{/* Action icons */}</a>
                  </td>
                </tr>
              ))}
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
