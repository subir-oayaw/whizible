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

function ResourceEdit({ resourcesData }) {
  const [resources, setResources] = useState(resourcesData);
  const [editIndex, setEditIndex] = useState(null);
  const [newResource, setNewResource] = useState({
    role: "",
    skills: "",
    inDate: null,
    outDate: null,
    fte: ""
  });
  const [formErrors, setFormErrors] = useState({
    role: null,
    skills: null,
    inDate: null,
    outDate: null,
    fte: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  // Dropdown options
  const roleOptions = ["Developer", "Designer", "Manager", "Analyst"];
  const skillOptions = ["React", "JavaScript", "CSS", "HTML"];

  // Calculate pagination
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentResources = resources.slice(firstIndex, lastIndex);

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

    if (!newResource.role.trim()) {
      errors.role = "Role is required";
      hasErrors = true;
    }
    if (!newResource.skills.trim()) {
      errors.skills = "Skills are required";
      hasErrors = true;
    }
    if (!newResource.inDate) {
      errors.inDate = "In Date is required";
      hasErrors = true;
    }
    if (!newResource.outDate) {
      errors.outDate = "Out Date is required";
      hasErrors = true;
    }
    if (!newResource.fte.trim()) {
      errors.fte = "FTE is required";
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
      role: "",
      skills: "",
      inDate: null,
      outDate: null,
      fte: ""
    });
    setFormErrors({
      role: null,
      skills: null,
      inDate: null,
      outDate: null,
      fte: null
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
          {currentResources.map((resource, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <Form.Select
                      value={resource.role}
                      onChange={(e) => handleEditChange(e, "role", index)}
                    >
                      {roleOptions.map((role, idx) => (
                        <option key={idx} value={role}>
                          {role}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Select
                      value={resource.skills}
                      onChange={(e) => handleEditChange(e, "skills", index)}
                    >
                      {skillOptions.map((skill, idx) => (
                        <option key={idx} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={formatDateToString(resource.inDate)}
                      onChange={(e) => handleEditChange(e, "inDate", index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={formatDateToString(resource.outDate)}
                      onChange={(e) => handleEditChange(e, "outDate", index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={resource.fte}
                      onChange={(e) => handleEditChange(e, "fte", index)}
                    />
                  </td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={() => handleSave(index)} style={{ color: "green" }}>
                        <SaveIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => setEditIndex(index)} style={{ color: "orange" }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)} style={{ color: "red" }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{resource.role}</td>
                  <td>{resource.skills}</td>
                  <td>{formatDateToString(resource.inDate)}</td>
                  <td>{formatDateToString(resource.outDate)}</td>
                  <td>{resource.fte}</td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <IconButton onClick={() => setEditIndex(index)} style={{ color: "orange" }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)} style={{ color: "red" }}>
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
                value={newResource.role}
                onChange={(e) => handleNewResourceChange(e, "role")}
                isInvalid={formErrors.role !== null}
              >
                <option value="">Select Role...</option>
                {roleOptions.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formErrors.role}</Form.Control.Feedback>
            </td>
            <td>
              <Form.Select
                value={newResource.skills}
                onChange={(e) => handleNewResourceChange(e, "skills")}
                isInvalid={formErrors.skills !== null}
              >
                <option value="">Select Skill...</option>
                {skillOptions.map((skill, idx) => (
                  <option key={idx} value={skill}>
                    {skill}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formErrors.skills}</Form.Control.Feedback>
            </td>
            <td>
              <DatePicker
                value={newResource.inDate}
                onSelectDate={(date) => handleDateChange(date, "inDate")}
                placeholder="dd/mm/yyyy"
                isRequired
                isInvalid={formErrors.inDate !== null}
              />
              <Form.Control.Feedback type="invalid">{formErrors.inDate}</Form.Control.Feedback>
            </td>
            <td>
              <DatePicker
                value={newResource.outDate}
                onSelectDate={(date) => handleDateChange(date, "outDate")}
                placeholder="dd/mm/yyyy"
                isRequired
                isInvalid={formErrors.outDate !== null}
              />
              <Form.Control.Feedback type="invalid">{formErrors.outDate}</Form.Control.Feedback>
            </td>
            <td>
              <Form.Control
                type="number"
                value={newResource.fte}
                onChange={(e) => handleNewResourceChange(e, "fte")}
                isInvalid={formErrors.fte !== null}
              />
              <Form.Control.Feedback type="invalid">{formErrors.fte}</Form.Control.Feedback>
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
          count={Math.ceil(resources.length / pageSize)}
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
