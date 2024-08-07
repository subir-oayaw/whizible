import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Stack,
  DefaultButton,
  Text,
  IColumn
} from "@fluentui/react";

const FluentTable = ({ columns, items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when items change
  }, [items]);

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <DefaultButton
          text="Previous"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Text>{`Page ${currentPage}`}</Text>
        <DefaultButton
          text="Next"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= items.length}
        />
      </Stack>
    </div>
  );
};

export default FluentTable;
