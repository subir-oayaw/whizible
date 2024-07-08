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
import initiatives from "./dummyData"; // Import the dummy data

const InitiativeTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or file
    setData(initiatives);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: "#ccc" }}>
          <TableRow>
            <TableCell>Initiative Title</TableCell>
            <TableCell>Nature of Initiative</TableCell>
            <TableCell>Business Group/Organization Unit</TableCell>
            <TableCell>Converted To</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((initiative, index) => (
            <TableRow
              key={initiative.title}
              style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}
            >
              <TableCell>{initiative.title}</TableCell>
              <TableCell>{initiative.nature}</TableCell>
              <TableCell>{initiative.group}</TableCell>
              <TableCell>{initiative.convertedTo}</TableCell>
              <TableCell>{initiative.vendor}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="History">
                  <IconButton aria-label="history">
                    <HistoryIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Comment">
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InitiativeTable;
