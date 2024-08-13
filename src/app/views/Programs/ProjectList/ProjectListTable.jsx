import React, { useState, useEffect } from "react";
import { TooltipHost, IconButton } from "@fluentui/react";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import CommentIcon from "@mui/icons-material/Comment";
import initiatives from "./dummyData"; // Import the dummy data
import FluentTable from "../../../components/FluentTable";

const InitiativeTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or file
    setData(initiatives);
  }, []);

  const columns = [
    {
      key: "title",
      name: "Project Name",
      fieldName: "title",
      isMultiline: true,
      isMultiline: true,
      isMultiline: true,
      isResizable: true
    },
    {
      key: "nature",
      name: "Abbreviated Name",
      fieldName: "nature",
      isResizable: true
    },
    {
      key: "group",
      name: "Start Date",
      fieldName: "group",
      isResizable: true
    },
    {
      key: "convertedTo",
      name: "End Date",
      fieldName: "convertedTo",
      isResizable: true
    },
    { key: "vendor", name: "Vendor", fieldName: "vendor", isResizable: true },
    {
      key: "action",
      name: "Action",
      isMultiline: true,
      isResizable: true,
      onRender: (item) => (
        <div>
          <TooltipHost content="Edit">
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </TooltipHost>
          <TooltipHost content="History">
            <IconButton aria-label="history">
              <HistoryIcon />
            </IconButton>
          </TooltipHost>
          <TooltipHost content="Comment">
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </TooltipHost>
        </div>
      )
    }
  ];

  return <FluentTable columns={columns} items={data} itemsPerPage={5} />;
};

export default InitiativeTable;
