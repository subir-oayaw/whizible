import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Label, TextField, DefaultButton } from "@fluentui/react";

const AccorCurrency = ({ onClose, onSearch }) => {
  const initialValues = {
    currencyID: "0",
    currencyCode: "",
    currencyName: "",
    currencySymbol: "",
    conversionRate: "0",
    majorCurrencyUnit: "",
    minorCurrencyUnit: ""
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleClearSearch = () => {
    setFormValues(initialValues);
  };

  const handleSaveAndSearchClick = () => {
    console.log("Saving and Searching with Parameters:", formatSearchParams(formValues));
    if (onSearch) {
      onSearch(formatSearchParams(formValues));
    } else {
      console.error("onSearch function is not defined");
    }
  };

  const handleSearchClick = () => {
    console.log("Search Parameters:", formatSearchParams(formValues));
    if (onSearch) {
      onSearch(formatSearchParams(formValues));
    }
  };

  const formatSearchParams = (values) => {
    return `currencyID=${values.currencyID}&currencyCode=${values.currencyCode}&currencyName=${values.currencyName}&currencySymbol=${values.currencySymbol}&conversionRate=${values.conversionRate}&majorCurrencyUnit=${values.majorCurrencyUnit}&minorCurrencyUnit=${values.minorCurrencyUnit}`;
  };

  return (
    <div className="mb-4">
      <Accordion className="accordionbg" defaultExpanded>
        <AccordionSummary
          className="accor_textsize"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Advanced Search
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col-sm-4 mb-2">
              <Label htmlFor="currencyCode">Currency Code</Label>
              <TextField
                id="currencyCode"
                value={formValues.currencyCode}
                onChange={handleInputChange}
                placeholder="ac1234"
              />
            </div>
            <div className="col-sm-4 mb-2">
              <Label htmlFor="currencyName">Currency Name</Label>
              <TextField
                id="currencyName"
                value={formValues.currencyName}
                onChange={handleInputChange}
                placeholder="Indian"
              />
            </div>
            <div className="col-sm-4 mb-2">
              <Label htmlFor="currencySymbol">Currency Symbol</Label>
              <TextField
                id="currencySymbol"
                value={formValues.currencySymbol}
                onChange={handleInputChange}
                placeholder="Rs."
              />
            </div>
            <div className="col-sm-4 mb-2">
              <Label htmlFor="conversionRate">Conversion Rate (Value Vs. Base Currency)</Label>
              <TextField
                id="conversionRate"
                value={formValues.conversionRate}
                onChange={handleInputChange}
                placeholder="10"
              />
            </div>
            <div className="col-sm-3 mb-2">
              <Label htmlFor="majorCurrencyUnit">Major</Label>
              <TextField
                id="majorCurrencyUnit"
                value={formValues.majorCurrencyUnit}
                onChange={handleInputChange}
                placeholder="10"
              />
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-3 mb-2">
              <Label htmlFor="minorCurrencyUnit">Minor</Label>
              <TextField
                id="minorCurrencyUnit"
                value={formValues.minorCurrencyUnit}
                onChange={handleInputChange}
                placeholder="10"
              />
            </div>
            <div className="col-sm-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-end gap-3 mt-3">
              <DefaultButton
                id="ClearSearchBtn"
                className="underline_btn"
                text="Clear Search"
                onClick={handleClearSearch}
              />
              <DefaultButton
                id="SaveSearchBtn"
                className="underline_btn"
                text="Save and Search"
                onClick={handleSaveAndSearchClick}
              />
              <DefaultButton
                id="CloseSearchBtn"
                className="underline_btn"
                onClick={onClose}
                text="Close"
              />
              <DefaultButton
                id="SearchBtn"
                className=""
                color="primary"
                text="Search"
                onClick={handleSearchClick}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccorCurrency;
