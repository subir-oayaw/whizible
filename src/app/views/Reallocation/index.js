import React, { useState } from "react";
import {
  Stack,
  TooltipHost,
  TextField as FluentTextField,
  Dropdown,
  Checkbox
} from "@fluentui/react";
import {
  Typography,
  Button,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Reallocation = () => {
  const [currentApprover, setCurrentApprover] = useState("");
  const [natureOfInitiative, setNatureOfInitiative] = useState("");
  const [businessGroup, setBusinessGroup] = useState("");
  const [stageOfApproval, setStageOfApproval] = useState("");
  const [initiativeTitle, setInitiativeTitle] = useState("");
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const rows = [
    { id: 1, status: "Pending", orderNo: 4, stage: "Deployment", approvers: ["James"] },
    { id: 2, status: "Delayed", orderNo: 5, stage: "Deployment", approvers: ["Kavya"] },
    { id: 3, status: "Cleared", orderNo: 6, stage: "Completed", approvers: ["Mac"] }
  ]; // Sample rows data

  const approvers = ["James", "Kavya", "Mac", "Nirbhay", "Robin"];
  const initiatives = ["Initiative 1", "Initiative 2", "Initiative 3"];
  const businessGroups = ["Construction", "India International"];
  const stages = ["CEO Approval", "CFO Approval", "Completed", "Delivery Manager"];

  const handleSelectChange = (event, name) => {
    const { value } = event.target;
    switch (name) {
      case "currentApprover":
        setCurrentApprover(value);
        break;
      case "natureOfInitiative":
        setNatureOfInitiative(value);
        break;
      case "businessGroup":
        setBusinessGroup(value);
        break;
      case "stageOfApproval":
        setStageOfApproval(value);
        break;
      case "initiativeTitle":
        setInitiativeTitle(value);
        break;
      default:
        break;
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  return (
    <div className="container-fluid">
      <Stack gap="m">
        <Stack horizontal gap="m">
          <TooltipHost content="Pending stage">
            <div className="stage-box pendingStage"></div>
          </TooltipHost>
          <TooltipHost content="Delayed stage">
            <div className="stage-box delayedStage"></div>
          </TooltipHost>
          <TooltipHost content="Cleared stage">
            <div className="stage-box clearedStage"></div>
          </TooltipHost>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: "m" }}>
          <div className="col-md-4">
            <FormControl fullWidth className="input-field">
              <Dropdown
                label="Select Current Approver"
                placeholder="Select Current Approver"
                selectedKey={currentApprover}
                options={approvers.map((approver) => ({
                  key: approver,
                  text: approver
                }))}
                onChange={(event, option) => handleSelectChange(event, "currentApprover")}
              />
            </FormControl>
          </div>
          <div className="col-md-4">
            <FormControl fullWidth className="input-field">
              <Dropdown
                label="Nature of Initiative"
                placeholder="Nature of Initiative"
                selectedKey={natureOfInitiative}
                options={initiatives.map((initiative) => ({
                  key: initiative,
                  text: initiative
                }))}
                onChange={(event, option) => handleSelectChange(event, "natureOfInitiative")}
              />
            </FormControl>
          </div>
          <div className="col-md-4">
            <FormControl fullWidth className="input-field">
              <Dropdown
                label="Business Group"
                placeholder="Business Group"
                selectedKey={businessGroup}
                options={businessGroups.map((group) => ({
                  key: group,
                  text: group
                }))}
                onChange={(event, option) => handleSelectChange(event, "businessGroup")}
              />
            </FormControl>
          </div>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: "m" }}>
          <div className="col-md-4">
            <FormControl fullWidth className="input-field">
              <Dropdown
                label="Stage of Approval"
                placeholder="Stage of Approval"
                selectedKey={stageOfApproval}
                options={stages.map((stage) => ({
                  key: stage,
                  text: stage
                }))}
                onChange={(event, option) => handleSelectChange(event, "stageOfApproval")}
              />
            </FormControl>
          </div>
          <div className="col-md-4">
            <FluentTextField
              label="Initiative Title"
              className="input-field"
              value={initiativeTitle}
              onChange={(event) => handleSelectChange(event, "initiativeTitle")}
            />
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-end">
            <Button variant="contained" color="primary" onClick={() => console.log("Next clicked")}>
              Next
            </Button>
          </div>
        </Stack>
      </Stack>

      <div className="mt-4 text-end" style={{ backgroundColor: "lightgrey" }}>
        <Typography variant="h5" gutterBottom>
          Selected Approver: Nikhil Adtakar
        </Typography>
      </div>
      <div className=" text-end ">
        <Button variant="contained" color="primary" onClick={() => console.log("Save clicked")}>
          Save
        </Button>
      </div>

      <div className="mt-4">
        <div className="row">
          <div className="col-6">
            <Typography variant="h5" gutterBottom>
              Legends
            </Typography>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div className="d-flex align-items-center me-3">
              <div className="stage-box pendingStage"></div>
              <Typography>Pending stage</Typography>
            </div>
            <div className="d-flex align-items-center me-3">
              <div className="stage-box delayedStage"></div>
              <Typography>Delayed stage</Typography>
            </div>
            <div className="d-flex align-items-center me-3">
              <div className="stage-box clearedStage"></div>
              <Typography>Cleared stage</Typography>
            </div>
          </div>
        </div>
      </div>

      <TableContainer component={Paper} className="mt-4">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stage Status</TableCell>
              <TableCell>Order No.</TableCell>
              <TableCell>Stage of Approval</TableCell>
              <TableCell>Approvers</TableCell>
              <TableCell align="center">Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TooltipHost content={row.status}>
                    <div className={`stage-box ${row.status.toLowerCase()}Stage`}></div>
                  </TooltipHost>
                </TableCell>
                <TableCell>{row.orderNo}</TableCell>
                <TableCell>{row.stage}</TableCell>
                <TableCell>
                  <FormControl className="input-field">
                    <Dropdown
                      label="Select Approvers"
                      placeholder="Select Approvers"
                      selectedKeys={selectedApprovers}
                      multiSelect
                      options={approvers.map((approver) => ({
                        key: approver,
                        text: approver
                      }))}
                      onChange={(event, option) => setSelectedApprovers(option.selectedKeys)}
                    />
                  </FormControl>
                </TableCell>
                <TableCell align="center">
                  <Checkbox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reallocation;
