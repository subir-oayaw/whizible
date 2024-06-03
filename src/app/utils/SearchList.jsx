import React from "react";
import { Stack } from "@fluentui/react";
import SearchAdvanceForm from "./SearchAdvanceForm";

const SearchList = ({ onClose }) => {
  return (
    <div className="search-list-container">
      <div className="search-list-box">
        <Stack
          tokens={{ childrenGap: 20 }}
          styles={{ root: { padding: 20, border: "1px solid #ccc", background: "#f2f2f2" } }}
        >
          <h4>Advanced Search</h4>
          <SearchAdvanceForm onClose={onClose} />
        </Stack>
      </div>
    </div>
  );
};

export default SearchList;
