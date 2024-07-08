import React, { useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { Stack } from "@fluentui/react/lib/Stack";
import Drawer from "@mui/material/Drawer";
import { Table } from "react-bootstrap";
import "@fluentui/react/dist/css/fabric.css";
import { DatePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";

const CostTabContent = ({ costData }) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState(costData.map(() => false));
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
    setIndividualChecks(individualChecks.map(() => checked));
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

              <div className="form-group row pt-1 mb-3">
                <div className="col-sm-3 form-group required">
                  <label className="form-label IM_label text-end">From Date</label>
                  <DatePicker
                    value={formState.fromDate}
                    onChange={(newValue) => handleFormChange("fromDate", newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="col-sm-1">&nbsp;</div>
                <div className="col-sm-3 form-group required">
                  <label className="form-label IM_label text-end">To Date</label>
                  <DatePicker
                    value={formState.toDate}
                    onChange={(newValue) => handleFormChange("toDate", newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="col-sm-4 form-group">&nbsp;</div>
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
                        <th>April</th>
                        <th>May</th>
                        <th>June</th>
                        <th>July</th>
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
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth1"
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth2"
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth3"
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth4"
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth5"
                          />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {!showMonthlyDistribution && (
              <div id="CostMonthlyTab1" className="tab-pane py-0">
                {" "}
                <div className="detailsubtabsbtn mt-1 text-end">
                  {" "}
                  <a
                    href="javascript:;"
                    className="btn borderbtnbgblue"
                    data-bs-toggle="tooltip"
                    id="sv_cost_monthlyBtn"
                  >
                    {" "}
                    Save{" "}
                  </a>{" "}
                </div>{" "}
                <div className="col-sm-12 text-end form-group">
                  {" "}
                  <label className="form-label IM_label"></label>{" "}
                </div>{" "}
                <div className="table-responsive offTable_wrapper">
                  {" "}
                  <table className="table table-striped table-hover mb-0">
                    {" "}
                    <thead>
                      {" "}
                      <tr>
                        {" "}
                        <th>Year</th> <th>Jan</th> <th>Feb</th> <th>Mar</th> <th>April</th>{" "}
                        <th>May</th> <th>June</th> <th>July</th> <th>Aug</th> <th>Sep</th>{" "}
                        <th>Oct</th> <th>Nov</th> <th>Dec</th>{" "}
                      </tr>{" "}
                    </thead>{" "}
                    <tbody>
                      {" "}
                      <tr>
                        {" "}
                        <td>2023</td>{" "}
                        <td>
                          {" "}
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth1"
                          />{" "}
                        </td>{" "}
                        <td>
                          {" "}
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth2"
                          />{" "}
                        </td>{" "}
                        <td>
                          {" "}
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth3"
                          />{" "}
                        </td>{" "}
                        <td>
                          {" "}
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth4"
                          />{" "}
                        </td>{" "}
                        <td>
                          {" "}
                          <input
                            className="form-control"
                            placeholder="40.0"
                            type="text"
                            id="txtmonth5"
                          />{" "}
                        </td>{" "}
                        <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>{" "}
                      </tr>{" "}
                    </tbody>{" "}
                  </table>{" "}
                </div>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tab-pane" id="Ini_Cost">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12">
            <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="end">
              <DefaultButton
                className="btn closelink add-new1"
                onClick={openDrawer}
                iconProps={{ iconName: "Add" }}
              >
                Add
              </DefaultButton>
              <DefaultButton
                className="btn closelink add-new1"
                id="deleteBtn_cost"
                iconProps={{ iconName: "Delete" }}
              >
                Delete
              </DefaultButton>
            </Stack>
          </div>
        </div>
      </div>

      <div className="init_grid_panel m-3">
        <div className="table_wrapper stageGridPanel">
          <Table striped bordered hover id="init_borderedTbl_Cost">
            <thead>
              <tr>
                <th>
                  <div className="igph_title position-relative">
                    <Checkbox
                      id="dltAllcost"
                      className="chckHead"
                      checked={selectAllChecked}
                      onChange={(e, checked) => handleSelectAllChange(e, checked)}
                    />
                  </div>
                </th>
                <th className="text-end">Amount</th>
                <th className="text-end">From Date</th>
                <th className="text-end">To Date</th>
                <th className="text-end">Cost Category</th>
              </tr>
            </thead>
            <tbody>
              {costData.map((cost, index) => (
                <tr key={index}>
                  <td>
                    <Checkbox
                      id={`chkRow${index + 1}`}
                      className="dltSingleCost"
                      checked={individualChecks[index]}
                      onChange={(e, checked) => handleIndividualChange(index, checked)}
                    />
                    <a href="#" className="stageAnchor text-decoration-none ps-1">
                      {cost.name}
                    </a>
                  </td>
                  <td className="text-end">{cost.amount}</td>
                  <td className="text-end">{cost.fromDate}</td>
                  <td className="text-end">{cost.toDate}</td>
                  <td className="text-end">{cost.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerContent />
      </Drawer>
    </div>
  );
};

export default CostTabContent;
