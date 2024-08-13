import React, { useEffect, useState } from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import CurrencyTable from "./CurrencyTable";
import useCurrencyMaster from "app/hooks/CurrencyMaster/useCurrencyMaster";
import AccorCurrency from "./AccorCurrency";
import useGetViewOptions from "app/hooks/useGetViewOptions";
import tagMappings from "../../../../app/TagNames/tag";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Index = () => {
  const { t } = useTranslation(); // Initialize translation function
  const [refresh, setRefresh] = useState(true);
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
    setRefresh(!refresh);
    console.log("newSearchParams", refresh);
    setSearchParams(newSearchParams);
  };
  useEffect(() => {}, [refresh]);

  return (
    <div id="Currency_main" className="">
      {/* <Pivot className="bglightblue">
        <PivotItem headerText={t("currency")}></PivotItem> 
      </Pivot> */}
      {/* Uncomment and use AccorCurrency if needed */}
      {/* <AccorCurrency
        onClose={() => console.log(t('closed'))} // Use translation
        onSearch={handleSearch} // Pass the handleSearch function as a prop
      /> */}
      <div>
        {currencyData && (
          <CurrencyTable
            currencyData={currencyData}
            onSearch={handleSearch}
            onClose={() => console.log(t("closed"))} // Use translation
            getViewOptions={getViewOptions}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
