import React, { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Icon } from "@fluentui/react/lib/Icon";

function ResourceEdit({ resourcesData }) {
  const [resources, setResources] = useState(resourcesData);
  const [editIndex, setEditIndex] = useState(null);
  const [newResource, setNewResource] = useState({
    role: "",
    skills: "",
    inDate: "",
    outDate: "",
    fte: ""
  });

  const handleEditChange = (e, field, index) => {
    const updatedResources = [...resources];
    updatedResources[index][field] = e.target.value;
    setResources(updatedResources);
  };

  const handleNewResourceChange = (e, field) => {
    setNewResource({ ...newResource, [field]: e.target.value });
  };

  const handleSave = (index) => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedResources = resources.filter((_, i) => i !== index);
    setResources(updatedResources);
  };

  const handleAddNew = () => {
    setResources([...resources, newResource]);
    setNewResource({
      role: "",
      skills: "",
      inDate: "",
      outDate: "",
      fte: ""
    });
  };

  return (
    <>
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
          {resources.map((resource, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      value={resource.role}
                      onChange={(e) => handleEditChange(e, "role", index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={resource.skills}
                      onChange={(e) => handleEditChange(e, "skills", index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      value={resource.inDate}
                      onChange={(e) => handleEditChange(e, "inDate", index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      value={resource.outDate}
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
                    <Icon
                      iconName="Save"
                      onClick={() => handleSave(index)}
                      style={{ cursor: "pointer", color: "green" }}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{resource.role}</td>
                  <td>{resource.skills}</td>
                  <td>{resource.inDate}</td>
                  <td>{resource.outDate}</td>
                  <td>{resource.fte}</td>
                  <td>
                    <Icon
                      iconName="Edit"
                      onClick={() => setEditIndex(index)}
                      style={{ cursor: "pointer", color: "orange" }}
                    />{" "}
                    <Icon
                      iconName="Delete"
                      onClick={() => handleDelete(index)}
                      style={{ cursor: "pointer", color: "red" }}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td>
              <Form.Control
                type="text"
                value={newResource.role}
                onChange={(e) => handleNewResourceChange(e, "role")}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={newResource.skills}
                onChange={(e) => handleNewResourceChange(e, "skills")}
              />
            </td>
            <td>
              <Form.Control
                type="date"
                value={newResource.inDate}
                onChange={(e) => handleNewResourceChange(e, "inDate")}
              />
            </td>
            <td>
              <Form.Control
                type="date"
                value={newResource.outDate}
                onChange={(e) => handleNewResourceChange(e, "outDate")}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={newResource.fte}
                onChange={(e) => handleNewResourceChange(e, "fte")}
              />
            </td>
            <td>
              <Icon
                iconName="Add"
                onClick={handleAddNew}
                style={{ cursor: "pointer", color: "blue" }}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default ResourceEdit;
