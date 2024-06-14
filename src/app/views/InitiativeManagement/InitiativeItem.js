import React, { useState, useEffect, useRef } from "react";
import { Typography, IconButton, Tooltip, Drawer, Box, Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button"; // Import Button from Material-UI
import "./InitiativeItem.css";
import { Icon } from "@fluentui/react/lib/Icon";
import { PrimaryButton } from "@fluentui/react/lib/Button"; // Import Fluent UI Button
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const InitiativeItem = ({
  initiative,
  stagesLegend,
  setIsEditing,
  isEditing,
  startEditing,
  stopEditing
}) => {
  const {
    title,
    instanceId,
    userId,
    originator,
    processName,
    stageName,
    createdOn,
    actionType,
    initiativeCode,
    stageOrder,
    maxStage,
    comments
  } = initiative;

  // State for managing drawers and editing
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [flagDrawerOpen, setFlagDrawerOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(-1);
  const [comment, setComment] = useState(null); // Initialize comments with null

  // Ref for the reply textarea
  const replyTextareaRef = useRef(null);

  useEffect(() => {
    if (commentDrawerOpen) {
      fetchComments();
    }
  }, [commentDrawerOpen]); // Fetch comments when commentDrawerOpen changes

  // Function to fetch comments from API
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://122.166.47.37:1001/api/Discussion?InitiativeId=2`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComment(data.data.discussion); // Update comments state with fetched data
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Handle error, e.g., show error message to user
    }
  };

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
  const closeFlagDrawer = () => {
    setFlagDrawerOpen(false);
  };

  // Function to toggle expanded replies for a comment
  const toggleReplies = (index) => {
    setExpandedCommentIndex(index === expandedCommentIndex ? -1 : index);
    // Focus on the reply textarea
    replyTextareaRef.current.focus();
  };

  // Handle form submission for adding a comment on Submit button click
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newComment = {
      // Get initials from authorName
      userName: formData.get("authorName"),
      date: formatDate(new Date()), // Use current date/time in "dd/mm/yy" format
      comments: formData.get("commentContent"),
      replies: [] // Initialize with empty replies
    };
    addComment(newComment);
    event.target.reset(); // Clear the form after submission
  };

  // Function to add a new comment to the state
  const addComment = (newComment) => {
    if (!comment) {
      setComment([newComment]); // Initialize comments if not already initialized
    } else {
      setComment([...comment, newComment]); // Add new comment to existing comments
    }
  };

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    return `${parts[0].charAt(0).toUpperCase()}${parts[parts.length - 1].charAt(0).toUpperCase()}`;
  };

  // Function to format date as dd/mm/yy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <tr>
      <td>
        <div className="initiative-title">
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {originator}
          </Typography>
        </div>
      </td>
      <td style={{ textAlign: "start" }}>
        <Typography variant="body2">{processName}</Typography>
        <Typography variant="body2" color="textSecondary">
          {createdOn}
        </Typography>
      </td>
      <td>
        <div className="left-side">
          <Typography variant="body2" className="due-in" color="textSecondary">
            {createdOn} Days
          </Typography>
        </div>

        {/* <CustomProgressBar
          stagesCompleted={stageOrder}
          totalStages={maxStage}
          stages={stages}
          initiative={initiative}
          stagesLegend={stagesLegend}
        /> */}
        <Typography variant="body2" color="textSecondary">
          {stageOrder} stages completed
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
                <strong>Initiative Code:</strong> <span className="text-danger">{instanceId}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Divider />
              </div>
            </div>
          </div>

          {comment && (
            <>
              {comment.map((commentItem, index) => (
                <div key={index} className={`commentbox commentbox${index + 1}`}>
                  <div className="col-md-12 d-flex mb-3">
                    <div className="usrimg">
                      <span className="usernameshort circle-bgpink pull-left name_initials1">
                        {getInitials(commentItem.userName)}
                      </span>
                    </div>
                    <div className="card-body py-2 px-3 mb-2">
                      <h5 className="card-title coment_header d-inline-block fullname1">
                        <strong>{commentItem.userName}</strong>
                      </h5>
                      <span className="text-muted commentdate">
                        {formatDate(new Date(commentItem.discussionDate))}
                      </span>
                      <p className="card-text text-muted coment_content mb-0">
                        {commentItem.comments}
                      </p>
                      <div className="comment_Actions mt-2">
                        <span className="small text-muted">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              replyTextareaRef.current.focus();
                            }}
                            className="action_reply nostylebtn"
                          >
                            Reply <i className="fas fa-reply"></i>
                          </Button>
                        </span>
                        <span className="small text-muted ms-3">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => toggleReplies(index)}
                            className="action showviewall nostylebtn"
                          >
                            {commentItem.replies.length} replies
                          </Button>
                        </span>
                      </div>
                      {/* Nested replies */}
                      {expandedCommentIndex === index &&
                        commentItem.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className="nested-reply">
                            <div className="col-md-12 d-flex mb-3">
                              <div className="usrimg">
                                <span className="inner_username circle-bgblue pull-left name_initials2">
                                  {getInitials(reply.userName)}
                                </span>
                              </div>
                              <div className="card-body py-2 px-3 mb-2">
                                <h5 className="card-title coment_header d-inline-block fullname1">
                                  <strong>{commentItem.userName}</strong>
                                </h5>
                                <span className="text-muted commentdate">
                                  {formatDate(new Date(reply.discussionDate))}
                                </span>
                                <p className="card-text text-muted coment_content mb-0">
                                  {reply.comments}
                                </p>
                                {/* Actions for nested replies */}
                                <div className="comment_Actions mt-2">
                                  <span className="small text-muted">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => {
                                        replyTextareaRef.current.focus();
                                      }}
                                      className="action_reply nostylebtn"
                                    >
                                      Reply <i className="fas fa-reply"></i>
                                    </Button>
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
            </>
          )}

          <Divider />

          <form onSubmit={handleSubmit}>
            <div className="row mt-3">
              <div className="col-md-12 col-12 d-flex mb-3">
                <div className="usrimg">
                  <span className="usernameshort circle-bgorange pull-left name_initials">UN</span>
                </div>
                <div className="d-flex flex-column commentbox flex-grow-1">
                  <textarea
                    ref={replyTextareaRef} // Ref for reply textarea
                    className="form-control border-0 textareaautosize"
                    name="commentContent"
                    id="commentContent"
                    rows="3"
                    placeholder="Add a comment"
                  ></textarea>
                  <PrimaryButton type="submit" className="ms-auto mt-2">
                    Add Comment
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Drawer>
    </tr>
  );
};

export default InitiativeItem;
