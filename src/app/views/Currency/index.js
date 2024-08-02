import React, { useState, useEffect } from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import CurrencyTable from "./CurrencyTable";
import useCurrencyMaster from "app/hooks/useCurrencyMaster";
import AccorCurrency from "./AccorCurrency";
import useGetViewOptions from "app/hooks/useGetViewOptions";
import tagMappings from "../../../app/TagNames/tag";

const CurrencyInfo = () => {
  const [searchParams, setSearchParams] = useState({
    CurrencyCode: "",
    CurrencyName: "",
    CurrencySymbol: "",
    ConversionRate: "",
    majorCurrencyUnit: "",
    minorCurrencyUnit: ""
  });

  const { currencyData, loading, error } = useCurrencyMaster(searchParams);
  const { getViewOptions } = useGetViewOptions(tagMappings.Currency.toString());

  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams);
  };

  return (
    <div id="Currency_main" className="">
      <Pivot className="bglightblue">
        <PivotItem headerText="Currency"></PivotItem>
      </Pivot>
      {/* <AccorCurrency
        onClose={() => console.log("Closed")}
        onSearch={handleSearch} // Pass the handleSearch function as a prop
      /> */}
      <div>
        {currencyData && (
          <CurrencyTable
            currencyData={currencyData}
            onSearch={handleSearch}
            onClose={() => console.log("Closed")}
            getViewOptions={getViewOptions}
          />
        )}
      </div>
    </div>
  );
};

export default CurrencyInfo;
