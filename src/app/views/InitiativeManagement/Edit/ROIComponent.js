import React, { useState } from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import Table from "react-bootstrap/Table";
import ROIDetailsDrawer from "./ROIDetailsDrawer";

const ROIComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleDrawerOpen = (roi = null) => {
    setEditData(roi || { month: "", year: "", projectedROI: "" });
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setEditData(null);
  };

  const handleSave = (updatedROI) => {
    console.log("Updated ROI Data: ", updatedROI);
    // Perform save operation here (e.g., update state or make API call)
  };

  const toggleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedRows([]);
    } else {
      const allRows = [...Array(10)].map((_, index) => index + 1);
      setSelectedRows(allRows);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const toggleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <div className="tab-pane" id="Ini_ROI">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <label className="textstrong ps-2">ROI</label>
          </div>
          <div className="col-12 col-sm-6">
            <div id="ROItopActions" className="toprightactionsCol text-end pe-2">
              <PrimaryButton
                className="me-2"
                iconProps={{ iconName: "Add" }}
                text="Add"
                onClick={() => handleDrawerOpen()}
              >
                Add
              </PrimaryButton>
              <PrimaryButton className="me-2" iconProps={{ iconName: "Delete" }} text="Delete">
                Delete
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div id="Project_Grid_panel_5" className="init_grid_panel m-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Projected ROI</th>
              <th className="text-center">
                <div className="custom_chckbox">
                  <input
                    id="dltAllroi"
                    className="chckHead"
                    type="checkbox"
                    checked={selectAllChecked}
                    onChange={toggleSelectAll}
                  />
                  <label htmlFor="dltAllroi"></label>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="tbodyROI">
            {[...Array(10)].map((_, index) => (
              <tr
                key={`roi-${index}`}
                className="TR_ROI"
                onClick={() =>
                  handleDrawerOpen({
                    month: "January",
                    year: "2024",
                    projectedROI: "6,21,75,838"
                  })
                }
              >
                <td>
                  <a href="javascript:;">January</a>
                </td>
                <td>2024</td>
                <td>6,21,75,838</td>
                <td className="text-center">
                  <div className="custom_chckbox">
                    <input
                      id={`checkroi${index + 1}`}
                      className="chckHead main_roichck"
                      type="checkbox"
                      checked={selectedRows.includes(index + 1)}
                      onChange={() => toggleRowSelection(index + 1)}
                    />
                    <label htmlFor={`checkroi${index + 1}`}></label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="clearfix"></div>
      <div id="IMROI_pagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>

      {drawerOpen && (
        <ROIDetailsDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          initialData={editData}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ROIComponent;
