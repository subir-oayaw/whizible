import React, { useState } from "react";
import { Table, Form, Alert } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { DatePicker } from "@fluentui/react/lib/DatePicker";
import { Pagination, Stack } from "@mui/material";
import "@fluentui/react/dist/css/fabric.css";

function ResourceEdit({ initiativeResource }) {
  console.log("resourcesData", initiativeResource?.data?.listInitiativeResourceListEntity);
  const [resources, setResources] = useState(
    initiativeResource?.data?.listInitiativeResourceListEntity
  );
  const [editIndex, setEditIndex] = useState(null);
  const [newResource, setNewResource] = useState({
    roleDescription: "",
    skill: "",
    tentativeStartDate: null,
    tentativeEndDate: null,
    resourceEffort: ""
  });
  const [formErrors, setFormErrors] = useState({
    roleDescription: null,
    skill: null,
    tentativeStartDate: null,
    tentativeEndDate: null,
    resourceEffort: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  // Dropdown options
  const roleOptions = ["Develop Lead", "Project Manager", "Delivery Manager", "QA Lead"];
  const skillOptions = ["Java", "SAP"];

  // Calculate pagination
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentResources = resources?.slice(firstIndex, lastIndex);

  const handleEditChange = (e, field, index) => {
    const updatedResources = [...resources];
    updatedResources[index][field] = e.target.value;
    setResources(updatedResources);
  };

  const handleNewResourceChange = (e, field) => {
    setNewResource({ ...newResource, [field]: e.target.value });
    // Clear error message when user starts typing
    setFormErrors({ ...formErrors, [field]: null });
  };

  const handleDateChange = (date, fieldName) => {
    setNewResource({ ...newResource, [fieldName]: date });
    // Clear error message when date is selected
    setFormErrors({ ...formErrors, [fieldName]: null });
  };

  const handleSave = (index) => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  const handleAddNew = () => {
    // Validate fields
    const errors = {};
    let hasErrors = false;

    if (!newResource.roleDescription.trim()) {
      errors.roleDescription = "Role Description is required";
      hasErrors = true;
    }
    if (!newResource.skill.trim()) {
      errors.skill = "Skill is required";
      hasErrors = true;
    }
    if (!newResource.tentativeStartDate) {
      errors.tentativeStartDate = "Tentative Start Date is required";
      hasErrors = true;
    }
    if (!newResource.tentativeEndDate) {
      errors.tentativeEndDate = "Tentative End Date is required";
      hasErrors = true;
    }
    if (!newResource.resourceEffort.trim()) {
      errors.resourceEffort = "Resource Effort is required";
      hasErrors = true;
    }

    // Update errors state
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    // If no errors, add new resource
    setResources([...resources, newResource]);
    setNewResource({
      roleDescription: "",
      skill: "",
      tentativeStartDate: null,
      tentativeEndDate: null,
      resourceEffort: ""
    });
    setFormErrors({
      roleDescription: null,
      skill: null,
      tentativeStartDate: null,
      tentativeEndDate: null,
      resourceEffort: null
    });
  };

  // Function to format date as dd/mm/yyyy
  const formatDateToString = (date) => {
    if (!date) return "";
    if (typeof date === "string") {
      date = new Date(date);
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {Object.values(formErrors).some((error) => error !== null) && (
        <Alert variant="danger">Please fill out all required fields.</Alert>
      )}
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
          {currentResources?.map((resource, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <Form.Select
                      value={resource.roleDescription}
                      onChange={(e) => handleEditChange(e, "roleDescription", index)}
                    >
                      {roleOptions?.map((role, idx) => (
                        <option key={idx} value={role}>
                          {role}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Select
                      value={resource.skill}
                      onChange={(e) => handleEditChange(e, "skill", index)}
                    >
                      {skillOptions?.map((skill, idx) => (
                        <option key={idx} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={formatDateToString(resource.tentativeStartDate)}
                      onChange={(e) => handleEditChange(e, "tentativeStartDate", index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={formatDateToString(resource.tentativeEndDate)}
                      onChange={(e) => handleEditChange(e, "tentativeEndDate", index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={resource.resourceEffort}
                      onChange={(e) => handleEditChange(e, "resourceEffort", index)}
                    />
                  </td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={() => handleSave(index)}>
                        <SaveIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => setEditIndex(index)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{resource.roleDescription}</td>
                  <td>{resource.skill}</td>
                  <td>{formatDateToString(resource.tentativeStartDate)}</td>
                  <td>{formatDateToString(resource.tentativeEndDate)}</td>
                  <td>{resource.resourceEffort}</td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={() => setEditIndex(index)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td>
              <Form.Select
                value={newResource.roleDescription}
                onChange={(e) => handleNewResourceChange(e, "roleDescription")}
                isInvalid={formErrors.roleDescription !== null}
              >
                <option value="">Select Role...</option>
                {roleOptions?.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.roleDescription}
              </Form.Control.Feedback>
            </td>
            <td>
              <Form.Select
                value={newResource.skill}
                onChange={(e) => handleNewResourceChange(e, "skill")}
                isInvalid={formErrors.skill !== null}
              >
                <option value="">Select Skill...</option>
                {skillOptions?.map((skill, idx) => (
                  <option key={idx} value={skill}>
                    {skill}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formErrors.skill}</Form.Control.Feedback>
            </td>
            <td>
              <DatePicker
                value={newResource.tentativeStartDate}
                onSelectDate={(date) => handleDateChange(date, "tentativeStartDate")}
                placeholder="dd/mm/yyyy"
                isRequired
                isInvalid={formErrors.tentativeStartDate !== null}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.tentativeStartDate}
              </Form.Control.Feedback>
            </td>
            <td>
              <DatePicker
                value={newResource.tentativeEndDate}
                onSelectDate={(date) => handleDateChange(date, "tentativeEndDate")}
                placeholder="dd/mm/yyyy"
                isRequired
                isInvalid={formErrors.tentativeEndDate !== null}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.tentativeEndDate}
              </Form.Control.Feedback>
            </td>
            <td>
              <Form.Control
                type="number"
                value={newResource.resourceEffort}
                onChange={(e) => handleNewResourceChange(e, "resourceEffort")}
                isInvalid={formErrors.resourceEffort !== null}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.resourceEffort}
              </Form.Control.Feedback>
            </td>
            <td>
              <IconButton onClick={handleAddNew} style={{ color: "blue" }}>
                <AddIcon fontSize="small" />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </Table>
      <Stack spacing={2} direction="row" justifyContent="flex-end">
        <Pagination
          count={Math.ceil(resources?.length / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </div>
  );
}

export default ResourceEdit;
