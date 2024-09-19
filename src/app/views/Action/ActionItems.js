import React, { useState, useEffect } from "react";
import { Card, Button, Nav } from "react-bootstrap";
import { TextField } from "@fluentui/react";
import Pagination from "@mui/material/Pagination";
import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import GetInitiativeListStageActionItems from "app/hooks/Action/GetInitiativeStageActionItems"; // Update with actual import

export default function ActionItems() {
  const [activeTab, setActiveTab] = useState("stage-action-items");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [initiatives, setInitiatives] = useState([]);
  const [selectedInitiativeIndex, setSelectedInitiativeIndex] = useState(0); // Default selected initiative index
  const [selectedInitiativeDetails, setSelectedInitiativeDetails] = useState(null);
  const IdeaId = 61;
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetInitiativeListStageActionItems(IdeaId);
      setInitiatives(data.listInitiativeListStageActioItemsVM);
      if (data.listInitiativeListStageActioItemsVM.length > 0) {
        setSelectedInitiativeDetails(
          data.listInitiativeListStageActioItemsVM[0].initiativeStageActionItemListEntity
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initiatives.length > 0) {
      setSelectedInitiativeDetails(
        initiatives[selectedInitiativeIndex].initiativeStageActionItemListEntity
      );
    }
  }, [selectedInitiativeIndex, initiatives]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
    setSelectedInitiativeIndex(index);
  };

  const handleExportData = () => {
    // Placeholder for export functionality
    alert("Export functionality placeholder");
  };

  const filteredActionItems =
    selectedInitiativeDetails?.filter((item) =>
      item.actionItem.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const itemsPerPage = 5; // Change as per your requirement
  const startIndex = (currentPage - 1) * itemsPerPage;
  const slicedActionItems = filteredActionItems.slice(startIndex, startIndex + itemsPerPage);

  const renderInitiativesTable = () => (
    <Card>
      <Card.Header>Initiatives</Card.Header>
      <Card.Body>
        <TableContainer>
          <Table striped bordered hover>
            <TableBody>
              {initiatives.map((initiative, index) => (
                <TableRow key={initiative.id}>
                  <TableCell>
                    <span
                      className={`initiative-link ${
                        selectedInitiativeIndex === index ? "selected" : ""
                      }`}
                      onClick={() => handleInitiativeClick(index)}
                    >
                      {initiative.title}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card.Body>
    </Card>
  );

  const renderActionItemsTable = () => (
    <TableContainer>
      <Table striped bordered hover>
        <TableBody>
          {slicedActionItems.map((item) => (
            <TableRow key={item.actionID}>
              <TableCell>{item.actionItem}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>{item.requestStage}</TableCell>
              <TableCell>{item.assignTOEmployeeName || "N/A"}</TableCell>
              <TableCell>{item.submittedBy}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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

        <div className="row mt-4">
          <div className="col-md-4">{renderInitiativesTable()}</div>
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
            {renderActionItemsTable()}
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
    </div>
  );
}
