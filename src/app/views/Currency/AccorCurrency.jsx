import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Link
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { Label, TextField, Stack, DefaultButton } from "@fluentui/react";

const AccorCurrency = ({ onClose, onSearch }) => {
  const RApproach = {
    filter_CurrencyCode: "",
    filter_CurrencyName: "",
    filter_CurrencySymbol: "",
    filter_ConversionRate: "",
    filter_Major: "",
    filter_Minor: ""
  };

  const [formValues, setFormValues] = useState(RApproach);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleClearSearch = () => {
    setFormValues(RApproach);
  };

  const handleSaveAndSearch = () => {
    onSearch({
      CurrencyCode: formValues.filter_CurrencyCode,
      CurrencyName: formValues.filter_CurrencyName,
      CurrencySymbol: formValues.filter_CurrencySymbol,
      ConversionRate: formValues.filter_ConversionRate,
      majorCurrencyUnit: formValues.filter_Major,
      minorCurrencyUnit: formValues.filter_Minor
    });
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
            {[
              { id: "filter_CurrencyCode", label: "Currency Code", placeholder: "ac1234" },
              { id: "filter_CurrencyName", label: "Currency Name", placeholder: "Indian" },
              { id: "filter_CurrencySymbol", label: "Currency Symbol", placeholder: "Rs." },
              {
                id: "filter_ConversionRate",
                label: "Conversion Rate (Value Vs. Base Currency)",
                placeholder: "10"
              },
              { id: "filter_Major", label: "Major", placeholder: "10" },
              { id: "filter_Minor", label: "Minor", placeholder: "10" }
            ].map(({ id, label, placeholder }, index) => (
              <div key={id} className={`col-sm-${index < 4 ? "4" : "3"} mb-2`}>
                <Label htmlFor={id}>{label}</Label>
                <TextField
                  id={id}
                  value={formValues[id]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  styles={{
                    root: { width: "100%" },
                    fieldGroup: { width: "100%" }
                  }}
                  underlined
                />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-end gap-3 mt-3">
              <DefaultButton
                id="ClearSearchBtn"
                className="underline_btn"
                text="Clear Search"
                onClick={handleClearSearch}
                styles={{ root: { backgroundColor: "#f44336", color: "#fff" } }}
              />
              <DefaultButton
                id="SaveSearchBtn"
                className="underline_btn"
                text="Save and Search"
                onClick={handleSaveAndSearch}
                styles={{ root: { backgroundColor: "#4caf50", color: "#fff" } }}
              />
              <DefaultButton
                id="CloseSearchBtn"
                className="underline_btn"
                onClick={onClose}
                text="Close"
                styles={{ root: { backgroundColor: "#9e9e9e", color: "#fff" } }}
              />
              <DefaultButton
                id="SearchBtn"
                className=""
                color="primary"
                text="Search"
                onClick={handleSaveAndSearch}
                styles={{ root: { backgroundColor: "#2196f3", color: "#fff" } }}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccorCurrency;
