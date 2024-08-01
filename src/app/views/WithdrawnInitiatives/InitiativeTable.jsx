import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn
} from "@fluentui/react/lib/DetailsList";
import { TextField, PrimaryButton, DefaultButton, Dropdown, Checkbox } from "@fluentui/react";
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
  FormControlLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import CommentIcon from "@mui/icons-material/Comment";
import { Shimmer, ShimmerElementType } from "@fluentui/react/lib/Shimmer";
import { useNavigate } from "react-router-dom";
import CommentsSection from "../InitiativeManagement/CommentsSection";
import SearchIcon from "@mui/icons-material/Search";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

const initiativeOptions = [
  { key: "", text: "Select Nature of Initiative" },
  { key: "1", text: "Initiative 1" },
  { key: "2", text: "Test Initiative" },
  { key: "3", text: "Initiative 2" },
  { key: "4", text: "Initiative Risk Management" },
  { key: "5", text: "Management" },
  { key: "6", text: "Tool Management" },
  { key: "7", text: "Whiz Implementation" },
  { key: "8", text: "Tool Management" }
];
const businessGroupOptions = [
  { key: "", text: "Select Business Group" },
  { key: "1", text: "Construction" },
  { key: "2", text: "Construction2" },
  { key: "3", text: "India International" },
  { key: "4", text: "India International2" },
  { key: "5", text: "Metro" },
  { key: "6", text: "Small Metro" }
];

const organizationUnitOptions = [
  { key: "", text: "Select Organization Unit" },
  { key: "1", text: "Pune" },
  { key: "2", text: "Mumbai" },
  { key: "3", text: "Kerala" },
  { key: "4", text: "USA" },
  { key: "5", text: "Nashik" }
];
const classNames = mergeStyleSets({
  formControl: {
    margin: "8px",
    minWidth: "120px"
  },
  table: {
    minWidth: 650
  },
  underline: {
    textDecoration: "underline",
    cursor: "pointer"
  }
});
const InitiativeTable = ({ data = [], loading, error }) => {
  const [tdata, setTdata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState({});
  const [baseColumns, setBaseColumns] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [underlinedTitle, setUnderlinedTitle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

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
          if (field.key === "title") {
            return (
              <div
                className={item[field.key] === underlinedTitle ? classNames.underline : ""}
                onClick={() => {
                  setUnderlinedTitle(item[field.key]);
                  handleEditClick(item.ideaID);
                }}
              >
                {item[field.key]}
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = tdata.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {showAdvancedSearch && (
        <div className="advanced-search mb-4">
          <div className="actions row mb-3">
            <div className="col-md-4">
              <Dropdown
                label="Select Nature of Initiative"
                placeholder="Select Nature of Initiative"
                options={initiativeOptions}
                className={classNames.formControl}
              />
            </div>
            <div className="col-md-4">
              <Dropdown
                label="Select Business Group"
                placeholder="Select Business Group"
                options={businessGroupOptions}
                className={classNames.formControl}
              />
            </div>
            <div className="col-md-4">
              <Dropdown
                label="Select Organization Unit"
                placeholder="Select Organization Unit"
                options={organizationUnitOptions}
                className={classNames.formControl}
              />
            </div>
          </div>
          <div className="inputs row mb-3">
            <div className="col-md-6">
              <TextField
                label="Initiative Code"
                placeholder="Add Initiative Code"
                className={classNames.formControl}
              />
            </div>
            <div className="col-md-6">
              <TextField
                label="Initiative Title"
                placeholder="Add Initiative Title"
                className={classNames.formControl}
              />
            </div>
          </div>
          <div className="buttons mb-4">
            <DefaultButton text="Clear Search" />
            <DefaultButton text="Save and Search" className="ml-2" />
            <DefaultButton text="Close" className="ml-2" />
            <PrimaryButton text="Search" className="ml-2" />
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search initiatives"
          style={{ width: "300px" }}
        />
        <div style={{ display: "flex" }}>
          <IconButton onClick={toggleAdvancedSearch}>
            <SearchIcon />
          </IconButton>
          <DefaultButton text="Fields to Display" onClick={handleOpenDialog} />
        </div>
      </div>

      {loading ? (
        renderShimmer()
      ) : (
        <Paper>
          <DetailsList
            items={filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            columns={buildColumns()}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Fields to Display</DialogTitle>
        <DialogContent>
          {allFields.map((fieldKey) => (
            <FormControlLabel
              key={fieldKey}
              control={
                <Checkbox
                  checked={selectedFields[fieldKey] || false}
                  onChange={() => handleFieldChange(fieldKey)}
                />
              }
              label={baseColumns.find((col) => col.key === fieldKey)?.name || fieldKey}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {commentDrawerOpen && (
        <CommentsSection
          initiative={selectedInitiative}
          open={commentDrawerOpen}
          onClose={() => setCommentDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default InitiativeTable;
