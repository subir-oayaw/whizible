import React, { useState, useEffect } from "react";
import InitiativeList from "./InitiativeList";
import { Container, Typography, Box, Pagination, IconButton } from "@mui/material";
import "./InitiativeManagement.css";
import SearchIcon from "../../../assets/img/serachlist-icn.svg";
import SearchList from "../../utils/SearchList";
import useInitiative from "../../hooks/useInitiative";
import { WhizLoading } from "app/components";
import EditPage from "./Edit/EditPage";
import { ViewList, ViewModule } from "@mui/icons-material"; // Import icons for list and card view
import { Button, Menu, MenuItem } from "@mui/material";
import { SortByAlpha, TrendingUp, CalendarToday } from "@mui/icons-material";
import SearchIcon1 from "../../../assets/img/search-icn.svg";
const InitiativeManagement = () => {
  const { dashboardData, loading, error } = useInitiative();
  const [initiatives, setInitiatives] = useState([]);
  const [finitiatives, setfInitiatives] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [initiativesID, SetinitiativesID] = useState(false);
  const [isListView, setIsListView] = useState(true); // State for list and card view toggle
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  console.log("initiativeId", initiativesID);
  const startEditing = () => {
    setIsEditing(true);
  };

  // Function to stop editing
  const stopEditing = () => {
    setIsEditing(false);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };
  useEffect(() => {
    if (dashboardData) {
      setInitiatives(dashboardData);
      filterInitiatives("All", dashboardData);
    }
  }, [dashboardData]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const handleSortOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleSortSelect = (option) => {
    // Implement sorting logic based on selected option
    console.log("Sorting by:", option);
    handleSortClose();
  };
  // Handle sorting dropdown close
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const calculateFilterCounts = (data) => {
    const counts = {
      all: data.length,
      inbox: data.length,
      watchlist: 0,
      draft: 0
    };

    data.forEach((initiative) => {
      switch (initiative.flag) {
        case "watchlist":
          counts.watchlist += 1;
          break;
        case "draft":
          counts.draft += 1;
          break;
        case "inbox":
          counts.inbox += 1;
          break;
        default:
          break;
      }
    });

    return counts;
  };

  const filterCounts = calculateFilterCounts(initiatives);

  const filterInitiatives = (filter, data = initiatives) => {
    let filteredInitiatives = [];

    switch (filter) {
      case "Inbox":
        filteredInitiatives = data.filter((initiative) => initiative.flag === "inbox");
        break;
      case "Watchlist":
        filteredInitiatives = data.filter((initiative) => initiative.flag === "watchlist");
        break;
      case "Draft":
        filteredInitiatives = data.filter((initiative) => initiative.flag === "draft");
        break;
      default:
        filteredInitiatives = [...data];
        break;
    }

    setCurrentFilter(filter);
    setfInitiatives(() => filteredInitiatives);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(finitiatives.length / 5);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <div>
        {" "}
        <WhizLoading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Toggle between list and card view
  const toggleView = () => {
    setIsListView((prevView) => !prevView);
  };

  return (
    <Container>
      <div className="container-fluid">
        <div className="row align-items-end">
          <div className="col-12 col-sm-5"></div>
        </div>
      </div>

      {isEditing ? (
        <>
          <EditPage initiativesID={initiativesID} />
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Initiative Management
          </Typography>
          <div className="container-fluid pb-3" style={{ paddingLeft: 0 }}>
            <div className="row align-items-end">
              <div className="col-12 col-sm-7">
                <div id="intFilters" className="init_filters">
                  <ul className="list-unstyled init_filtersList d-flex pt-3 mb-0">
                    <li
                      id="ImFltr-All"
                      data-bs-toggle="tooltip"
                      className={currentFilter === "All" ? "active" : ""}
                      data-bs-original-title="All"
                      onClick={() => filterInitiatives("All")}
                    >
                      <a href="javascript: void(0);" className="">
                        <span id="FltrCountAll" className="fltrcount">
                          {filterCounts.all}
                        </span>
                        <span className="fltrtitle">All</span>
                      </a>
                    </li>
                    <li
                      id="ImFltr-Inbox"
                      data-bs-toggle="tooltip"
                      className={currentFilter === "Inbox" ? "active" : ""}
                      data-bs-original-title="Inbox"
                      onClick={() => filterInitiatives("Inbox")}
                    >
                      <a href="javascript: void(0);">
                        <span id="FltrCountInbox" className="fltrcount">
                          {filterCounts.inbox}
                        </span>
                        <span className="fltrtitle">Inbox</span>
                      </a>
                    </li>
                    <li
                      id="ImFltr-Watchlist"
                      data-bs-toggle="tooltip"
                      className={currentFilter === "Watchlist" ? "active" : ""}
                      data-bs-original-title="Watchlist"
                      onClick={() => filterInitiatives("Watchlist")}
                    >
                      <a href="javascript: void(0);">
                        <span id="FltrCountWatchlist" className="fltrcount">
                          {filterCounts.watchlist}
                        </span>
                        <span className="fltrtitle">Watchlist</span>
                      </a>
                    </li>
                    <li
                      id="ImFltr-Draft"
                      data-bs-toggle="tooltip"
                      className={currentFilter === "Draft" ? "active" : ""}
                      data-bs-original-title="Draft"
                      onClick={() => filterInitiatives("Draft")}
                    >
                      <a href="javascript: void(0);">
                        <span id="FltrCountDraft" className="fltrcount">
                          {filterCounts.draft}
                        </span>
                        <span className="fltrtitle">Draft</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-5 d-flex justify-content-end">
                <div className="d-flex align-items-center">
                  <div className="search-box position-relative me-3">
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
                        src={SearchIcon1}
                        alt="Search"
                        data-bs-toggle="tooltip"
                        aria-label="Search"
                        data-bs-original-title="Search"
                      />
                    </a>
                  </div>
                  <div className="me-3" onClick={handleShowForm}>
                    <img
                      src={SearchIcon}
                      alt=""
                      data-bs-toggle="tooltip"
                      aria-label="Search List"
                      data-bs-original-title="Search List"
                    />
                  </div>
                  {/* Toggle between list and card view */}
                  <IconButton onClick={toggleView}>
                    {isListView ? <ViewModule /> : <ViewList />}
                  </IconButton>

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
              </div>
            </div>
          </div>
          {showForm && <SearchList onClose={handleCloseForm} />}
          <InitiativeList
            initiatives={finitiatives.slice((currentPage - 1) * 5, currentPage * 5)}
            page={currentPage}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            SetinitiativesID={SetinitiativesID}
            startEditing={startEditing}
            stopEditing={stopEditing}
            handleSearchChange={handleSearchChange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isListView={isListView} // Pass the state to determine view mode
          />
          {finitiatives.length > 5 && (
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
      )}
    </Container>
  );
};

export default InitiativeManagement;
