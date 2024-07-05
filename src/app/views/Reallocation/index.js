import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Reallocation = () => {
  const [currentApprover, setCurrentApprover] = useState("");
  const [natureOfInitiative, setNatureOfInitiative] = useState("");
  const [businessGroup, setBusinessGroup] = useState("");
  const [stageOfApproval, setStageOfApproval] = useState("");
  const [initiativeTitle, setInitiativeTitle] = useState("");
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [rows, setRows] = useState([
    { id: 1, status: "Pending", orderNo: 4, stage: "Deployment", approvers: ["James"] },
    { id: 2, status: "Delayed", orderNo: 5, stage: "Deployment", approvers: ["Kavya"] },
    { id: 3, status: "Cleared", orderNo: 6, stage: "Completed", approvers: ["Mac"] }
  ]);

  const approvers = ["James", "Kavya", "Mac", "Nirbhay", "Robin"];
  const initiatives = ["Initiative 1", "Initiative 2", "Initiative 3"];
  const businessGroups = ["Construction", "India International"];
  const stages = ["CEO Approval", "CFO Approval", "Completed", "Delivery Manager"];

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
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
      case "selectedApprovers":
        setSelectedApprovers(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container-fluid">
      <style jsx>{`
        .input-field {
          height: 40px;
          width: 300px;
          margin-bottom: 20px;
        }
        .stage-box {
          width: 20px;
          height: 20px;
          display: inline-block;
          margin-right: 10px;
        }
        .pendingStage {
          background-color: yellow;
        }
        .delayedStage {
          background-color: red;
        }
        .clearedStage {
          background-color: green;
        }
      `}</style>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Advanced Search</Typography>
        </AccordionSummary>
        <div class="note-txt">
          <span class="note-title">
            <i class="fa-regular fa-lightbulb"></i>{" "}
          </span>
          Initiative Reallocation helps to manage the approval process such a way that an initiative
          is not 'stranded' at any stage. So the approval process continues smoothly...
        </div>
        <AccordionDetails>
          <div className="row mb-3">
            <div className="col-md-4">
              <FormControl fullWidth variant="outlined" className="input-field">
                <InputLabel id="current-approver-label">Select Current Approver</InputLabel>
                <Select
                  labelId="current-approver-label"
                  id="current-approver"
                  name="currentApprover"
                  value={currentApprover}
                  onChange={handleSelectChange}
                  label="Select Current Approver"
                >
                  {approvers.map((approver) => (
                    <MenuItem key={approver} value={approver}>
                      {approver}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-4">
              <FormControl fullWidth variant="outlined" className="input-field">
                <InputLabel id="nature-of-initiative-label">Nature of Initiative</InputLabel>
                <Select
                  labelId="nature-of-initiative-label"
                  id="nature-of-initiative"
                  name="natureOfInitiative"
                  value={natureOfInitiative}
                  onChange={handleSelectChange}
                  label="Nature of Initiative"
                >
                  {initiatives.map((initiative) => (
                    <MenuItem key={initiative} value={initiative}>
                      {initiative}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-4">
              <FormControl fullWidth variant="outlined" className="input-field">
                <InputLabel id="business-group-label">Business Group</InputLabel>
                <Select
                  labelId="business-group-label"
                  id="business-group"
                  name="businessGroup"
                  value={businessGroup}
                  onChange={handleSelectChange}
                  label="Business Group"
                >
                  {businessGroups.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <FormControl fullWidth variant="outlined" className="input-field">
                <InputLabel id="stage-of-approval-label">Stage of Approval</InputLabel>
                <Select
                  labelId="stage-of-approval-label"
                  id="stage-of-approval"
                  name="stageOfApproval"
                  value={stageOfApproval}
                  onChange={handleSelectChange}
                  label="Stage of Approval"
                >
                  {stages.map((stage) => (
                    <MenuItem key={stage} value={stage}>
                      {stage}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-4">
              <TextField
                fullWidth
                id="initiative-title"
                name="initiativeTitle"
                label="Initiative Title"
                variant="outlined"
                className="input-field"
                value={initiativeTitle}
                onChange={handleSelectChange}
              />
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => console.log("Next clicked")}
              >
                Next
              </Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className="mt-4 text-end" style={{ backgroundColor: "lightgrey" }}>
        <Typography variant="h5" gutterBottom>
          Selected Approver: Nikhil Adtakar
        </Typography>
      </div>
      <div className=" text-end ">
        <Button variant="contained" color="primary" onClick={() => console.log("Next clicked")}>
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
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Tooltip title={row.status} placement="top">
                    <div className={`stage-box ${row.status.toLowerCase()}Stage`}></div>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.orderNo}</TableCell>
                <TableCell>{row.stage}</TableCell>
                <TableCell>
                  <FormControl fullWidth variant="outlined" className="input-field">
                    <Select
                      multiple
                      value={selectedApprovers}
                      onChange={(e) => setSelectedApprovers(e.target.value)}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {approvers.map((approver) => (
                        <MenuItem key={approver} value={approver}>
                          <Checkbox checked={selectedApprovers.indexOf(approver) > -1} />
                          {approver}
                        </MenuItem>
                      ))}
                    </Select>
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
