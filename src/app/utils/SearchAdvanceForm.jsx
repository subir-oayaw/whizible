import React, { useState } from "react";
import { Label, TextField, Stack, DefaultButton } from "@fluentui/react";

const SearchAdvanceForm = ({ onClose }) => {
  const initialState = {
    initiativeCode: "",
    initiativeFrom: "",
    initiativeTo: "",
    lastAction: "",
    submittedBy: "",
    natureOfInitiative: "",
    selectStage: "",
    vendor: "",
    priority: "",
    initiativeCategory: "",
    businessGroup: "",
    organizationUnit: ""
  };

  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleClearSearch = () => {
    setFormValues(initialState);
  };

  return (
    <div className="above-form-container">
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
          <Stack.Item grow={1}>
            <Label htmlFor="initiativeCode">Initiative Code</Label>
            <TextField
              id="initiativeCode"
              value={formValues.initiativeCode}
              onChange={handleInputChange}
              placeholder="Add Initiative Code"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="initiativeFrom">Initiative From</Label>
            <TextField
              id="initiativeFrom"
              value={formValues.initiativeFrom}
              onChange={handleInputChange}
              placeholder="Select Date"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="initiativeTo">Initiative To</Label>
            <TextField
              id="initiativeTo"
              value={formValues.initiativeTo}
              onChange={handleInputChange}
              placeholder="Select Date"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="lastAction">Last Action</Label>
            <TextField
              id="lastAction"
              value={formValues.lastAction}
              onChange={handleInputChange}
              placeholder="Select Last Action"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="submittedBy">Submitted By</Label>
            <TextField
              id="submittedBy"
              value={formValues.submittedBy}
              onChange={handleInputChange}
              placeholder="Select Submitted By"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="natureOfInitiative">Nature of Initiative</Label>
            <TextField
              id="natureOfInitiative"
              value={formValues.natureOfInitiative}
              onChange={handleInputChange}
              placeholder="Select Nature of Initiative"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="selectStage">Select Stage</Label>
            <TextField
              id="selectStage"
              value={formValues.selectStage}
              onChange={handleInputChange}
              placeholder="Select Stage"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="vendor">Vendor</Label>
            <TextField
              id="vendor"
              value={formValues.vendor}
              onChange={handleInputChange}
              placeholder="Select Vendor"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="priority">Priority</Label>
            <TextField
              id="priority"
              value={formValues.priority}
              onChange={handleInputChange}
              placeholder="Select Priority"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="initiativeCategory">Initiative Category</Label>
            <TextField
              id="initiativeCategory"
              value={formValues.initiativeCategory}
              onChange={handleInputChange}
              placeholder="Select Initiative Category"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="businessGroup">Business Group</Label>
            <TextField
              id="businessGroup"
              value={formValues.businessGroup}
              onChange={handleInputChange}
              placeholder="Select Business Group"
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Label htmlFor="organizationUnit">Organization Unit</Label>
            <TextField
              id="organizationUnit"
              value={formValues.organizationUnit}
              onChange={handleInputChange}
              placeholder="Select Organization Unit"
            />
          </Stack.Item>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 15 }} horizontalAlign="end">
          <DefaultButton text="Clear Search" onClick={handleClearSearch} />
          <DefaultButton text="Save and Search" />
          <DefaultButton text="Close" onClick={onClose} />
          <DefaultButton text="Search" />
        </Stack>
      </Stack>
    </div>
  );
};

export default SearchAdvanceForm;
