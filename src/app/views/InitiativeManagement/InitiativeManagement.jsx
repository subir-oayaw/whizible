import React, { useState, useEffect } from "react";
import InitiativeList from "./InitiativeList";
import {
  Container,
  Box,
  Tooltip,
  Pagination,
  IconButton,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import { PrimaryButton } from "@fluentui/react";
import SearchIcon from "../../../assets/img/serachlist-icn.svg";
import SearchList from "../../utils/SearchList";
import useInitiative from "../../hooks/useInitiative";
import { WhizLoading } from "app/components";
import EditPage from "./Edit/EditPage";
import { ViewList, ViewModule, SortByAlpha, TrendingUp, CalendarToday } from "@mui/icons-material";
import SearchIcon1 from "../../../assets/img/search-icn.svg";
import useGetViewOptions from "app/hooks/useGetViewOptions";
import tagMappings from "../../../app/TagNames/tag";
import { useTranslation } from "react-i18next";
import fetchFilters from "../../hooks/SearchFilters/filters"; // Assume this is the correct import
import InitiativeCardViewDraft from "../../hooks/CardInitiative/GetInitiativeCardViewDraft";
import InitiativeCardViewDelayed from "app/hooks/CardInitiative/InitiativeCardViewDelayed";
import InitiativeCardViewOnTime from "../../hooks/CardInitiative/GetInitiativeCardViewOnTime";

const InitiativeManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCardPage1, setCurrentCardPage1] = useState(1);
  const [currentCardPage2, setCurrentCardPage2] = useState(1);
  const [currentCardPage3, setCurrentCardPage3] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("T");
  const [filters, setFilters] = useState(null);
  const [searchFilters, setSearchFilters] = useState(null);
  const { dashboardData, loading, error } = useInitiative(currentPage, currentFilter, filters);
  const [initiatives, setInitiatives] = useState([]);
  const [finitiatives, setfInitiatives] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [initiativesID, SetinitiativesID] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // Manage total pages with state

  const { getViewOptions } = useGetViewOptions(tagMappings.Initiative.toString());
  const viewPermission = getViewOptions && getViewOptions[0] ? getViewOptions[0] : {};
  const { a: canAdd, e: canEdit, d: canDelete } = viewPermission;
  const { t } = useTranslation();
  const [dashboardData1, setDashboardData1] = useState(null);
  const [dashboardData2, setDashboardData2] = useState(null);
  const [dashboardData3, setDashboardData3] = useState(null);

  // Load data when isListView is true
  useEffect(() => {
    if (!isListView) {
      const fetchData = async () => {
        try {
          const data1 = await InitiativeCardViewDraft(currentCardPage1, isListView);
          const data2 = await InitiativeCardViewOnTime(currentCardPage2, isListView);
          const data3 = await InitiativeCardViewDelayed(currentCardPage3, isListView);
          console.log("DashboardData1", data1, data2, data3);
          setDashboardData1(data1);
          setDashboardData2(data2);
          setDashboardData3(data3);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [isListView, currentCardPage1, currentCardPage2, currentCardPage3]);

  // Conditionally use the data based on `isListView`

  const loadFilters = async () => {
    try {
      const data = await fetchFilters(); // Call the imported filters function
      console.log("Filters", data);
      setSearchFilters(data); // Store the data in state
    } catch (error) {
      console.error("Failed to fetch filters:", error);
    }
  };

  useEffect(() => {
    loadFilters(); // Correctly call the function
  }, []);

  useEffect(() => {
    if (dashboardData) {
      setInitiatives(dashboardData);
    }
  }, [dashboardData]);

  useEffect(() => {
    // Update totalPages when initiatives or currentFilter change
    if (initiatives.length > 0) {
      const counts = {
        T: initiatives[0]?.toDolIstCount,
        W: initiatives[0]?.watchlistCount,
        D: initiatives[0]?.draftCount
      };
      const totalCount = counts[currentFilter] || 0;
      setTotalPages(Math.ceil(totalCount / 5));
    }
  }, [initiatives, currentFilter]);

  const startEditing = () => {
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleSortOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortSelect = (option) => {
    console.log("Sorting by:", option);
    handleSortClose();
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDisabledClick = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const calculateFilterCounts = (data) => {
    const counts = {
      inbox: data[0]?.toDolIstCount,
      watchlist: data[0]?.watchlistCount,
      draft: data[0]?.draftCount
    };
    return counts;
  };

  const filterCounts = calculateFilterCounts(initiatives);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const onSearch = (filters) => {
    setFilters(filters);

    setCurrentPage(1); // Reset page to 1 for new search results
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <WhizLoading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <div className="container-fluid pb-3" style={{ paddingLeft: 0 }}>
            <div className="row align-items-end">
              <div className="col-12 col-sm-7">
                <div id="intFilters" className="init_filters">
                  <ul className="list-unstyled init_filtersList d-flex pt-3 mb-0">
                    <li
                      id="ImFltr-Inbox"
                      data-bs-toggle="tooltip"
                      className={currentFilter === "Inbox" ? "active" : ""}
                      data-bs-original-title="Inbox"
                      onClick={() => {
                        setCurrentFilter("T");
                      }}
                    >
                      <a>
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
                      onClick={() => {
                        setCurrentFilter("W");
                      }}
                    >
                      <a>
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
                      onClick={() => {
                        setCurrentFilter("D");
                      }}
                    >
                      <a>
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
                  {/* <div className="search-box position-relative me-3">
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
                  </div> */}

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

                  {/* <div className="d-flex align-items-center">
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
                  </div> */}
                  <Tooltip title={!canAdd ? t("no_rights_add") : ""}>
                    <span>
                      <PrimaryButton
                        onClick={() => {
                          if (!canAdd) {
                            handleDisabledClick(t("no_rights_add"));
                          } else {
                            setDrawerVisible(true);
                          }
                        }}
                        text={t("Add")}
                        disabled={!canAdd}
                        styles={{
                          root: { backgroundColor: canAdd ? "#1976d2" : "#ccc", color: "#fff" }
                        }}
                      />
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          {showForm && (
            <SearchList
              onClose={handleCloseForm}
              searchFilters={searchFilters}
              onSearch={onSearch}
            />
          )}
          <InitiativeList
            initiatives={initiatives}
            dashboardData1={dashboardData1}
            dashboardData2={dashboardData2}
            dashboardData3={dashboardData3}
            currentCardPage1={currentCardPage1}
            currentCardPage2={currentCardPage2}
            currentCardPage3={currentCardPage3}
            setCurrentCardPage1={setCurrentCardPage1}
            setCurrentCardPage2={setCurrentCardPage2}
            setCurrentCardPage3={setCurrentCardPage3}
            page={currentPage}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            SetinitiativesID={SetinitiativesID}
            startEditing={startEditing}
            stopEditing={stopEditing}
            handleSearchChange={handleSearchChange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isListView={isListView}
            canEdit={canEdit}
            handleDisabledClick={handleDisabledClick}
          />

          {isListView && (
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
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Notice"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{modalMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InitiativeManagement;
