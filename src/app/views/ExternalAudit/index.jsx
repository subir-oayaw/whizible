import React, { useState, useEffect } from "react";
import { Pivot, PivotItem, Dropdown, PrimaryButton, Stack, TextField, Icon } from "@fluentui/react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import WatchListConfiguration from "app/hooks/Watch/WatchListConfiguration";

const ExternalAudit = () => {
  const [selectedTab, setSelectedTab] = useState("iniReallocationTab");
  const [initiativeData, setInitiativeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useState({
    InitiativeTitle: "",
    StatusID: null,
    NatureofInitiativeId: null,
    BusinessGroupId: null,
    OrganizationUnitId: null,
    InitiativeCode: "",
    CurrentStageID: null,
    CurrentStageApprover: ""
  });

  useEffect(() => {
    const fetchWatchListData = async () => {
      try {
        const response = await WatchListConfiguration({
          PageNo: currentPage,
          ...searchParams
        });
        setInitiativeData(response.data.listWatchListConfigurationEntity);
        setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedTab === "watchListConfTab") {
      fetchWatchListData();
    }
  }, [currentPage, searchParams, selectedTab]);

  const handlePageChange = (event, value) => setCurrentPage(value);

  return (
    <div className="tab-content px-2">
      <div className="tab-pane active" id="iniManagement">
        <div id="IMActiontabs" className="IM_tabs bglightblue">
          <Pivot
            selectedKey={selectedTab}
            onLinkClick={(item) => setSelectedTab(item.props.itemKey)}
          >
            <PivotItem headerText="Initiative Reallocation" itemKey="iniReallocationTab" />
            <PivotItem headerText="Watch List Configuration" itemKey="watchListConfTab" />
            <PivotItem headerText="Initiative Activate - Snooze" itemKey="iniActivateSnoozeTab" />
          </Pivot>
        </div>

        <div className="tab-content px-2">
          {selectedTab === "iniReallocationTab" && (
            <div className="tab-pane active" id="iniReallocationTab">
              {/* Content for Initiative Reallocation */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h5>Advanced Search</h5>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="container-fluid">
                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <div className="note-txt">
                          <span className="note-title">
                            <Icon iconName="Lightbulb" />{" "}
                          </span>
                          Initiative Reallocation helps to manage the approval process so that an
                          initiative is not 'stranded' at any stage...
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <Dropdown
                          label="Select Current Approver"
                          options={[]} // Add options here
                        />
                      </div>
                      <div className="col-md-6">
                        <Dropdown
                          label="Nature of Initiative"
                          options={[]} // Add options here
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <Dropdown
                          label="Business Group"
                          options={[]} // Add options here
                        />
                      </div>
                      <div className="col-md-6">
                        <Dropdown
                          label="Stage of Approval"
                          options={[]} // Add options here
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <TextField label="Initiative Title" />
                      </div>
                      <div className="col-md-6">
                        <PrimaryButton text="Next" />
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          )}

          {selectedTab === "iniActivateSnoozeTab" && (
            <div className="tab-pane active" id="iniActivateSnoozeTab">
              {/* Content for Initiative Activate - Snooze */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h5>Advanced Search</h5>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="container-fluid">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <Dropdown label="Select Initiative" options={[]} />
                      </div>
                      <div className="col-md-6">
                        <Dropdown label="Action" options={[]} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <PrimaryButton text="Activate/Snooze" />
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          )}

          {selectedTab === "watchListConfTab" && (
            <div className="tab-pane active" id="watchListConfTab">
              {/* Content for Watch List Configuration - Table */}
              <div className="container-fluid mt-4">
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h5>Advanced Search</h5>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="container-fluid">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <TextField
                            label="Initiative Title"
                            value={searchParams.InitiativeTitle}
                            onChange={(e, newValue) =>
                              setSearchParams({ ...searchParams, InitiativeTitle: newValue })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <TextField
                            label="Initiative Code"
                            value={searchParams.InitiativeCode}
                            onChange={(e, newValue) =>
                              setSearchParams({ ...searchParams, InitiativeCode: newValue })
                            }
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Dropdown
                            label="Select Status"
                            selectedKey={searchParams.StatusID}
                            onChange={(e, option) =>
                              setSearchParams({ ...searchParams, StatusID: option.key })
                            }
                            options={[
                              { key: null, text: "Select Status" },
                              { key: 1, text: "Active" },
                              { key: 2, text: "Inactive" }
                            ]}
                          />
                        </div>
                        <div className="col-md-6">
                          <Dropdown
                            label="Nature of Initiative"
                            selectedKey={searchParams.NatureofInitiativeId}
                            onChange={(e, option) =>
                              setSearchParams({ ...searchParams, NatureofInitiativeId: option.key })
                            }
                            options={[
                              { key: null, text: "Select Nature" },
                              { key: 1, text: "Strategic" },
                              { key: 2, text: "Operational" }
                            ]}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Dropdown
                            label="Business Group"
                            selectedKey={searchParams.BusinessGroupId}
                            onChange={(e, option) =>
                              setSearchParams({ ...searchParams, BusinessGroupId: option.key })
                            }
                            options={[
                              { key: null, text: "Select Business Group" },
                              { key: 1, text: "Group A" },
                              { key: 2, text: "Group B" }
                            ]}
                          />
                        </div>
                        <div className="col-md-6">
                          <Dropdown
                            label="Organization Unit"
                            selectedKey={searchParams.OrganizationUnitId}
                            onChange={(e, option) =>
                              setSearchParams({ ...searchParams, OrganizationUnitId: option.key })
                            }
                            options={[
                              { key: null, text: "Select Organization Unit" },
                              { key: 1, text: "Unit A" },
                              { key: 2, text: "Unit B" }
                            ]}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <Dropdown
                            label="Current Stage"
                            selectedKey={searchParams.CurrentStageID}
                            onChange={(e, option) =>
                              setSearchParams({ ...searchParams, CurrentStageID: option.key })
                            }
                            options={[
                              { key: null, text: "Select Current Stage" },
                              { key: 1, text: "Stage 1" },
                              { key: 2, text: "Stage 2" }
                            ]}
                          />
                        </div>
                        <div className="col-md-6">
                          <TextField
                            label="Current Stage Approver"
                            value={searchParams.CurrentStageApprover}
                            onChange={(e, newValue) =>
                              setSearchParams({ ...searchParams, CurrentStageApprover: newValue })
                            }
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <PrimaryButton text="Search" onClick={() => setCurrentPage(1)} />
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <table className="table table-bordered table-hover mt-4">
                  <thead>
                    <tr>
                      <th>Initiative Code</th>
                      <th>Nature of Initiative</th>
                      <th>Initiative Title</th>
                      <th>Business Group</th>
                      <th>Organization Unit</th>
                      <th>Current Stage</th>
                      <th>Current Stage Approver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initiativeData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.initiativeCode}</td>
                        <td>{item.natureofInitiative}</td>
                        <td>{item.initiativeTitle}</td>
                        <td>{item.businessGroup}</td>
                        <td>{item.organizationUnit || "N/A"}</td>
                        <td>{item.currentStage}</td>
                        <td>{item.currentStageApprover}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  className="d-flex justify-content-center mt-4"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExternalAudit;
