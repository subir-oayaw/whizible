import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Stack,
  DefaultButton,
  Text
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

  return (
    <div>
      <DetailsList
        items={currentItems}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
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
