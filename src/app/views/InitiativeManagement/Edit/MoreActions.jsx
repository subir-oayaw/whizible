import React, { useEffect, useState } from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import { PrimaryButton, Stack, Checkbox, TooltipHost } from "@fluentui/react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MoreActions.css";

const MoreActions = ({ initiativeActioItems, initiativeRisks }) => {
  const [selectedKey, setSelectedKey] = useState("risks");

  const handlePivotChange = (item) => {
    setSelectedKey(item.props.itemKey);
  };

  const renderMatrix = () => {
    const matrixData = initiativeRisks?.data?.listInitiativeRiskMatrixEntity || [];

    const matrixMap = {};
    matrixData.forEach((item) => {
      const key = `${item.probability}-${item.weight}`;
      matrixMap[key] = item.color;
    });

    const probabilities = [1, 2, 3, 4, 5];
    const weights = [1, 2, 3, 4, 5];

    return (
      <div className="matrix-container">
        <div className="matrix-header">
          <div className="matrix-cell" />
          {weights.map((weight) => (
            <div key={`header-${weight}`} className="matrix-cell">
              <span>{weight}</span>
            </div>
          ))}
        </div>
        {probabilities.map((probability) => (
          <div key={`row-${probability}`} className="matrix-row mt-2">
            <div className="matrix-cell">
              <span>{probability}</span>
            </div>
            {weights.map((weight) => {
              const color = matrixMap[`${probability}-${weight}`] || "white";
              return (
                <div
                  key={`${probability}-${weight}`}
                  className="matrix-cell"
                  style={{ backgroundColor: color }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tab-pane py-0" id="Ini_more">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <Pivot onLinkClick={handlePivotChange} selectedKey={selectedKey}>
              <PivotItem headerText="Risks" itemKey="risks">
                <TooltipHost content="Risks">
                  <span>Risks</span>
                </TooltipHost>
              </PivotItem>
              <PivotItem headerText="Prioritization checklist" itemKey="prioritization">
                <TooltipHost content="Prioritization checklist">
                  <span>Prioritization checklist</span>
                </TooltipHost>
              </PivotItem>
              <PivotItem headerText="Action items" itemKey="actionItems">
                <TooltipHost content="Action items">
                  <span>Action items</span>
                </TooltipHost>
              </PivotItem>
            </Pivot>
          </div>
        </div>

        <div className="tab-content">
          {selectedKey === "actionItems" && (
            <div
              id="tbl_moreaction_ActionItems"
              className={`tab-pane py-0 ${selectedKey === "actionItems" ? "active" : ""}`}
            >
              <Stack horizontal horizontalAlign="end" className="pe-2 mb-2">
                <TooltipHost content="Add Action Item">
                  <PrimaryButton className="me-2" text="Add Action Item" />
                </TooltipHost>
                <TooltipHost content="Delete">
                  <PrimaryButton className="me-2" text="Delete" />
                </TooltipHost>
              </Stack>

              <div className="table-responsive table_wrapper">
                <Table striped bordered hover className="init-stickytable mb-0 table_Documents">
                  <thead>
                    <tr className="sm-wid">
                      <th>Action Item</th>
                      <th>Priority</th>
                      <th>Responsible Person</th>
                      <th>Expected End Date</th>
                      <th>Initiative ID</th>
                      <th>Submitter ID</th>
                      <th>Submitted By Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initiativeActioItems?.data?.listInitiativeActionItemsEntity?.length > 0 ? (
                      initiativeActioItems.data.listInitiativeActionItemsEntity.map(
                        (item, index) => (
                          <tr key={index}>
                            <td>{item.actionItem}</td>
                            <td>{item.priority}</td>
                            <td>{item.responsiblePerson}</td>
                            <td>{new Date(item.expectedEndDate).toLocaleDateString()}</td>
                            <td>{item.initiativeID}</td>
                            <td>{item.submitterID}</td>
                            <td>{item.submittedByName}</td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No Action Items Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
          {selectedKey === "risks" && (
            <div id="tbl_moreaction_Risks" className="tab-pane active py-0">
              <Stack horizontal horizontalAlign="end" className="pe-2 mb-2">
                <TooltipHost content="Add Risk">
                  <PrimaryButton className="me-2" text="Add Risk" />
                </TooltipHost>
                <TooltipHost content="Delete">
                  <PrimaryButton className="me-2" text="Delete" />
                </TooltipHost>
              </Stack>

              <div className="table-responsive table_wrapper">
                <Table striped bordered hover className="init-stickytable mb-0 table_Documents">
                  <thead>
                    <tr className="sm-wid">
                      <th>Status</th>
                      <th>Idea ID</th>
                      <th>Risk ID</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Probability</th>
                      <th>Weight</th>
                      <th>Date Identified</th>
                      <th>Created By</th>
                      <th>Rationale</th>
                      <th width="5%" className="text-center">
                        <Checkbox />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {initiativeRisks?.data?.listInitiativeRiskEntity?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.status}</td>
                        <td>{item.ideaID}</td>
                        <td>{item.riskID}</td>
                        <td>{item.riskCategory}</td>
                        <td>{item.description}</td>
                        <td>{item.probability}</td>
                        <td>{item.weight}</td>
                        <td>{new Date(item.dateIdentified).toLocaleDateString()}</td>
                        <td>{item.createdBy}</td>
                        <td>{item.rationale}</td>
                        <td className="sm-wid text-center">
                          <Checkbox />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="prob-matrix-sec" id="prob_matrix_sec">
                <div className="prob_title_div ms-4 mb-3">
                  <h5>Probability vs Impact Matrix</h5>
                </div>
                <div className="main-prob-matrix" id="prob_matrix_main">
                  {renderMatrix()}
                </div>
              </div>
            </div>
          )}

          {selectedKey === "prioritization" && (
            <div id="tbl_moreaction_Prioritization" className="tab-pane py-0">
              <p>This is dummy content for Prioritization checklist.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreActions;
