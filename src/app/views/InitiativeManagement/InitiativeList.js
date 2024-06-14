import React, { useState } from "react";
import InitiativeItem from "./InitiativeItem";
import { Box, Table, TableHead, TableRow, TableCell, Pagination, Stack } from "@mui/material";
import "./InitiativeList.css"; // Import your CSS file for styles
import SearchIcon from "../../../assets/img/search-icn.svg";

const ITEMS_PER_PAGE = 5; // Number of items per page

const InitiativeList = ({
  initiatives,
  page,
  setIsEditing,
  isEditing,
  startEditing,
  stopEditing
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(page); // State for current page

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
      <Table className="table table-bordered">
        <TableHead>
          <TableRow>
            <TableCell className="thOuter custom-col-width">
              <div className="igph_title position-relative">
                Initiative Title
                <div className="search-box position-absolute top-50 end-0 translate-middle-y me-2">
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
    </Box>
  );
};

export default InitiativeList;
