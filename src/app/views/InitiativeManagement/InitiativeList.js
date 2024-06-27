import React, { useState } from "react";
import InitiativeItem from "./InitiativeItem";
import InitiativeCard from "./InitiativeCard"; // New component for card view
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Pagination,
  IconButton,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import { ViewList, ViewModule, SortByAlpha, TrendingUp, CalendarToday } from "@mui/icons-material"; // Icons for list, card view, and sorting
import "./InitiativeList.css"; // Import your CSS file for styles
import SearchIcon from "../../../assets/img/search-icn.svg";

const ITEMS_PER_PAGE = 5; // Number of items per page

const InitiativeList = ({
  initiatives,
  page,
  setIsEditing,
  isEditing,
  startEditing,
  stopEditing,
  isListView // Prop to determine if it's list view or card view
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(page); // State for current page
  const [sortAnchorEl, setSortAnchorEl] = useState(null); // State for sorting dropdown anchor element

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Filter initiatives based on search term
  const filteredInitiatives = initiatives.filter((initiative) =>
    initiative.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalItems = filteredInitiatives.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const initiativesToShow = filteredInitiatives.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle sorting dropdown open
  const handleSortOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  // Handle sorting dropdown close
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  // Handle sorting option selection
  const handleSortSelect = (option) => {
    // Implement sorting logic based on selected option
    console.log("Sorting by:", option);
    handleSortClose();
  };

  // Legend for stages with colored boxes
  const stagesLegend = (
    <div className="gridlegends d-flex justify-content-center">
      <div className="legendList">
        <span id="lgdClearStage" className="legendSquare lgdGreen"></span>
        <span className="ms-2">Cleared</span> {/* Bootstrap margin class for spacing */}
      </div>
      <div className="legendList">
        <span id="lgdCurrentStage" className="legendSquare lgdYellow"></span>
        <span className="ms-2">Current</span>
      </div>
      <div className="legendList">
        <span id="lgdDelauCurrentStage" className="legendSquare lgdOrng"></span>
        <span className="ms-2">Delay</span>
      </div>
      <div className="legendList">
        <span id="lgdStageNotStartedYet" className="legendSquare lgdGray"></span>
        <span className="ms-2">Not started yet</span>
      </div>
    </div>
  );

  return (
    <Box>
      {/* Render content based on view mode */}
      {isListView ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="search-box position-relative">
              <input
                id="InitMangntSrchInput"
                className="search-text"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <a id="initgrid-srch-title" className="search-btn" href="javascript:void(0);">
                <img
                  src={SearchIcon}
                  alt="Search"
                  data-bs-toggle="tooltip"
                  aria-label="Search"
                  data-bs-original-title="Search"
                />
              </a>
            </div>
            <div className="d-flex align-items-center">
              <Button
                aria-controls="sort-menu"
                aria-haspopup="true"
                onClick={handleSortOpen}
                variant="outlined"
                className="me-3"
              >
                Sort
              </Button>
              <Menu
                id="sort-menu"
                anchorEl={sortAnchorEl}
                keepMounted
                open={Boolean(sortAnchorEl)}
                onClose={handleSortClose}
              >
                <MenuItem onClick={() => handleSortSelect("A to Z")}>
                  <SortByAlpha /> A to Z (Initiative Name)
                </MenuItem>
                {/* <MenuItem onClick={() => handleSortSelect("Z to A")}>
              <SortByAlphaReverse /> Z to A (Initiative Name)
            </MenuItem> */}
                <MenuItem onClick={() => handleSortSelect("% Complete (ASC)")}>
                  <TrendingUp /> % Complete (ASC)
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect("Stages Completed")}>
                  Stages Completed
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect("Initiation Date (DSC)")}>
                  <CalendarToday /> Initiation Date (DSC)
                </MenuItem>
              </Menu>
            </div>
          </div>
          <Table className="table table-bordered">
            <TableHead>
              <TableRow>
                <TableCell className="thOuter custom-col-width">
                  <div className="igph_title position-relative">Initiative Title</div>
                </TableCell>
                <TableCell className="thOuter col-sm-2">
                  <div className="igph_title position-relative">Nature of Initiative</div>
                </TableCell>
                <TableCell className="thOuter col-sm-5">
                  <div className="igph_title position-relative text-center pb-1">Stages</div>
                  <div className="stagesLegendContainer">{stagesLegend}</div>
                </TableCell>
                <TableCell className="thOuter col-sm-1">
                  <div className="igph_title text-center position-relative">Action</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {initiativesToShow.map((initiative) => (
                <InitiativeItem
                  key={initiative.id}
                  initiative={initiative}
                  stagesLegend={stagesLegend}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  startEditing={startEditing}
                  stopEditing={stopEditing}
                />
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Card
          sx={{
            backgroundColor: "#e7edf0",
            borderTop: "5px solid #3f51b5",
            borderBottom: "none"
          }}
          className="card-list-container"
        >
          <CardContent>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="search-box position-relative">
                <input
                  id="InitMangntSrchInput"
                  className="search-text"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <a id="initgrid-srch-title" className="search-btn" href="javascript:void(0);">
                  <img
                    src={SearchIcon}
                    alt="Search"
                    data-bs-toggle="tooltip"
                    aria-label="Search"
                    data-bs-original-title="Search"
                  />
                </a>
              </div>
              <div className="d-flex align-items-center">
                <Button
                  aria-controls="sort-menu"
                  aria-haspopup="true"
                  onClick={handleSortOpen}
                  variant="outlined"
                  className="me-3"
                >
                  Sort
                </Button>
                <Menu
                  id="sort-menu"
                  anchorEl={sortAnchorEl}
                  keepMounted
                  open={Boolean(sortAnchorEl)}
                  onClose={handleSortClose}
                >
                  <MenuItem onClick={() => handleSortSelect("A to Z")}>
                    <SortByAlpha /> A to Z (Initiative Name)
                  </MenuItem>
                  {/* <MenuItem onClick={() => handleSortSelect("Z to A")}>
              <SortByAlphaReverse /> Z to A (Initiative Name)
            </MenuItem> */}
                  <MenuItem onClick={() => handleSortSelect("% Complete (ASC)")}>
                    <TrendingUp /> % Complete (ASC)
                  </MenuItem>
                  <MenuItem onClick={() => handleSortSelect("Stages Completed")}>
                    Stages Completed
                  </MenuItem>
                  <MenuItem onClick={() => handleSortSelect("Initiation Date (DSC)")}>
                    <CalendarToday /> Initiation Date (DSC)
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div className="card-container">
              {initiativesToShow.map((initiative) => (
                <InitiativeCard
                  key={initiative.id}
                  initiative={initiative}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  startEditing={startEditing}
                  stopEditing={stopEditing}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {filteredInitiatives.length > ITEMS_PER_PAGE && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default InitiativeList;
