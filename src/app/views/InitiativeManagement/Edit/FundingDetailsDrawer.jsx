import React, { useState } from "react";
import { Drawer, Tabs, Tab, Box, IconButton } from "@mui/material";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown } from "@fluentui/react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Close } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";

const FundingDetailsDrawer = ({ open, onClose }) => {
  const approvalAuthorities = [
    // Add options here
  ];
  const costCategories = [
    { key: "recurring", text: "Recurring" },
    { key: "variable", text: "Variable Cost" }
  ];
  const fundingSources = [
    // Add options here
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
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
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="offcanvas-body p-3">
        <div id="initFundingdetail_Sec">
          <div className="graybg container-fluid py-2 mb-2">
            <div className="row align-items-center">
              <div className="col-sm-10">
                <h5 className="offcanvasTitle">Funding Details</h5>
              </div>
              <div className="col-sm-2 text-end">
                <IconButton aria-label="Close" onClick={onClose}>
                  <Close />
                </IconButton>
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
                <PrimaryButton
                  text="Save"
                  className="borderbtnbgblue"
                  onClick={() => console.log("Save clicked")}
                />
              </div>
              <div className="col-sm-12 text-end form-group">
                <label className="form-label IM_label">
                  (<font color="red">*</font> Mandatory)
                </label>
              </div>
              <div className="form-group row pt-1 mb-3">
                <div className="col-sm-4 form-group required">
                  <label className="form-label IM_label text-end">Cost Category</label>
                  <Dropdown
                    placeholder="Select a category"
                    options={costCategories}
                    id="cost_catagory_Funding"
                  />
                </div>
                <div className="col-sm-4 form-group">
                  <label className="form-label IM_label text-end">Funding Approval Authority</label>
                  <Dropdown
                    placeholder="Select an authority"
                    options={approvalAuthorities}
                    id="approval_authority_Funding"
                  />
                </div>
                <div className="col-sm-4 form-group">
                  <label className="form-label IM_label text-end">Funding Source</label>
                  <Dropdown
                    placeholder="Select a source"
                    options={fundingSources}
                    id="funding_source_Funding"
                  />
                </div>
              </div>
              <div className="form-group row pt-1 mb-3">
                <div className="col-sm-4 form-group">
                  <label className="form-label IM_label text-end">Funding Reference</label>
                  <TextField
                    placeholder="Funding"
                    id="referance_detail"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-sm-4 form-group required">
                  <label className="form-label IM_label text-end">Approved Amount</label>
                  <TextField
                    type="number"
                    id="app_amount_detail"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-sm-4 form-group">&nbsp;</div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FundingDetailsDrawer;
