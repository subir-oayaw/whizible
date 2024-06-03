import React, { useState } from "react";
import { Typography, IconButton, Tooltip, Drawer, Box, Divider, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomProgressBar from "./CustomProgressBar";
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

  // State for managing drawer and editing
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(-1);
  const [comments, setComments] = useState(initialComments || []); // Initialize comments with initialComments from props

  // Function to open comment drawer
  const openCommentDrawer = () => {
    setCommentDrawerOpen(true);
  };

  // Function to close comment drawer
  const closeCommentDrawer = () => {
    setCommentDrawerOpen(false);
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
                    <AccessTimeIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="icon-button-container">
                <Tooltip title="Flag">
                  <IconButton>
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
                    <span className="usernameshort circle-bggreen">AA</span>
                  </div>
                  <div className="form-group py-2 px-sm-3 mb-2">
                    <textarea
                      name="commentContent"
                      placeholder="Please Enter your Comment Here"
                      id="enter_comment_sec"
                      className="form-control"
                      onKeyDown={handleKeyDown}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Drawer>

      {/* Blank Page for Editing */}
      {isEditing && (
        <div className="edit-page">
          <Typography variant="h6">Edit Initiative</Typography>
          <Box sx={{ padding: 2 }}>
            {/* Your editing form can go here */}
            <TextField label="Title" fullWidth />
            <TextField label="Type" fullWidth />
            {/* Add other fields as needed */}
            <PrimaryButton onClick={() => {}} styles={{ root: { marginTop: 10 } }}>
              Save
            </PrimaryButton>
          </Box>
        </div>
      )}
    </tr>
  );
};

export default InitiativeItem;
