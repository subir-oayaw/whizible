import React, { useState, useEffect } from "react";
import { TooltipHost, IconButton } from "@fluentui/react";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import CommentIcon from "@mui/icons-material/Comment";
import FluentTable from "../../components/FluentTable";

const InitiativeTable = ({ convertedIni }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Check if convertedIni contains data and map it accordingly
    if (convertedIni?.listConvertedIni) {
      const mappedData = convertedIni.listConvertedIni.map((item) => ({
        title: item.title,
        nature: item.natureofDemand,
        group: item.businessGroup, // Adjust this field if it has a different name
        convertedTo: item.convertedTo, // Adjust this field if it has a different name
        vendor: item.vendor // Adjust this field if it has a different name
      }));
      setData(mappedData);
    }
  }, [convertedIni]);

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
    { key: "vendorID", name: "Vendor", fieldName: "vendorID", minWidth: 100, isResizable: true },
    {
      key: "action",
      name: "Action",
      minWidth: 100,
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
