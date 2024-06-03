import React, { useState, useEffect } from "react";
import InitiativeList from "./InitiativeList";
import { Container, Typography, Box, Pagination } from "@mui/material";
import "./InitiativeManagement.css";
import SearchIcon from "../../../assets/img/serachlist-icn.svg";
import SearchList from "./SearchList";

const InitiativeManagement = () => {
  const [initiatives, setInitiatives] = useState([
    {
      id: "CR-039",
      title: "Metro Small",
      type: "Budget",
      date: "07 Aug 2022",
      stagesCompleted: 2,
      totalStages: 6,
      currentStage: "Approval",
      flag: "watchlist",
      dueIn: 14,
      businessGroup: "Finance",
      deliveryUnit: "Project Management",
      code: "MS-001",
      category: "Public Transport",
      organizationUnit: "Operations",
      deliveryTeam: "Metro Team",
      stages: [
        {
          from: "Stage 1",
          to: "Stage 2",
          actionTaken: "Reviewed and approved",
          approver: "Admin",
          completedOn: "10 Aug 2022 11:00:00",
          comments: "",
          delayedBy: "2 days"
        },
        {
          from: "Stage 2",
          to: "Stage 3",
          actionTaken: "Reviewed and approved",
          approver: "Admin",
          completedOn: "10 Aug 2022 11:00:00",
          comments: "",
          delayedBy: "2 days"
        },
        {
          from: "Stage 3",
          to: "Stage 4",
          actionTaken: "Reviewed and approved",
          approver: "Admin",
          completedOn: "10 Aug 2022 11:00:00",
          comments: "",
          delayedBy: "2 days"
        },
        {
          from: "Stage 4",
          to: "Stage 5",
          actionTaken: "Reviewed and approved",
          approver: "Admin",
          completedOn: "10 Aug 2022 11:00:00",
          comments: "",
          delayedBy: "2 days"
        },
        {
          from: "Stage 5",
          to: "Stage 6",
          actionTaken: "Reviewed and approved",
          approver: "Admin",
          completedOn: "10 Aug 2022 11:00:00",
          comments: "",
          delayedBy: "2 days"
        },
        {
          from: "Stage 6",
          to: "Stage 6",
          actionTaken: "Reviewed and approved",
          approver: "Admin",
          completedOn: "10 Aug 2022 11:00:00",
          comments: "",
          delayedBy: "2 days"
        }
      ],
      comments: [
        {
          authorInitials: "GP",
          authorName: "Gauri Pawale",
          date: "8:03 PM On 02/05/2023",
          content: "Discussion 01",
          replies: [
            {
              authorInitials: "MK",
              authorName: "Madhuri Kapure",
              date: "14:15 PM On 10/05/2023",
              content: "Discussion 01 Reply 01"
            }
            // More replies...
          ]
        }
        // More comments...
      ]
    },
    {
      id: "CR-026",
      title: "Init lorem",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 3,
      totalStages: 6,
      currentStage: "Approval",
      flag: "inbox",
      dueIn: 14,
      stages: [
        "Initiation",
        "Planning",
        "Execution",
        "Monitoring",
        "Control",
        "Approval",
        "Planning",
        "Execution",
        "Monitoring"
      ]
    },
    {
      id: "CR-083",
      title: "Init lorem",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 6,
      totalStages: 6,
      currentStage: "Execution",
      flag: "inbox",
      dueIn: 14,
      stages: ["Initiation", "Planning", "Execution", "Monitoring", "Control", "Approval"],
      comments: [
        {
          authorInitials: "GP",
          authorName: "Gauri Pawale",
          date: "8:03 PM On 02/05/2023",
          content: "Discussion 01",
          replies: [
            {
              authorInitials: "MK",
              authorName: "Madhuri Kapure",
              date: "14:15 PM On 10/05/2023",
              content: "Discussion 01 Reply 01"
            }
            // More replies...
          ]
        }
        // More comments...
      ]
    },
    {
      id: "CR-023",
      title: "Init lorem",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 3,
      totalStages: 6,
      currentStage: "Execution",
      flag: "inbox",
      dueIn: 14,
      stages: ["Initiation", "Planning", "Execution", "Monitoring", "Control", "Approval"],
      comments: [
        {
          authorInitials: "GP",
          authorName: "Gauri Pawale",
          date: "8:03 PM On 02/05/2023",
          content: "Discussion 01",
          replies: [
            {
              authorInitials: "MK",
              authorName: "Madhuri Kapure",
              date: "14:15 PM On 10/05/2023",
              content: "Discussion 01 Reply 01"
            }
            // More replies...
          ]
        }
        // More comments...
      ]
    },
    {
      id: "CR-038",
      title: "Metro Small",
      type: "Budget",
      date: "07 Aug 2022",
      stagesCompleted: 2,
      totalStages: 6,
      currentStage: "Approval",
      flag: "watchlist",
      dueIn: 14,
      stages: [
        "Initiation",
        "Planning",
        "Execution",
        "Monitoring",
        "Control",
        "Approval",
        "Control",
        "Approval"
      ],
      comments: [
        {
          authorInitials: "GP",
          authorName: "Gauri Pawale",
          date: "8:03 PM On 02/05/2023",
          content: "Discussion 01",
          replies: [
            {
              authorInitials: "MK",
              authorName: "Madhuri Kapure",
              date: "14:15 PM On 10/05/2023",
              content: "Discussion 01 Reply 01"
            }
            // More replies...
          ]
        }
        // More comments...
      ]
    },
    {
      id: "CR-025",
      title: "Init lorem1",
      type: "Organizational Approval",
      date: "07 Oct 2023",
      stagesCompleted: 3,
      totalStages: 6,
      currentStage: "Approval",
      flag: "watchlist",
      dueIn: 14,
      stages: [
        "Initiation",
        "Planning",
        "Execution",
        "Monitoring",
        "Control",
        "Approval",
        "Planning",
        "Execution",
        "Monitoring"
      ],
      comments: [
        {
          authorInitials: "GP",
          authorName: "Gauri Pawale",
          date: "8:03 PM On 02/05/2023",
          content: "Discussion 01",
          replies: [
            {
              authorInitials: "MK",
              authorName: "Madhuri Kapure",
              date: "14:15 PM On 10/05/2023",
              content: "Discussion 01 Reply 01"
            }
            // More replies...
          ]
        },
        {
          authorInitials: "oo",
          authorName: "op op",
          date: "8:03 PM On 02/05/2023",
          content: "Discussion 01",
          replies: [
            {
              authorInitials: "MK",
              authorName: "Madhuri Kapure",
              date: "14:15 PM On 10/05/2023",
              content: "Discussion 01 Reply 01"
            }
            // More replies...
          ]
        },
        {
          authorInitials: "PS",
          authorName: "P S",
          date: "8:03 PM On 02/05/2023",
          content: "Discussion 01",
          replies: [
            {
              authorInitials: "MK",
              authorName: "Madhuri Kapure",
              date: "14:15 PM On 10/05/2023",
              content: "Discussion 01 Reply 01"
            }
            // More replies...
          ]
        }
        // More comments...
      ]
    }
  ]);

  const [finitiatives, setfInitiatives] = useState(initiatives);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("inbox"); // Default filter is Inbox
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  // Function to calculate filter counts based on current state of initiatives
  const calculateFilterCounts = () => {
    const counts = {
      all: initiatives.length,
      inbox: 0,
      watchlist: 0,
      draft: 0
    };

    initiatives.forEach((initiative) => {
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

  const filterCounts = calculateFilterCounts();

  // Function to filter initiatives based on the current filter
  const filterInitiatives = (filter) => {
    setfInitiatives([]); // Clear previous data
    setCurrentFilter(filter);
    let filteredInitiatives = [];

    switch (filter) {
      case "Inbox":
        filteredInitiatives = initiatives.filter((initiative) => initiative.flag === "inbox");
        break;
      case "Watchlist":
        filteredInitiatives = initiatives.filter((initiative) => initiative.flag === "watchlist");
        break;
      case "Draft":
        filteredInitiatives = initiatives.filter((initiative) => initiative.flag === "draft");
        break;
      default:
        filteredInitiatives = [...initiatives];
        break;
    }

    setfInitiatives(filteredInitiatives);
    setCurrentPage(1); // Reset page to 1 after filtering
  };

  // Calculate total pages based on initiatives length
  const totalPages = Math.ceil(finitiatives.length / 5);

  // Handlers for pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // On component mount, filter by default filter (Inbox)
  useEffect(() => {
    filterInitiatives("Inbox");
  }, []); // Empty dependency array to run this effect only once after the initial render

  return (
    <Container>
      <div className="container-fluid">
        <div className="row align-items-end">
          <div className="col-12 col-sm-5">{/* Your existing top right actions section */}</div>
        </div>
      </div>
      <Typography variant="h4" gutterBottom>
        Initiative Management
      </Typography>
      <div class="container-fluid pb-3">
        <div class="row align-items-end">
          <div class="col-12 col-sm-7">
            <div id="intFilters" class="init_filters ps-2">
              <ul class="list-unstyled init_filtersList d-flex pt-3 mb-0">
                <li
                  id="ImFltr-All"
                  data-bs-toggle="tooltip"
                  class="active"
                  data-bs-original-title="All"
                  onClick={() => filterInitiatives("All")}
                >
                  <a href="javascript: void(0);" class="">
                    <span id="FltrCountAll" class="fltrcount">
                      {filterCounts.all}
                    </span>
                    <span class="fltrtitle">All</span>
                  </a>
                </li>
                <li
                  id="ImFltr-Inbox"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Inbox"
                  onClick={() => filterInitiatives("Inbox")}
                >
                  <a href="javascript: void(0);">
                    <span id="FltrCountInbox" class="fltrcount">
                      {filterCounts.inbox}
                    </span>
                    <span class="fltrtitle">Inbox</span>
                  </a>
                </li>
                <li
                  id="ImFltr-Watchlist"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Watchlist"
                  onClick={() => filterInitiatives("Watchlist")}
                >
                  <a href="javascript: void(0);">
                    <span id="FltrCountWatchlist" class="fltrcount">
                      {filterCounts.watchlist}
                    </span>
                    <span class="fltrtitle">Watchlist</span>
                  </a>
                </li>
                <li
                  id="ImFltr-Draft"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Draft"
                  onClick={() => filterInitiatives("Draft")}
                >
                  <a href="javascript: void(0);">
                    <span id="FltrCountDraft" class="fltrcount">
                      {filterCounts.draft}
                    </span>
                    <span class="fltrtitle">Draft</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-5 d-flex justify-content-end">
            <div class="" onClick={handleShowForm}>
              <img
                src={SearchIcon}
                alt=""
                data-bs-toggle="tooltip"
                aria-label="Search List"
                data-bs-original-title="Search List"
              />
            </div>
          </div>
        </div>
      </div>
      {showForm && <SearchList onClose={handleCloseForm} />}
      <InitiativeList
        initiatives={finitiatives.slice((currentPage - 1) * 5, currentPage * 5)}
        page={currentPage}
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
    </Container>
  );
};

export default InitiativeManagement;
