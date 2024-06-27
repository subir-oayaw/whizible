// CommentsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Drawer,
  Divider,
  Button,
  IconButton,
  Tooltip,
  Avatar
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

import "../InitiativeItem.css";
const Discussion = ({ initiativeId }) => {
  const [comments, setComments] = useState(null); // Initialize comments with null
  const [expandedCommentIndex, setExpandedCommentIndex] = useState(-1);
  const replyTextareaRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, [initiativeId]); // Fetch comments when commentDrawerOpen changes

  // Function to fetch comments from API
  const fetchComments = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASEURL_ACCESS_CONTROL +
          `/api/Discussion?InitiativeId=${initiativeId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data.data.discussion); // Update comments state with fetched data
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Handle error, e.g., show error message to user
    }
  };

  // Function to open comment drawer

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
    if (!comments) {
      setComments([newComment]); // Initialize comments if not already initialized
    } else {
      setComments([...comments, newComment]); // Add new comment to existing comments
    }
  };

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    return `${parts[0].charAt(0).toUpperCase()}${parts[parts.length - 1].charAt(0).toUpperCase()}`;
  };
  console.log("initiativeId", initiativeId);
  // Function to format date as dd/mm/yy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height
        width: "100%", // Full width
        overflowY: "auto", // Scrollable content
        backgroundColor: "#E7EDF0", // Background color
        padding: 2 // Padding inside the Box
      }}
    >
      <Typography variant="h6" gutterBottom style={{ background: "#E7EDF0", width: "100%" }}>
        All Conversation
      </Typography>
      <Divider />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-auto">
            <strong>Initiative Code:</strong> <span className="text-danger">{initiativeId}</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Divider />
          </div>
        </div>
      </div>

      {comments && (
        <>
          {comments.map((commentItem, index) => (
            <div key={index} className={`commentbox commentbox${index + 1}`}>
              <div className="col-md-12 d-flex mb-3">
                <div className="usrimg">
                  <Avatar className="circle-bgpink pull-left name_initials1">
                    {getInitials(commentItem.userName)}
                  </Avatar>
                </div>
                <div className="card-body py-2 px-3 mb-2">
                  <h5 className="card-title coment_header d-inline-block fullname1">
                    <strong>{commentItem.userName}</strong>
                  </h5>
                  <span className="text-muted commentdate">
                    {formatDate(new Date(commentItem.discussionDate))}
                  </span>
                  <p className="card-text text-muted coment_content mb-0">{commentItem.comments}</p>
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
                            <Avatar className="circle-bgblue pull-left name_initials2">
                              {getInitials(reply.userName)}
                            </Avatar>
                          </div>
                          <div className="card-body py-2 px-3 mb-2">
                            <h5 className="card-title coment_header d-inline-block fullname1">
                              <strong>{reply.userName}</strong>
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
              <Avatar className="circle-bgorange pull-left name_initials">UN</Avatar>
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
              <Button type="submit" className="ms-auto mt-2" variant="contained">
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default Discussion;
