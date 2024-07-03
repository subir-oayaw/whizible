import React, { useState, useEffect } from "react";
import { Card, Button, Nav } from "react-bootstrap";
import { TextField } from "@fluentui/react";
import Pagination from "@mui/material/Pagination";
import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import AtmCenterRequest from "./AtmCenterRequest";
import Budget from "./Budget";
import BudgetPlan from "./BudgetPlan";
import BudgetTitle from "./BudgetTitle";

export default function ActionItems() {
  const [activeTab, setActiveTab] = useState("stage-action-items");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInitiative, setSelectedInitiative] = useState(0); // Default selected initiative index

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedInitiative(0); // Reset selected initiative when changing tabs
    setCurrentPage(1); // Reset to the first page when changing tabs
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
    title: "Action Items",
    links: [
      { text: "ATM Center Request at Pune", content: "ATM Center Content" },
      { text: "Budget", content: "Budget Content" },
      { text: "Budget Plan 2023", content: "Budget Plan 2023 Content" },
      { text: "Budget Title", content: "Budget Title Content" }
    ]
  };
  const BudgetData = {
    title: "Budget Plan 2023",
    links: [
      { text: "ATM Center Request at Pune", content: "ATM Center Content" },
      { text: "Budget", content: "Budget Content" },
      { text: "Budget Plan 2023", content: "Budget Plan 2023 Content" },
      { text: "Budget Title", content: "Budget Title Content" }
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
      priority: "High",
      initiative: "ATM Center Request at Pune" // Initiative associated with this action item
    },
    {
      actionItem: "Annual Budget Projection Approved?",
      dueDate: "04 Jun 2023",
      stage: "CFO Approval",
      assignedTo: "Sayali",
      submittedBy: "Madeleine Swann",
      status: "Initiated",
      priority: "High",
      initiative: "Budget" // Initiative associated with this action item
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

  useEffect(() => {
    // Ensure the first initiative is selected by default
    setSelectedInitiative(0);
  }, []);

  const renderInitiativeContent = () => {
    const initiative = initiativeData.links[selectedInitiative];
    if (initiative) {
      if (initiative.text === "ATM Center Request at Pune") {
        return <AtmCenterRequest slicedActionItems={slicedActionItems} />;
      } else if (initiative.text === "Budget") {
        return <Budget slicedActionItems={slicedActionItems} />;
      } else if (initiative.text === "Budget Plan 2023") {
        return <BudgetPlan slicedActionItems={slicedActionItems} />;
      } else if (initiative.text === "Budget Title") {
        return <BudgetTitle slicedActionItems={slicedActionItems} />;
      } else {
        return (
          <div className="mt-4">
            <h2 className="text-center text-lg font-semibold mb-4">{initiative.text}</h2>
            <div>{initiative.content}</div>
          </div>
        );
      }
    }
    return null; // Render nothing if no initiative is selected
  };
  const renderBudgetContent = () => {
    const initiative = initiativeData.links[selectedInitiative];
    if (initiative) {
      if (initiative.text === "ATM Center Request at Pune") {
        return <AtmCenterRequest slicedActionItems={slicedActionItems} />;
      } else if (initiative.text === "Budget") {
        return <Budget slicedActionItems={slicedActionItems} />;
      } else if (initiative.text === "Budget Plan 2023") {
        return <BudgetPlan slicedActionItems={slicedActionItems} />;
      } else if (initiative.text === "Budget Title") {
        return <BudgetTitle slicedActionItems={slicedActionItems} />;
      } else {
        return (
          <div className="mt-4">
            <h2 className="text-center text-lg font-semibold mb-4">{initiative.text}</h2>
            <div>{initiative.content}</div>
          </div>
        );
      }
    }
    return null; // Render nothing if no initiative is selected
  };

  const renderActionItems = () => {
    // Depending on the activeTab, render the corresponding action items
    if (activeTab === "stage-action-items") {
      return (
        <div className="mt-4">
          <p className="text-center text-muted-foreground mb-4">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          </p>
          <h2 className="text-center text-lg font-semibold mb-4">
            Initiative Title: {initiativeData.title}
          </h2>
          <div className="row">
            <div className="col-md-4">
              <Card>
                <Card.Header>Initiative Title</Card.Header>
                <Card.Body>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {initiativeData.links.map((link, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <span
                                className={`initiative-link ${
                                  selectedInitiative === index ? "selected" : ""
                                }`}
                                onClick={() => handleInitiativeClick(index)}
                              >
                                {link.text}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-8">
              <div className="d-flex justify-content-end align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                  <TextField
                    placeholder="Search"
                    className="w-64"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <div className="ml-auto">
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      Export Data
                    </Button>
                    <Button variant="secondary" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
              {renderInitiativeContent()}

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
    } else if (activeTab === "audit-action-items") {
      // Render Audit Action Items logic here
      return (
        <div className="mt-4">
          <p className="text-center text-muted-foreground mb-4">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          </p>
          <h2 className="text-center text-lg font-semibold mb-4">
            Initiative Title: {BudgetData.title}
          </h2>
          <div className="row">
            <div className="col-md-4">
              <Card>
                <Card.Header>Initiative Title</Card.Header>
                <Card.Body>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {BudgetData.links.map((link, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <span
                                className={`initiative-link ${
                                  selectedInitiative === index ? "selected" : ""
                                }`}
                                onClick={() => handleInitiativeClick(index)}
                              >
                                {link.text}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-8">
              <div className="d-flex justify-content-end align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                  <TextField
                    placeholder="Search"
                    className="w-64"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <div className="ml-auto">
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      Export Data
                    </Button>
                    <Button variant="secondary" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
              {renderBudgetContent()}

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
    return null;
  };

  return (
    <div className="container-fluid p-4">
      <div className="border-bottom pb-4">
        <h1 className="text-xl font-semibold">{initiativeData.title}</h1>
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

        {/* Render selected initiative content */}
        {renderActionItems()}
      </div>
    </div>
  );
}
