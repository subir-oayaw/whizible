import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Tooltip,
  Drawer,
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Avatar
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import FluentTable from "../../components/FluentTable";
import "./InitiativeTable.css"; // Assuming you have custom styles

const InitiativeTable = ({ completedIni, currentPage, setCurrentPage }) => {
  const [data, setData] = useState([]);
  console.log("completedIni1", completedIni);

  useEffect(() => {
    if (completedIni?.listCompletedIni) {
      const mappedData = completedIni.listCompletedIni.map((item) => ({
        title: item.title,
        nature: item.natureofDemand,
        group: item.businessGroup || item.organizationUnit, // Mapping businessGroup or organizationUnit
        convertedTo: item.convertedTo || "N/A", // Handle empty fields
        vendor: item.nameOfFirm || "N/A" // Handle vendor mapping
      }));
      setData(mappedData);
    }
  }, [completedIni]);

  const columns = [
    {
      key: "title",
      name: "Initiative Title",
      fieldName: "title",
      minWidth: 100,
      isResizable: true
    },
    {
      key: "nature",
      name: "Nature of Initiative",
      fieldName: "nature",
      minWidth: 100,
      isResizable: true
    },
    {
      key: "group",
      name: "Business Group/Organization Unit",
      fieldName: "group",
      minWidth: 100,
      isResizable: true
    },
    {
      key: "convertedTo",
      name: "Converted To",
      fieldName: "convertedTo",
      minWidth: 100,
      isResizable: true
    },
    {
      key: "vendor",
      name: "Vendor",
      fieldName: "vendor",
      minWidth: 100,
      isResizable: true
    },
    {
      key: "action",
      name: "Action",
      minWidth: 100,
      isResizable: true,
      onRender: (item) => (
        <div style={{ display: "flex", gap: "5px" }}>
          <Tooltip title="Edit">
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Comment">
            <IconButton size="small">
              <CommentIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delay">
            <IconButton size="small">
              <AccessTimeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Flag">
            <IconButton size="small">
              <FlagIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <FluentTable
      columns={columns}
      items={data}
      itemsPerPage={5}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default InitiativeTable;
