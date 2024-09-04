import React, { useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { Stack } from "@fluentui/react/lib/Stack";
import Drawer from "@mui/material/Drawer";
import { Table } from "react-bootstrap";
import "@fluentui/react/dist/css/fabric.css";
import { DatePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";

import { mergeStyles } from "@fluentui/react/lib/Styling";

const CostTabContent = ({ costData }) => {
  console.log("costData", costData?.data?.listInitiativeCostListEntity);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState(
    costData?.data?.listInitiativeCostListEntity?.map(() => false)
  );
  const [showDrawer, setShowDrawer] = useState(false);
  const [formState, setFormState] = useState({
    costCategory: "",
    amount: "",
    costType: "",
    fromDate: null,
    toDate: null,
    description: ""
  });
  const [showDetailTab, setShowDetailTab] = useState(false);
  const [showMonthlyDistribution, setShowMonthlyDistribution] = useState(false);

  const handleSelectAllChange = (e, checked) => {
    setSelectAllChecked(checked);
    setIndividualChecks(individualChecks?.map(() => checked));
  };

  const handleIndividualChange = (index, checked) => {
    const newChecks = [...individualChecks];
    newChecks[index] = checked;
    setIndividualChecks(newChecks);
    setSelectAllChecked(newChecks.every((check) => check));
  };

  const openDrawer = () => {
    setShowDrawer(true);
    setShowDetailTab(true); // Show detail tab when drawer opens
  };

  const closeDrawer = () => {
    setShowDrawer(false);
    setShowDetailTab(false); // Hide detail tab when drawer closes
  };

  const handleFormChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const toggleMonthlyDistribution = () => {
    setShowMonthlyDistribution(!showMonthlyDistribution);
  };

  const DrawerContent = () => (
    <div style={{ width: 600, padding: 20 }}>
      <div id="initcost_Sec" className="inithistDetails">
        <div className="graybg container-fluid py-2 mb-2">
          <div className="row">
            <div className="col-sm-10">
              <h5 className="offcanvasTitle">Cost Details</h5>
            </div>
            <div className="col-sm-2 text-end">
              <a
                href="javascript:;"
                className="close offClose"
                onClick={closeDrawer}
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <ul className="nav nav-tabs detailsubtabs">
            <li className="nav-item">
              <a
                href="#CostDetailsTab1"
                className={`nav-link ${showDetailTab ? "active" : ""}`}
                onClick={() => setShowDetailTab(true)}
              >
                Details
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#CostMonthlyTab1"
                className={`nav-link ${showMonthlyDistribution ? "active" : ""}`}
                onClick={() => {
                  setShowDetailTab(false);
                  toggleMonthlyDistribution();
                }}
              >
                Monthly Distribution
              </a>
            </li>
          </ul>
          <div className="tab-content detailsmenutab">
            <div id="CostDetailsTab1" className={`tab-pane py-0 ${showDetailTab ? "active" : ""}`}>
              <div className="detailsubtabsbtn pb-1 text-end">
                <a
                  href="javascript:;"
                  className="btn borderbtnbgblue"
                  data-bs-toggle="tooltip"
                  id="sv_costdetails"
                >
                  Save
                </a>
              </div>
              <div className="col-sm-12 text-end form-group">
                <label className="form-label IM_label">
                  (<font color="red">*</font> Mandatory)
                </label>
              </div>
              <div className="form-group row pt-1 mb-3">
                <div className="col-sm-4 form-group required">
                  <label className="form-label IM_label text-end">Cost Category</label>
                  <select
                    className="form-control"
                    id="select_Category"
                    value={formState.costCategory}
                    onChange={(e) => handleFormChange("costCategory", e.target.value)}
                  >
                    <option></option>
                    <option>Alpha</option>
                    <option>Petrol</option>
                  </select>
                </div>
                <div className="col-sm-4 form-group required">
                  <label className="form-label IM_label text-end">Amount</label>
                  <input
                    className="form-control"
                    type="number"
                    id="initiativecostamount"
                    value={formState.amount}
                    onChange={(e) => handleFormChange("amount", e.target.value)}
                  />
                </div>
                <div className="col-sm-4 form-group required">
                  <label className="form-label IM_label text-end">Cost Type</label>
                  <div className="row mt-1">
                    <div className="col-sm-6 form-group form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="costType"
                        id="flexRadiocost1"
                        checked={formState.costType === "Running"}
                        onChange={() => handleFormChange("costType", "Running")}
                      />
                      <label className="form-check-label" htmlFor="flexRadiocost1">
                        Running
                      </label>
                    </div>
                    <div className="col-sm-6 form-group form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="costType"
                        id="flexRadiocost2"
                        checked={formState.costType === "Fixed"}
                        onChange={() => handleFormChange("costType", "Fixed")}
                      />
                      <label className="form-check-label" htmlFor="flexRadiocost2">
                        Fixed
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-3 form-group required">
                  <label className="form-label IM_label text-end">From Date</label>
                  <DatePicker
                    value={formState.fromDate}
                    onSelectDate={(date) => handleFormChange("fromDate", date)}
                    placeholder="Select date"
                  />
                </div>
                <div className="col-sm-3 form-group required">
                  <label className="form-label IM_label text-end">To Date</label>
                  <DatePicker
                    value={formState.toDate}
                    onSelectDate={(date) => handleFormChange("toDate", date)}
                    placeholder="Select date"
                  />
                </div>
                <div className="col-sm-6 form-group">&nbsp;</div>
              </div>
              <div className="form-group row pt-1 mb-3">
                <div className="col-sm-12 form-group required">
                  <label className="form-label IM_label text-end">Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Small Metro"
                    value={formState.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            {showMonthlyDistribution && (
              <div id="CostMonthlyTab1" className="tab-pane py-0">
                <div className="detailsubtabsbtn mt-1 text-end">
                  <a
                    href="javascript:;"
                    className="btn borderbtnbgblue"
                    data-bs-toggle="tooltip"
                    id="sv_cost_monthlyBtn"
                  >
                    Save
                  </a>
                </div>
                <div className="col-sm-12 text-end form-group">
                  <label className="form-label IM_label"></label>
                </div>
                <div className="table-responsive offTable_wrapper">
                  <table className="table table-striped table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>May</th>
                        <th>Jun</th>
                        <th>Jul</th>
                        <th>Aug</th>
                        <th>Sep</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2023</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            onChange={() => {}}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        style={{ padding: "0 15px" }}
      >
        <h4>Cost Details</h4>
        <DefaultButton onClick={openDrawer} text="Add Cost" />
      </Stack>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Checkbox label="" checked={selectAllChecked} onChange={handleSelectAllChange} />
            </th>
            <th>Cost Type</th>
            <th>Cost Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {costData?.data?.listInitiativeCostListEntity?.map((cost, index) => (
            <tr key={index}>
              <td>
                <Checkbox
                  label=""
                  checked={individualChecks[index]}
                  onChange={(e, checked) => handleIndividualChange(index, checked)}
                />
              </td>
              <td>{cost.costType}</td>
              <td>{cost.costCategory}</td>
              <td>{cost.amount}</td>
              <td>{cost.description}</td>
              <td>{cost.startDate}</td>
              <td>{cost.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Drawer anchor="right" open={showDrawer} onClose={closeDrawer}>
        <DrawerContent />
      </Drawer>
    </div>
  );
};

export default CostTabContent;
