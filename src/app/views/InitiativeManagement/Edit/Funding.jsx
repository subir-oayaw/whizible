import React, { useState } from "react";
import { Drawer, Tabs, Tab, Box } from "@mui/material";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown } from "@fluentui/react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Checkbox } from "@fluentui/react/lib/Checkbox";

const FundingDetailsDrawer = ({ open, onClose, initialData, onSave }) => {
  const approvalAuthorities = [
    { key: "authority1", text: "Authority 1" },
    { key: "authority2", text: "Authority 2" },
    { key: "authority3", text: "Authority 3" }
  ];
  const costCategories = [
    { key: "recurring", text: "Recurring" },
    { key: "variable", text: "Variable Cost" }
  ];
  const fundingSources = [
    { key: "source1", text: "Source 1" },
    { key: "source2", text: "Source 2" },
    { key: "source3", text: "Source 3" }
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSave = () => {
    onSave(formData); // Pass updated form data to parent component
    onClose(); // Close the drawer
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="offcanvas-body px-4">
        <div id="initFundingdetail_Sec">
          <div className="graybg container-fluid py-2 mb-2">
            <div className="row">
              <div className="col-sm-10">
                <h5 className="offcanvasTitle">Funding Details</h5>
              </div>
              <div className="col-sm-2 text-end">
                <button className="close offClose" aria-label="Close" onClick={onClose}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
          <Tabs value={selectedTab} onChange={handleTabChange} className="detailsubtabs">
            <Tab label="Details" className="nav-link" />
          </Tabs>
          <div className="tab-content detailsmenutab">
            <Box
              className={`tab-pane py-0 ${selectedTab === 0 ? "active" : ""}`}
              id="SCMDetailsTab1"
            >
              <div className="detailsubtabsbtn mt-1 text-end">
                <PrimaryButton text="Save" className="borderbtnbgblue" onClick={handleSave} />
              </div>
              <div className="col-sm-12 text-end form-group">
                <label className="form-label IM_label">( Mandatory)</label>
              </div>
              <div className="form-group row pt-1 mb-3">
                <div className="col-sm-4">
                  <label className="form-label IM_label text-end">Cost Category</label>
                  <Dropdown
                    placeholder="Select a category"
                    options={costCategories}
                    id="cost_catagory_Funding"
                    selectedKey={formData?.costCategory}
                    onChange={(e, option) => handleChange("costCategory", option.key)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label IM_label text-end">Funding Approval</label>
                  <Dropdown
                    placeholder="Select an authority"
                    options={approvalAuthorities}
                    id="approval_authority_Funding"
                    selectedKey={formData?.approvalAuthority}
                    onChange={(e, option) => handleChange("approvalAuthority", option.key)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label IM_label text-end">Funding Source</label>
                  <Dropdown
                    placeholder="Select a source"
                    options={fundingSources}
                    id="funding_source_Funding"
                    selectedKey={formData?.fundingSource}
                    onChange={(e, option) => handleChange("fundingSource", option.key)}
                  />
                </div>
              </div>
              <div className="form-group row pt-1 mb-3">
                <div className="col-sm-4">
                  <label className="form-label IM_label text-end">Funding Reference</label>
                  <TextField
                    placeholder="Funding"
                    id="referance_detail"
                    value={formData?.fundingReference}
                    onChange={(e) => handleChange("fundingReference", e.target.value)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="form-label IM_label text-end">Approved Amount</label>
                  <TextField
                    type="number"
                    id="app_amount_detail"
                    value={formData?.approvedAmount}
                    onChange={(e) => handleChange("approvedAmount", e.target.value)}
                    required // If using HTML5 validation
                  />
                </div>
                <div className="col-sm-4"></div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

const FundingTab = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null); // State to hold data for editing

  const handleDrawerOpen = (data) => {
    setEditMode(true);
    setEditData(data);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setEditMode(false);
    setEditData(null);
    setDrawerOpen(false);
  };

  const handleSave = (updatedData) => {
    // Update the fundings list or data store with updatedData
    console.log("Updated data:", updatedData);
    // Example: Update the fundings array with updatedData
    // Replace this with your actual update logic
    // const updatedFundings = fundings.map(item => item.id === updatedData.id ? updatedData : item);
    // setFundings(updatedFundings);
    // Close the drawer
    handleDrawerClose();
  };

  const fundings = [
    { id: 1, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" }
    // Other funding objects here
  ];

  const handleCheckboxChange = (id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = selectedItems.filter((item) => item !== id);
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allIds = fundings.map((funding) => funding.id);
      setSelectedItems(allIds);
    }
    setSelectAll(!selectAll);
  };

  const checkboxStyles = {
    checkbox: mergeStyles({
      selectors: {
        "::after": {
          content: '"✓"',
          fontSize: "16px",
          color: "white"
        }
      }
    }),
    checkmark: {
      visibility: "hidden"
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row align-items-center mb-3">
        <div className="col-12 col-sm-6 text-start">
          <label className="textstrong ps-2">Funding</label>
        </div>
        <div className="col-12 col-sm-6 text-end">
          <div className="toprightactionsCol pt-1 pe-2">
            <PrimaryButton
              className="me-2"
              iconProps={{ iconName: "Add" }}
              text="Add"
              onClick={() =>
                handleDrawerOpen({
                  /* Initial data for adding new item */
                })
              }
            />
            <PrimaryButton
              className="ms-2"
              iconProps={{ iconName: "Delete" }}
              text="Delete"
              onClick={() => console.log("Delete button clicked")}
            />
          </div>
        </div>
      </div>
      <div className="table_wrapper stageGridPanel">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="thOuter col-sm-4">
                <div className="igph_title position-relative">
                  <span className="ms-2">Cost of Category</span>
                </div>
              </th>
              <th className="thOuter col-sm-3">Funding source & title</th>
              <th className="thOuter">Approved amount</th>
              <th className="thOuter col-sm-1 text-center">
                <div className="custom_chckbox">
                  <Checkbox
                    styles={checkboxStyles}
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {fundings.map((funding) => (
              <tr key={funding.id} className="TRfunding" onClick={() => handleDrawerOpen(funding)}>
                <td className="tdOuter">
                  <div className="igph_title position-relative">
                    <a
                      href="javascript:;"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#IniFundingdetailoffcanvas"
                    >
                      {funding.category}
                    </a>
                  </div>
                </td>
                <td className="tdOuter">
                  <div className="init_title position-relative">{funding.sourceTitle}</div>
                </td>
                <td className="tdOuter">
                  <div className="igph_title position-relative">{funding.approvedAmount}</div>
                </td>
                <td className="tdOuter text-center">
                  <div className="custom_chckbox">
                    <Checkbox
                      styles={checkboxStyles}
                      checked={selectedItems.includes(funding.id)}
                      onChange={() => handleCheckboxChange(funding.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="clearfix"></div>
      <div id="IMfunding_pagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>

      {editMode && (
        <FundingDetailsDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          initialData={editData}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default FundingTab;
