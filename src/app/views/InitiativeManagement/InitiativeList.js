import React, { useState } from "react";
import InitiativeItem from "./InitiativeItem";
import InitiativeCard from "./InitiativeCard";
import InitiativeCard1 from "./InitiativeCard1";
import InitiativeCard2 from "./InitiativeCard2"; // New component for card view
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
  MenuItem,
  Grid
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
  SetinitiativesID,
  stopEditing,
  handleSearchChange,
  searchTerm,
  setSearchTerm,
  isListView // Prop to determine if it's list view or card view
}) => {
  const [currentPage, setCurrentPage] = useState(page); // State for current page

  // Pagination states for each column in card view
  const [currentCardPage1, setCurrentCardPage1] = useState(1);
  const [currentCardPage2, setCurrentCardPage2] = useState(1);
  const [currentCardPage3, setCurrentCardPage3] = useState(1);

  // Filter initiatives based on search term
  const filteredInitiatives = initiatives.filter((initiative) =>
    initiative?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  // Pagination Logic
  const totalItems = filteredInitiatives.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const initiativesToShow = filteredInitiatives.slice(startIndex, endIndex);

  // Handle page change for list view
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle page change for card columns
  const handleCardPageChange1 = (event, value) => {
    setCurrentCardPage1(value);
  };

  const handleCardPageChange2 = (event, value) => {
    setCurrentCardPage2(value);
  };

  const handleCardPageChange3 = (event, value) => {
    setCurrentCardPage3(value);
  };

  // Handle sorting dropdown open

  // Handle sorting option selection

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
          <div className="d-flex justify-content-between align-items-center mb-3"></div>
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
                  SetinitiativesID={SetinitiativesID}
                  isEditing={isEditing}
                  startEditing={startEditing}
                  stopEditing={stopEditing}
                />
              ))}
            </tbody>
          </Table>
          {/* Pagination for List View */}
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
        </>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
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
                </div>
                <div className="card-container">
                  {initiativesToShow
                    .slice(
                      (currentCardPage1 - 1) * ITEMS_PER_PAGE,
                      currentCardPage1 * ITEMS_PER_PAGE
                    )
                    .map((initiative) => (
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
                {/* Pagination for Card Column 1 */}
                {filteredInitiatives.length > ITEMS_PER_PAGE && (
                  <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <Pagination
                      count={Math.ceil(filteredInitiatives.length / ITEMS_PER_PAGE)}
                      page={currentCardPage1}
                      onChange={handleCardPageChange1}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#e7edf0",
                borderTop: "5px solid #f55c30",
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
                </div>
                <div className="card-container">
                  {initiativesToShow
                    .slice(
                      (currentCardPage2 - 1) * ITEMS_PER_PAGE,
                      currentCardPage2 * ITEMS_PER_PAGE
                    )
                    .map((initiative) => (
                      <InitiativeCard1
                        key={initiative.id}
                        initiative={initiative}
                        setIsEditing={setIsEditing}
                        isEditing={isEditing}
                        startEditing={startEditing}
                        stopEditing={stopEditing}
                      />
                    ))}
                </div>
                {/* Pagination for Card Column 2 */}
                {filteredInitiatives.length > ITEMS_PER_PAGE && (
                  <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <Pagination
                      count={Math.ceil(filteredInitiatives.length / ITEMS_PER_PAGE)}
                      page={currentCardPage2}
                      onChange={handleCardPageChange2}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#e7edf0",
                borderTop: "5px solid #f5c330",
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
                </div>
                <div className="card-container">
                  {initiativesToShow
                    .slice(
                      (currentCardPage3 - 1) * ITEMS_PER_PAGE,
                      currentCardPage3 * ITEMS_PER_PAGE
                    )
                    .map((initiative) => (
                      <InitiativeCard2
                        key={initiative.id}
                        initiative={initiative}
                        setIsEditing={setIsEditing}
                        isEditing={isEditing}
                        startEditing={startEditing}
                        stopEditing={stopEditing}
                      />
                    ))}
                </div>
                {/* Pagination for Card Column 3 */}
                {filteredInitiatives.length > ITEMS_PER_PAGE && (
                  <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <Pagination
                      count={Math.ceil(filteredInitiatives.length / ITEMS_PER_PAGE)}
                      page={currentCardPage3}
                      onChange={handleCardPageChange3}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default InitiativeList;
