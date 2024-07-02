import React, { useState, useEffect } from "react";
import { Card, Button, Nav } from "react-bootstrap";
import { TextField } from "@fluentui/react";
import Pagination from "@mui/material/Pagination";
import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& th": {
      backgroundColor: "#f2f2f2",
      border: "1px solid #ddd",
      padding: "8px"
    },
    "& td": {
      border: "1px solid #ddd",
      padding: "8px"
    }
  },
  selectedRow: {
    backgroundColor: "#e3f2fd !important" // Example of selected row background color
  }
});
export default function BudgetTitle({ slicedActionItems }) {
  console.log("slicedActionItems", slicedActionItems);
  const classes = useStyles();
  return (
    <div className="mt-4">
      <TableContainer>
        <Table className={classes.table} striped bordered>
          <thead>
            <tr>
              <th>Action Item</th>
              <th>Due Date</th>
              <th>Stage</th>
              <th>Assigned To</th>
              <th>Submitted By</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Initiative</th> {/* New column for Initiative */}
              <th></th>
            </tr>
          </thead>
          <TableBody>
            {slicedActionItems.map((item, index) => (
              <TableRow key={index} className={index === 0 ? classes.selectedRow : ""}>
                <TableCell>{item.actionItem}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>{item.stage}</TableCell>
                <TableCell>{item.assignedTo}</TableCell>
                <TableCell>{item.submittedBy}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell>{item.initiative}</TableCell>
                <TableCell>{/* <FluentCheckbox /> */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
