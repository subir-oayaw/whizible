import React, { useState } from "react";
import { Typography, IconButton, Tooltip, Drawer, Box, Divider, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomProgressBar from "./CustomProgressBar";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import "./InitiativeItem.css";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";

const InitiativeItem = ({ initiative, stagesLegend }) => {
  const { title, id, type, date, stagesCompleted, totalStages, dueIn, stages, comments } =
    initiative;

  // State for managing drawer and editing
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(-1);

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

  // Function to toggle expanded replies for a comment
  const toggleReplies = (index) => {
    setExpandedCommentIndex(index === expandedCommentIndex ? -1 : index);
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
              <Tooltip title="Edit">
                <IconButton onClick={startEditing}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {/* Comment Icon */}
              <Tooltip title="Comment">
                <IconButton onClick={openCommentDrawer}>
                  <CommentIcon />
                </IconButton>
              </Tooltip>
              {/* Delay Icon (already existing) */}
              <Tooltip title="Delay">
                <IconButton>
                  <AccessTimeIcon />
                </IconButton>
              </Tooltip>
              {/* Flag Icon (already existing) */}
              <Tooltip title="Flag">
                <IconButton>
                  <FlagIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </td>

      {/* Drawer for Comments */}
      <Drawer anchor="right" open={commentDrawerOpen} onClose={closeCommentDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <Divider />
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
