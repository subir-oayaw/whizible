import React, { useState, useEffect } from "react";
import { Label, TextField, Stack, PrimaryButton } from "@fluentui/react";

const Details_Currency = ({ onClose, selectedCurrencyNames }) => {
  // Initial empty currency object
  const Currency = {
    CurrencyCode: "",
    CurrencyName: "",
    CurrencySymbol: "",
    ConversionRate: "",
    Major: "",
    Minor: ""
  };

  // State for form visibility and values
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState(Currency);

  // Update form values when selectedCurrencyNames changes
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
    }
  }, [selectedCurrencyNames]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  // Toggle form visibility
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="above-form-container">
      <div className="d-flex justify-content-end gap-3 mt-2">
        <PrimaryButton text="Save" className="borderbtnbgblue" onClick={onClose} />
        <PrimaryButton text="Save and Add" className="borderbtnbgblue" onClick={onClose} />
        {/* <DefaultButton text="Cancel" onClick={onClose} /> */}
      </div>

      <div className="row mt-1">
        <div className="col-sm-12 text-end required">
          <label className="IM_label">
            (<font color="red">*</font> Mandatory)
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <Stack.Item grow={1}>
            <Label htmlFor="CurrencyCode" className="form-label">
              Currency Code
            </Label>
            <TextField
              id="CurrencyCode"
              value={formValues.CurrencyCode}
              onChange={handleInputChange}
              placeholder="INR"
            />
          </Stack.Item>
        </div>
        <div className="col-sm-2"></div>
        <div className="col-sm-6">
          <Stack.Item grow={4}>
            <Label htmlFor="CurrencyName" className="form-label">
              Currency Name
            </Label>
            <TextField
              id="CurrencyName"
              value={formValues.CurrencyName}
              onChange={handleInputChange}
              placeholder="INR"
            />
          </Stack.Item>
        </div>
        <div className="col-sm-6">
          <Stack.Item grow={4}>
            <Label htmlFor="CurrencySymbol" className="form-label">
              Currency Symbol
            </Label>
            <TextField
              id="CurrencySymbol"
              value={formValues.CurrencySymbol}
              onChange={handleInputChange}
              placeholder=""
            />
          </Stack.Item>
        </div>
        <div className="col-sm-6">
          <Stack.Item grow={4}>
            <Label htmlFor="ConversionRate" className="form-label">
              Conversion Rate (Value Vs. Base Currency)
            </Label>
            <TextField
              id="ConversionRate"
              value={formValues.ConversionRate}
              onChange={handleInputChange}
              placeholder=""
            />
          </Stack.Item>
        </div>
        <div className="col-sm-4">
          <Stack.Item grow={4}>
            <Label htmlFor="Major" className="form-label">
              Major
            </Label>
            <TextField
              id="Major"
              value={formValues.Major}
              onChange={handleInputChange}
              placeholder="1"
            />
          </Stack.Item>
        </div>
        <div className="col-sm-2"></div>
        <div className="col-sm-4">
          <Stack.Item grow={4}>
            <Label htmlFor="Minor" className="form-label">
              Minor
            </Label>
            <TextField
              id="Minor"
              value={formValues.Minor}
              onChange={handleInputChange}
              placeholder="5"
            />
          </Stack.Item>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
};

export default Details_Currency;
