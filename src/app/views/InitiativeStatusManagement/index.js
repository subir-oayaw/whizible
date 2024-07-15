import React, { useState } from "react";
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  Dropdown,
  IconButton,
  Checkbox
} from "@fluentui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import SearchIcon from "@mui/icons-material/Search";

const classNames = mergeStyleSets({
  formControl: {
    margin: "8px",
    minWidth: "120px"
  },
  table: {
    minWidth: 650
  }
});

const InitiativeStatusManagement = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

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

  const rows = [
    {
      id: 1,
      code: "20090168",
      title: "1M bonus amount to be displayed",
      startDate: "23/09/2020",
      endDate: "30/09/2020",
      comment: "Some comment"
    },
    {
      id: 2,
      code: "20210512",
      title: "Product Insta PIWC Verification",
      startDate: "28/09/2021",
      endDate: "28/10/2021",
      comment: "Some comment"
    }
  ];

  return (
    <div className="initiative-status-management container">
      <div className="header my-4">
        <h1>Initiative Status Management</h1>
      </div>
      <div className="row mb-3 align-items-center justify-content-end">
        <div className="col-auto d-flex align-items-center">
          <span className="text-danger mr-2">* Mandatory</span>
          <IconButton onClick={toggleAdvancedSearch}>
            <SearchIcon />
          </IconButton>
          <PrimaryButton text="Save" className="ml-2" />
        </div>
      </div>
      {showAdvancedSearch && (
        <div className="advanced-search mb-4">
          <div className="actions row mb-3">
            <div className="col-md-4">
              <Dropdown
                placeholder="Select Nature of Initiative"
                options={initiativeOptions}
                className={classNames.formControl}
              />
            </div>
            <div className="col-md-4">
              <Dropdown
                placeholder="Select Business Group"
                options={businessGroupOptions}
                className={classNames.formControl}
              />
            </div>
            <div className="col-md-4">
              <Dropdown
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
      <div className="table">
        <TableContainer component={Paper}>
          <Table className={classNames.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Initiative Code</TableCell>
                <TableCell>Initiative Title</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                    checked={rows.length > 0 && selectedRows.length === rows.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} selected={selectedRows.includes(row.id)}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>{row.comment}</TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default InitiativeStatusManagement;
