import React, { useState } from "react";
import { Typography, IconButton, Tooltip, Drawer, Box, Divider, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomProgressBar from "../../utils/CustomProgressBar";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import "./InitiativeItem.css";

const InitiativeItem = ({ initiative, stagesLegend }) => {
  const {
    title,
    id,
    type,
    date,
    stagesCompleted,
    totalStages,
    dueIn,
    stages,
    comments: initialComments
  } = initiative;

  // State for managing drawers and editing
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [flagDrawerOpen, setFlagDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(-1);
  const [comments, setComments] = useState(initialComments || []); // Initialize comments with initialComments from props
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false); // State for InitiativeHistoryDrawer

  // Function to open comment drawer
  const openCommentDrawer = () => {
    setCommentDrawerOpen(true);
  };

  // Function to close comment drawer
  const closeCommentDrawer = () => {
    setCommentDrawerOpen(false);
  };

  // Function to open flag drawer
  const openFlagDrawer = () => {
    setFlagDrawerOpen(true);
  };

  // Function to close flag drawer
  const closeHistory = () => {
    setHistoryDrawerOpen(false);
  };
  const openHistory = () => {
    setHistoryDrawerOpen(true);
  };

  // Function to close flag drawer
  const closeFlagDrawer = () => {
    setFlagDrawerOpen(false);
  };

  // Function to start editing
  const startEditing = () => {
    setIsEditing(true);
  };

  // Function to add a new comment
  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  // Function to toggle expanded replies for a comment
  const toggleReplies = (index) => {
    setExpandedCommentIndex(index === expandedCommentIndex ? -1 : index);
  };

  // Handle form submission for adding a comment on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const formData = new FormData(event.target.form);
      const newComment = {
        authorInitials: "AA", // Replace with actual initials logic
        authorName: "Anonymous", // Replace with actual author name logic
        date: new Date().toLocaleDateString(), // Use current date/time or any format you prefer
        content: formData.get("commentContent"), // Get comment content from form
        replies: [] // Initialize with empty replies
      };
      addComment(newComment);
      event.target.form.reset(); // Clear the form after submission
    }
  };

  const buttonStyles = {
    root: {
      border: "none",
      boxShadow: "none",
      padding: 0,
      height: "auto",
      minHeight: "auto"
    },
    rootHovered: {
      border: "none",
      boxShadow: "none"
    },
    rootPressed: {
      border: "none",
      boxShadow: "none"
    }
  };

  return (
    <tr>
      <td>
        <div className="initiative-title">
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {id}
          </Typography>
        </div>
      </td>
      <td style={{ textAlign: "start" }}>
        <Typography variant="body2">{type}</Typography>
        <Typography variant="body2" color="textSecondary">
          {date}
        </Typography>
      </td>
      <td>
        <div className="left-side">
          <Typography variant="body2" className="due-in" color="textSecondary">
            {dueIn} Days
          </Typography>
        </div>

        <CustomProgressBar
          stagesCompleted={stagesCompleted}
          totalStages={totalStages}
          stages={stages}
          initiative={initiative}
          stagesLegend={stagesLegend}
        />
        <Typography variant="body2" color="textSecondary">
          {stagesCompleted} stages completed
        </Typography>
      </td>
      <td>
        <div className="current-stage-container">
          <div className="current-stage">
            <div className="initiative-actions">
              {/* Edit Icon */}
              <div className="icon-button-container">
                <Tooltip title="Edit">
                  <IconButton onClick={startEditing}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="icon-button-container">
                <Tooltip title="Comment">
                  <IconButton onClick={openCommentDrawer}>
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="icon-button-container">
                <Tooltip title="Delay">
                  <IconButton>
                    <AccessTimeIcon onClick={() => setHistoryDrawerOpen(true)} />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="icon-button-container">
                <Tooltip title="Flag">
                  <IconButton onClick={openFlagDrawer}>
                    <FlagIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </td>

      {/* Drawer for Comments */}
      <Drawer anchor="right" open={commentDrawerOpen} onClose={closeCommentDrawer}>
        <Box sx={{ width: 600, padding: 2 }}>
          <Typography variant="h6" gutterBottom style={{ background: "#E7EDF0", width: "100%" }}>
            All Conversation
          </Typography>
          <Divider />
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-auto">
                <strong>Initiative Code:</strong> <span className="text-danger">{id}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Divider />
              </div>
            </div>
          </div>

          {comments &&
            comments.map((comment, index) => (
              <div key={index} className={`commentbox commentbox${index + 1}`}>
                <div className="col-md-12 d-flex mb-3">
                  <div className="usrimg">
                    <span className="usernameshort circle-bgpink pull-left name_initials1">
                      {comment.authorInitials}
                    </span>
                  </div>
                  <div className="card-body py-2 px-3 mb-2">
                    <h5 className="card-title coment_header d-inline-block fullname1">
                      {comment.authorName}
                    </h5>
                    <span className="text-muted commentdate">{comment.date}</span>
                    <p className="card-text text-muted coment_content mb-0">{comment.content}</p>
                    <div className="comment_Actions mt-2">
                      <span className="small text-muted">
                        <DefaultButton
                          styles={buttonStyles}
                          className="action_reply nostylebtn"
                          onClick={() => {}}
                        >
                          Reply <i className="fas fa-reply"></i>
                        </DefaultButton>
                      </span>
                      <span className="small text-muted ms-3">
                        <DefaultButton
                          styles={buttonStyles}
                          className="action showviewall nostylebtn"
                          onClick={() => toggleReplies(index)}
                        >
                          {comment.replies.length} replies
                        </DefaultButton>
                      </span>
                    </div>
                    {/* Nested replies */}
                    {expandedCommentIndex === index &&
                      comment.replies.map((reply, replyIndex) => (
                        <div key={replyIndex} className="nested-reply">
                          <div className="col-md-12 d-flex mb-3">
                            <div className="usrimg">
                              <span className="inner_username circle-bgblue pull-left name_initials2">
                                {reply.authorInitials}
                              </span>
                            </div>
                            <div className="card-body py-2 px-3 mb-2">
                              <h5 className="card-title coment_header d-inline-block fullname2">
                                {reply.authorName}
                              </h5>
                              <span className="text-muted commentdate">{reply.date}</span>
                              <p className="card-text text-muted coment_content mb-0">
                                {reply.content}
                              </p>
                              {/* Actions for nested replies */}
                              <div className="comment_Actions mt-2">
                                <span className="small text-muted">
                                  <DefaultButton
                                    styles={buttonStyles}
                                    className="action_reply nostylebtn"
                                    onClick={() => {}}
                                  >
                                    Reply <i className="fas fa-reply"></i>
                                  </DefaultButton>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          <form>
            <div className="card-footer" id="comment_page">
              <div className="row">
                <div className="col-md-12 col-12 d-flex mb-3">
                  <div className="usrimg">
                    <span className="usernameshort circle-bgorange pull-left name_initials">
                      UN
                    </span>
                  </div>
                  <div className="d-flex flex-column commentbox flex-grow-1">
                    <textarea
                      className="form-control border-0 textareaautosize"
                      name="commentContent"
                      id="commentContent"
                      rows="3"
                      placeholder="Add a comment"
                      onKeyDown={handleKeyDown}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Drawer>

      {/* Drawer for Flag Tracking Details */}
      <Drawer anchor="right" open={flagDrawerOpen} onClose={closeFlagDrawer}>
        <Box sx={{ width: 600, padding: 2 }}>
          <div id="init_flag_Sec" className="container bg-light">
            <div className="row">
              <div
                style={{
                  background: "#E7EDF0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <h5 className="offcanvasTitle" style={{ margin: 0 }}>
                  Flag Tracking Details
                </h5>
                <div className="col-2 text-end">
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 mb-2 init_history">
            <div className="row">
              <div className="col-7"></div>
              <div className="col-5 d-flex justify-content-end gap-3">
                <button type="button" className="btn borderbtnbgblue">
                  Save
                </button>
              </div>
            </div>
          </div>

          <p>
            <strong>Maha Metro Pune</strong>
          </p>
          <div className="init_borderedbox p-3 mb-5">
            Flagging marks an item to remind you that it needs to be followed up. After it has been
            followed up, you can mark it complete
          </div>

          <div className="row mb-3">
            <div className="col-4">
              <label htmlFor="Selflagto" className="form-label">
                Flag To
              </label>
              <select id="Selflagto" className="form-select">
                <option>Follow Up</option>
                <option>Review</option>
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="date_IntKBFromDate" className="form-label">
                Due by
              </label>
              <div className="input-group date" id="datepicker">
                <input
                  type="text"
                  className="form-control"
                  id="date_IntKBFromDate"
                  placeholder="Select Date"
                />
                <span className="input-group-text bg-light">
                  <i className="bi bi-calendar"></i>
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flagcheckcomplete"
                />
                <label className="form-check-label" htmlFor="flagcheckcomplete">
                  Complete
                </label>
              </div>
            </div>
          </div>
        </Box>
      </Drawer>
      <Drawer anchor="right" open={historyDrawerOpen} onClose={closeHistory}>
        <Box sx={{ width: 600, p: 2 }}>
          <Typography variant="h6" gutterBottom style={{ background: "#E7EDF0", width: "100%" }}>
            Initiative History
          </Typography>
          <Divider />
          <Box className="inithistDetails graybg">
            <div className="row mt-2 mb-2 ">
              <div className="col-sm-8">
                <div className="row">
                  <div className="col-sm-8">
                    <label htmlFor="inputPassword6" className="col-form-label text-end">
                      Action Taken
                    </label>
                  </div>
                  <div className="col-sm-7">
                    <div className="dropdown bootstrap-select">
                      <select
                        className="selectpicker"
                        data-live-search="true"
                        id="ActionType"
                        // onChange={() => changActionType()}
                      >
                        <option>Approved</option>
                        <option>Rejected</option>
                        <option>Submitted</option>
                        <option>System</option>
                      </select>

                      <div className="dropdown-menu">
                        <div className="bs-searchbox">
                          <input
                            type="search"
                            className="form-control"
                            autoComplete="off"
                            role="combobox"
                            aria-label="Search"
                            aria-controls="bs-select-10"
                            aria-autocomplete="list"
                          />
                        </div>
                        <div className="inner show" role="listbox" id="bs-select-10" tabIndex="-1">
                          <ul className="dropdown-menu inner show" role="presentation"></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-7"></div>
            </div>
            <div className="historyHeight" style={{ height: "290px", overflowY: "auto" }}>
              <div className="table-responsive offTable_wrapper">
                <table className="table table-striped table-hover mb-0" id="inithistoryTbl">
                  <thead>
                    <tr>
                      <th>Event Time</th>
                      <th>Action Taken</th>
                      <th>From Stage</th>
                      <th>To Stage</th>
                      <th>Approver</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>08/06/2022 1:03:53 PM</td>
                      <td>Approved</td>
                      <td>Deployment</td>
                      <td>Completed</td>
                      <td>Admin</td>
                      <td>Approved</td>
                    </tr>
                    <tr>
                      <td>08/06/2022 12:38:53 PM</td>
                      <td>Approved</td>
                      <td>CFO Approval</td>
                      <td>Deployment</td>
                      <td>Admin</td>
                      <td>Approved</td>
                    </tr>
                    <tr>
                      <td>21/04/2022 12:01:37 PM</td>
                      <td>Approved</td>
                      <td>CEO Approval</td>
                      <td>CFO Approval</td>
                      <td>Admin</td>
                      <td>Approved</td>
                    </tr>
                    <tr>
                      <td>08/06/2022 1:03:53 PM</td>
                      <td>Approved</td>
                      <td>Deployment</td>
                      <td>Completed</td>
                      <td>Admin</td>
                      <td>Ok</td>
                    </tr>
                    <tr style={{ display: "none" }}>
                      <td>08/06/2022 1:03:53 PM</td>
                      <td>Approved</td>
                      <td>CEO Approval</td>
                      <td>Deployment</td>
                      <td>Admin</td>
                      <td>Ok</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Box>
        </Box>
      </Drawer>
    </tr>
  );
};

export default InitiativeItem;
