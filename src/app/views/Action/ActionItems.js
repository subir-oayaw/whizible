import React, { useState } from "react";
import { Card, Button, Table, Nav } from "react-bootstrap";
import { TextField } from "@fluentui/react";
import Pagination from "@mui/material/Pagination";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function ActionItemsComponent() {
  const [activeTab, setActiveTab] = useState("stage-action-items");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInitiative, setSelectedInitiative] = useState(null); // State for selected initiative

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleInitiativeClick = (index) => {
    setSelectedInitiative(index);
  };

  const handleExportData = () => {
    // Placeholder for export functionality
    alert("Export functionality placeholder");
  };

  // Example dynamic initiative data
  const initiativeData = {
    title: "ATM Center Request at Pune",
    links: [
      { text: "ATM Center Request at Pune", href: "/atm-center" },
      { text: "Budget", href: "/budget" },
      { text: "Budget Plan 2023", href: "/budget-plan-2023" },
      { text: "Budget Title", href: "/budget-title" }
    ]
  };

  // Example action items data
  const actionItems = [
    {
      actionItem: "Annual Budget Report Attached?",
      dueDate: "04 Jun 2023",
      stage: "CFO Approval",
      assignedTo: "Sayali",
      submittedBy: "Madeleine Swann",
      status: "Completed",
      priority: "High"
    },
    {
      actionItem: "Annual Budget Projection Approved?",
      dueDate: "04 Jun 2023",
      stage: "CFO Approval",
      assignedTo: "Sayali",
      submittedBy: "Madeleine Swann",
      status: "Initiated",
      priority: "High"
    },
    {
      actionItem: "Is Audit Report Attached?",
      dueDate: "04 Jun 2023",
      stage: "Delivery Manager",
      assignedTo: "Madeleine Swann",
      submittedBy: "Madeleine Swann",
      status: "Initiated",
      priority: "High"
    },
    {
      actionItem: "Is Audit Report Attached?",
      dueDate: "04 Jun 2023",
      stage: "Delivery Manager",
      assignedTo: "Robin",
      submittedBy: "Madeleine Swann",
      status: "Initiated",
      priority: "High"
    },
    {
      actionItem: "Is Audit Report Attached?",
      dueDate: "04 Jun 2023",
      stage: "Delivery Manager",
      assignedTo: "Nikhil Adatkar",
      submittedBy: "Madeleine Swann",
      status: "Initiated",
      priority: "High"
    },
    {
      actionItem: "Is Audit Report Attached?",
      dueDate: "04 Jun 2023",
      stage: "Delivery Manager",
      assignedTo: "Nirbhay",
      submittedBy: "Madeleine Swann",
      status: "Initiated",
      priority: "High"
    }
    // Add more action items as needed
  ];

  // Filter action items based on search query
  const filteredActionItems = actionItems.filter((item) =>
    item.actionItem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination settings
  const itemsPerPage = 5; // Change as per your requirement
  const startIndex = (currentPage - 1) * itemsPerPage;
  const slicedActionItems = filteredActionItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-fluid p-4">
      <div className="border-bottom pb-4">
        <h1 className="text-xl font-semibold">Action Items</h1>
        <Nav variant="tabs" defaultActiveKey={activeTab} className="mt-4">
          <Nav.Item>
            <Nav.Link
              eventKey="stage-action-items"
              onClick={() => handleTabChange("stage-action-items")}
            >
              Stage Action Items
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="audit-action-items"
              onClick={() => handleTabChange("audit-action-items")}
            >
              Audit Action Items
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Use Routes component for handling routes */}
        <Routes>
          <Route path="/" element={<RenderActionItems />} />
          <Route path="/atm-center" element={<div>ATM Center Content</div>} />
          <Route path="/budget" element={<div>Budget Content</div>} />
          <Route path="/budget-plan-2023" element={<div>Budget Plan 2023 Content</div>} />
          <Route path="/budget-title" element={<div>Budget Title Content</div>} />

          {/* Default route when no other route matches */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );

  // Function to render Action Items based on active tab
  function RenderActionItems() {
    return (
      <div className="mt-4">
        <p className="text-center text-muted-foreground mb-4">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        </p>
        <h2 className="text-center text-lg font-semibold mb-4">
          Initiative Title: {initiativeData.title}
        </h2>
        <div className="row">
          <div className="col-md-4">
            <Card>
              <Card.Header>Initiative Title</Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  {initiativeData.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className={`text-blue-500 ${
                          selectedInitiative === index ? "selected" : ""
                        }`}
                        onClick={() => handleInitiativeClick(index)}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-center">
                <Button variant="outline" size="sm">
                  &laquo; 1 &raquo;
                </Button>
              </Card.Footer>
            </Card>
          </div>
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-2">
                <TextField
                  placeholder="Search"
                  className="w-64"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  Export Data
                </Button>
                <Button variant="secondary" size="sm">
                  Delete
                </Button>
              </div>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Action Item</th>
                  <th>Due Date</th>
                  <th>Stage</th>
                  <th>Assigned To</th>
                  <th>Submitted By</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {slicedActionItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.actionItem}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.stage}</td>
                    <td>{item.assignedTo}</td>
                    <td>{item.submittedBy}</td>
                    <td>{item.status}</td>
                    <td>{item.priority}</td>
                    <td>{/* <FluentCheckbox /> */}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="mt-4 d-flex justify-content-center">
              <Pagination
                count={Math.ceil(filteredActionItems.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
