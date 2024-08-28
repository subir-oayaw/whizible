import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Stack,
  Text,
  IColumn
} from "@fluentui/react";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";

const FluentTable = ({ columns, items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when items change
  }, [items]);

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Customize columns to add vertical lines
  const customizedColumns = columns.map((column, index) => ({
    ...column,
    onRender: (item) => (
      <div
        style={{
          borderRight: index < columns.length - 1 ? "1px solid #ddd" : "none",
          padding: "8px"
        }}
      >
        {column.onRender ? column.onRender(item) : item[column.key]}
      </div>
    )
  }));

  // Customize headers to add vertical lines
  const headerStyles = {
    root: {
      display: "flex"
    },
    cell: {
      borderRight: "1px solid #ddd"
    }
  };

  return (
    <div>
      <DetailsList
        items={currentItems}
        columns={customizedColumns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
        styles={{
          root: {
            border: "1px solid #ddd" // Add border around the entire table
          },
          headerWrapper: {
            borderBottom: "2px solid #ddd" // Add border below header
          },
          headerCell: headerStyles.cell // Apply vertical lines to header cells
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2
        }}
      >
        <Pagination
          count={Math.ceil(items.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default FluentTable;
