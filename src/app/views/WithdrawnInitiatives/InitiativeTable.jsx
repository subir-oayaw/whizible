import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn
} from "@fluentui/react/lib/DetailsList";
import {
  IconButton,
  Tooltip,
  Paper,
  TablePagination,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import CommentIcon from "@mui/icons-material/Comment";
import { Shimmer, ShimmerElementType } from "@fluentui/react/lib/Shimmer";
import { useNavigate } from "react-router-dom";
import CommentsSection from "../InitiativeManagement/CommentsSection";

const InitiativeTable = ({ data = [], loading, error }) => {
  const [tdata, setTdata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState({});
  const [baseColumns, setBaseColumns] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setTdata(data || []);
  }, [data]);
  const fieldLabelMap = {
    natureofDemand: "Nature of Demand",
    groupName: "Group Name",
    businessGroup: "Business Group",
    requestStageID: "Request Stage"
    // Add more field mappings as needed
  };
  useEffect(() => {
    if (tdata.length > 0) {
      const initialFields = Object.keys(tdata[0]);

      // Define the fieldLabelMap here

      const columns = initialFields.map((field) => ({
        key: field,
        name:
          fieldLabelMap[field] ||
          field
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before capital letters
            .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
      }));

      columns.push({
        key: "actions",
        name: "Actions"
      });

      setBaseColumns(columns);

      const fieldsState = columns.reduce((acc, column) => {
        acc[column.key] =
          column.key === "title" ||
          column.key === "natureofDemand" ||
          column.key === "businessGroup" ||
          column.key === "requestStageID" ||
          column.key === "nameOfFirm" ||
          column.key === "actions";
        return acc;
      }, {});
      setSelectedFields(fieldsState);
    }
  }, [tdata]);

  const buildColumns = () => {
    return baseColumns
      .filter((field) => selectedFields[field.key] || field.key === "actions") // Always include 'actions'
      .map((field) => ({
        key: field.key,
        name: field.name,
        isResizable: true,
        fieldName: field.key,
        isMultiline: true,
        onRender: (item) => {
          if (field.key === "actions") {
            return (
              <div style={{ textAlign: "center" }}>
                <Tooltip title="Edit">
                  <IconButton
                    aria-label="edit"
                    sx={{ fontSize: "small", padding: "8px" }}
                    onClick={() => handleEditClick(item.ideaID)}
                  >
                    <EditIcon sx={{ fontSize: "inherit" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="History">
                  <IconButton aria-label="history" sx={{ fontSize: "small", padding: "8px" }}>
                    <HistoryIcon sx={{ fontSize: "inherit" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Comment">
                  <IconButton
                    aria-label="comment"
                    sx={{ fontSize: "small", padding: "8px" }}
                    onClick={() => handleCommentClick(item)}
                  >
                    <CommentIcon sx={{ fontSize: "inherit" }} />
                  </IconButton>
                </Tooltip>
              </div>
            );
          }
          return <div>{item[field.key]}</div>;
        }
      }));
  };

  const handleEditClick = (initiativeID) => {
    navigate(`/edit/${initiativeID}`);
  };

  const handleCommentClick = (initiative) => {
    setSelectedInitiative(initiative);
    setCommentDrawerOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFieldChange = (fieldKey) => {
    setSelectedFields((prev) => ({
      ...prev,
      [fieldKey]: !prev[fieldKey]
    }));
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const renderShimmer = () => {
    const shimmerElements = [
      { type: ShimmerElementType.line, height: 20, width: "20%" },
      { type: ShimmerElementType.gap, width: "2%" },
      { type: ShimmerElementType.line, height: 20, width: "20%" },
      { type: ShimmerElementType.gap, width: "2%" },
      { type: ShimmerElementType.line, height: 20, width: "20%" },
      { type: ShimmerElementType.gap, width: "2%" },
      { type: ShimmerElementType.line, height: 20, width: "20%" },
      { type: ShimmerElementType.gap, width: "2%" },
      { type: ShimmerElementType.line, height: 20, width: "20%" }
    ];

    return <Shimmer shimmerElements={shimmerElements} />;
  };

  const allFields = baseColumns.map((col) => col.key);

  return (
    <>
      {commentDrawerOpen && selectedInitiative && (
        <CommentsSection
          initiativeId={selectedInitiative.title}
          commentDrawerOpen={commentDrawerOpen}
          setCommentDrawerOpen={setCommentDrawerOpen}
        />
      )}
      <Box component={Paper} sx={{ width: "100%", overflow: "hidden", marginLeft: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleOpenDialog}
          >
            Fields to Display
          </Button>
        </Box>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle sx={{ backgroundColor: "#f0f0f0" }}>Select Fields to Display</DialogTitle>
          <DialogContent>
            {allFields.map((field) => (
              <FormControlLabel
                key={field}
                control={
                  <Checkbox
                    checked={selectedFields[field] !== undefined ? selectedFields[field] : false}
                    onChange={() => handleFieldChange(field)}
                    disabled={field === "actions"} // Disable toggle for 'actions'
                  />
                }
                label={
                  fieldLabelMap[field] ||
                  field
                    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before capital letters
                    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
                }
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
        {loading ? (
          <div>
            {Array.from(new Array(10)).map((_, index) => (
              <div key={index} style={{ padding: "10px 0" }}>
                {renderShimmer()}
              </div>
            ))}
          </div>
        ) : (
          <DetailsList
            items={
              tdata.length ? tdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : []
            }
            columns={buildColumns()} // Ensure this reflects changes
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2
          }}
        >
          <TablePagination
            component="div"
            count={tdata.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]} // Hide the rows per page dropdown
          />
        </Box>
      </Box>
    </>
  );
};

export default InitiativeTable;
