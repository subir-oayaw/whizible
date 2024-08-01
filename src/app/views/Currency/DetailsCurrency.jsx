import React, { useState, useEffect } from "react";
import { Label, TextField, Stack, PrimaryButton, Dropdown } from "@fluentui/react";
import currencySymbolMap from "currency-symbol-map";
import currencyCodes from "currency-codes";

// Function to get currency symbol options
const getCurrencySymbolOptions = () => {
  return currencyCodes.codes().map((code) => {
    const symbol = currencySymbolMap(code);
    const currencyName = currencyCodes.code(code).currency;
    return { key: symbol, text: `${symbol} - ${currencyName} (${code})` };
  });
};

const DetailsCurrency = ({ onClose, selectedCurrencyNames }) => {
  const Currency = {
    CurrencyCode: "",
    CurrencyName: "",
    CurrencySymbol: "",
    ConversionRate: "",
    Major: "",
    Minor: ""
  };

  const [formValues, setFormValues] = useState(Currency);
  const [errors, setErrors] = useState({});
  const currencySymbolOptions = getCurrencySymbolOptions();

  useEffect(() => {
    if (selectedCurrencyNames && selectedCurrencyNames.length > 0) {
      const currency = selectedCurrencyNames[0];
      setFormValues({
        CurrencyCode: currency.currencyCode || "",
        CurrencyName: currency.currencyName || "",
        CurrencySymbol: currency.currencySymbol || "",
        ConversionRate: currency.conversionRate || "",
        Major: currency.majorCurrencyUnit || "",
        Minor: currency.minorCurrencyUnit || ""
      });
    } else {
      setFormValues(Currency);
    }
  }, [selectedCurrencyNames]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleDropdownChange = (event, option) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      CurrencySymbol: option.key
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.CurrencyCode) newErrors.CurrencyCode = "Currency Code is required.";
    if (!formValues.CurrencyName) newErrors.CurrencyName = "Currency Name is required.";
    if (!formValues.CurrencySymbol) newErrors.CurrencySymbol = "Currency Symbol is required.";
    if (!formValues.ConversionRate || isNaN(formValues.ConversionRate))
      newErrors.ConversionRate = "Conversion Rate must be a floating-point number.";
    if (!formValues.Major || isNaN(formValues.Major) || !Number.isInteger(Number(formValues.Major)))
      newErrors.Major = "Major must be an integer.";
    if (!formValues.Minor || isNaN(formValues.Minor) || !Number.isInteger(Number(formValues.Minor)))
      newErrors.Minor = "Minor must be an integer.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onClose();
    } else {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          element.focus();
        }
      }
    }
  };

  const textFieldStyles = {
    fieldGroup: { width: "100%" },
    field: {
      color: "#000",
      "::placeholder": {
        color: "lightgrey",
        opacity: 1
      }
    }
  };

  return (
    <div className="above-form-container">
      <div className="d-flex justify-content-end gap-3 mt-2">
        <PrimaryButton text="Save" className="borderbtnbgblue" onClick={handleSave} />
        <PrimaryButton text="Save and Add" className="borderbtnbgblue" onClick={handleSave} />
      </div>

      <div className="row mt-1">
        <div className="col-sm-12 text-end required">
          <label className="IM_label">
            (<font color="red">*</font> Mandatory)
          </label>
        </div>
      </div>

      <div className="row">
        <Stack tokens={{ childrenGap: 15 }} wrap>
          <Stack horizontal tokens={{ childrenGap: 15 }} wrap>
            <Stack.Item grow>
              <Label htmlFor="CurrencyCode" className="form-label">
                Currency Code
              </Label>
              <TextField
                id="CurrencyCode"
                value={formValues.CurrencyCode}
                onChange={handleInputChange}
                placeholder="INR"
                errorMessage={errors.CurrencyCode}
                styles={textFieldStyles}
              />
            </Stack.Item>
            <Stack.Item grow>
              <Label htmlFor="CurrencyName" className="form-label">
                Currency Name
              </Label>
              <TextField
                id="CurrencyName"
                value={formValues.CurrencyName}
                onChange={handleInputChange}
                placeholder="Indian Rupee"
                errorMessage={errors.CurrencyName}
                styles={textFieldStyles}
              />
            </Stack.Item>
            <Stack.Item grow>
              <Label htmlFor="ConversionRate" className="form-label">
                Conversion Rate
              </Label>
              <TextField
                id="ConversionRate"
                value={formValues.ConversionRate}
                onChange={handleInputChange}
                placeholder="e.g., 74.85"
                errorMessage={errors.ConversionRate}
                styles={textFieldStyles}
              />
            </Stack.Item>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 15 }} wrap>
            <Stack.Item grow>
              <Label htmlFor="Major" className="form-label">
                Major
              </Label>
              <TextField
                id="Major"
                value={formValues.Major}
                onChange={handleInputChange}
                placeholder="1"
                errorMessage={errors.Major}
                styles={textFieldStyles}
              />
            </Stack.Item>
            <Stack.Item grow>
              <Label htmlFor="Minor" className="form-label">
                Minor
              </Label>
              <TextField
                id="Minor"
                value={formValues.Minor}
                onChange={handleInputChange}
                placeholder="5"
                errorMessage={errors.Minor}
                styles={textFieldStyles}
              />
            </Stack.Item>
            <Stack.Item grow>
              <Label htmlFor="CurrencySymbol" className="form-label">
                Currency Symbol
              </Label>
              <Dropdown
                id="CurrencySymbol"
                selectedKey={formValues.CurrencySymbol}
                onChange={handleDropdownChange}
                placeholder="Select a symbol"
                options={currencySymbolOptions}
                errorMessage={errors.CurrencySymbol}
              />
            </Stack.Item>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default DetailsCurrency;
