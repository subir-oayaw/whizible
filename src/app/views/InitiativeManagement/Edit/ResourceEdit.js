import React, { useState } from "react";
import { Drawer, Tabs, Tab, Box } from "@mui/material";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField, Dropdown } from "@fluentui/react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

// Utility function to format date as dd/mm/yyyy
const formatDate = (isoString) => {
  if (!isoString) return "";
  const datePart = isoString.split("T")[0]; // Extract date part from ISO string
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year}`;
};

// Parse date from dd/mm/yyyy to yyyy-mm-dd for storage
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const ResourceEdit = ({ initiativeResource }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [resources, setResources] = useState(
    initiativeResource?.data?.listInitiativeResourceListEntity || []
  );
  const [editIndex, setEditIndex] = useState(null);
  const [newResource, setNewResource] = useState({
    roleDescription: "",
    skill: "",
    tentativeStartDate: "",
    tentativeEndDate: "",
    resourceEffort: ""
  });

  const roleOptions = [
    { key: "devLead", text: "Develop Lead" },
    { key: "projManager", text: "Project Manager" },
    { key: "delivManager", text: "Delivery Manager" },
    { key: "qaLead", text: "QA Lead" }
  ];

  const skillOptions = [
    { key: "java", text: "Java" },
    { key: "sap", text: "SAP" }
  ];

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setEditIndex(null); // Reset edit state when drawer closes
  };

  const handleSave = () => {
    const updatedResources = [...resources];
    if (editIndex !== null) {
      updatedResources[editIndex] = {
        ...newResource,
        tentativeStartDate: parseDate(newResource.tentativeStartDate),
        tentativeEndDate: parseDate(newResource.tentativeEndDate)
      };
    } else {
      updatedResources.push({
        ...newResource,
        tentativeStartDate: parseDate(newResource.tentativeStartDate),
        tentativeEndDate: parseDate(newResource.tentativeEndDate)
      });
    }
    setResources(updatedResources);
    setNewResource({
      roleDescription: "",
      skill: "",
      tentativeStartDate: "",
      tentativeEndDate: "",
      resourceEffort: ""
    });
    handleDrawerClose();
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleChange = (field, value) => {
    setNewResource({
      ...newResource,
      [field]: value
    });
  };

  const handleEdit = (index) => {
    const resourceToEdit = resources[index];
    setNewResource({
      ...resourceToEdit,
      tentativeStartDate: formatDate(resourceToEdit.tentativeStartDate),
      tentativeEndDate: formatDate(resourceToEdit.tentativeEndDate)
    });
    setEditIndex(index);
    handleDrawerOpen();
  };

  const handleDelete = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-2">
        <PrimaryButton
          className="me-2"
          iconProps={{ iconName: "Add" }}
          text="Add"
          onClick={handleDrawerOpen}
        />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Role</th>
            <th>Skills</th>
            <th>In Date</th>
            <th>Out Date</th>
            <th>FTE</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources?.map((resource, index) => (
            <tr key={index}>
              <td>{resource.roleDescription}</td>
              <td>{resource.skill}</td>
              <td>{formatDate(resource.tentativeStartDate)}</td>
              <td>{formatDate(resource.tentativeEndDate)}</td>
              <td>{resource.resourceEffort}</td>
              <td>
                <IconButton onClick={() => handleEdit(index)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box padding={4}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Details" />
          </Tabs>
          {selectedTab === 0 && (
            <div>
              <Dropdown
                label="Role Description"
                options={roleOptions}
                selectedKey={newResource.roleDescription}
                onChange={(e, option) => handleChange("roleDescription", option.key)}
              />
              <Dropdown
                label="Skills"
                options={skillOptions}
                selectedKey={newResource.skill}
                onChange={(e, option) => handleChange("skill", option.key)}
              />
              <TextField
                label="Tentative Start Date"
                value={newResource.tentativeStartDate || ""}
                onChange={(e) => handleChange("tentativeStartDate", e.target.value)}
              />
              <TextField
                label="Tentative End Date"
                value={newResource.tentativeEndDate || ""}
                onChange={(e) => handleChange("tentativeEndDate", e.target.value)}
              />
              <TextField
                label="Resource Effort"
                type="number"
                value={newResource.resourceEffort || ""}
                onChange={(e) => handleChange("resourceEffort", e.target.value)}
              />
              <PrimaryButton
                text={editIndex !== null ? "Save Changes" : "Save"}
                onClick={handleSave}
              />
            </div>
          )}
        </Box>
      </Drawer>
    </div>
  );
};

export default ResourceEdit;
