import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import FluentTable from "../../components/FluentTable";
import "./InitiativeTable.css"; // Assuming you have custom styles

const InitiativeTable = ({ wareHouseIni }) => {
  const [data, setData] = useState([]);
  console.log("wareHouseIni", wareHouseIni);

  useEffect(() => {
    if (wareHouseIni?.listWareHouseIni) {
      const mappedData = wareHouseIni.listWareHouseIni.map((item) => ({
        code: item.demandCode,
        title: item.title,
        status: item.status,
        nature: item.natureofDemand,
        stage: item.requestStage,
        vendor: item.vendor || "N/A", // Handle vendor mapping
        initiatedOn: item.initiatedOn || "N/A" // Handle missing initiatedOn field
      }));
      setData(mappedData);
    }
  }, [wareHouseIni]);

  const columns = [
    {
      key: "code",
      name: "Initiative Code",
      fieldName: "code",
      minWidth: 100,
      isResizable: true
    },
    {
      key: "title",
      name: "Initiative Title",
      fieldName: "title",
      minWidth: 100,
      isResizable: true
    },
    {
      key: "status",
      name: "Status",
      fieldName: "status",
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
      key: "stage",
      name: "Stage Name",
      fieldName: "stage",
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
      key: "initiatedOn",
      name: "Initiated On",
      fieldName: "initiatedOn",
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

  return <FluentTable columns={columns} items={data} itemsPerPage={5} />;
};

export default InitiativeTable;
