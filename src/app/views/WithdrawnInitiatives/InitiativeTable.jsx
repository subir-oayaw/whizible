import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import CommentIcon from "@mui/icons-material/Comment";
import { Shimmer, ShimmerElementType } from "@fluentui/react/lib/Shimmer";
import { useNavigate } from "react-router-dom";
import CommentsSection from "../InitiativeManagement/CommentsSection";

const InitiativeTable = ({ data, loading, error }) => {
  const [tdata, setTdata] = useState([]);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTdata(data);
  }, [data]);

  const handleEditClick = (initiativeID) => {
    navigate(`/edit/${initiativeID}`);
  };

  const handleCommentClick = (initiative) => {
    setSelectedInitiative(initiative);
    setCommentDrawerOpen(true);
  };

  const renderLoadingSkeleton = () => {
    return Array.from(new Array(10)).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 20 }]} />
        </TableCell>
        <TableCell>
          <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 20 }]} />
        </TableCell>
        <TableCell>
          <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 20 }]} />
        </TableCell>
        <TableCell>
          <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 20 }]} />
        </TableCell>
        <TableCell>
          <Shimmer shimmerElements={[{ type: ShimmerElementType.line, height: 20 }]} />
        </TableCell>
        <TableCell>
          <Shimmer
            shimmerElements={[
              { type: ShimmerElementType.circle, height: 20, width: 20 },
              { type: ShimmerElementType.circle, height: 20, width: 20 },
              { type: ShimmerElementType.circle, height: 20, width: 20 }
            ]}
          />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      {commentDrawerOpen && selectedInitiative && (
        <CommentsSection
          initiativeId={selectedInitiative.title}
          commentDrawerOpen={commentDrawerOpen}
          setCommentDrawerOpen={setCommentDrawerOpen}
        />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#ccc" }}>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Initiative Title</TableCell>
              <TableCell style={{ textAlign: "center" }}>Nature of Initiative</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Business Group/Organization Unit
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>Created On</TableCell>
              <TableCell style={{ textAlign: "center" }}>Vendor</TableCell>
              <TableCell style={{ textAlign: "center" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? renderLoadingSkeleton()
              : tdata?.map((initiative, index) => (
                  <TableRow
                    key={initiative.title}
                    style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}
                  >
                    <TableCell style={{ textAlign: "center" }}>
                      <div>{initiative.title}</div>
                      <div style={{ color: "rgb(43, 85, 206)" }}>{initiative.demandCode}</div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <div>{initiative.natureofDemand}</div>
                      <div style={{ color: "rgb(43, 85, 206)" }}>{initiative.natureofDemandID}</div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <div>{initiative.businessGroup}</div>
                      <div style={{ color: "rgb(43, 85, 206)" }}>{initiative.organizationUnit}</div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {initiative.requestStageID}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>{initiative.nameOfFirm}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditClick(initiative.title)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="History">
                        <IconButton aria-label="history">
                          <HistoryIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Comment">
                        <IconButton
                          aria-label="comment"
                          onClick={() => handleCommentClick(initiative)}
                        >
                          <CommentIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InitiativeTable;
