import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Link} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'
import { Label, TextField, Stack, DefaultButton } from "@fluentui/react";


const Accor_Currency = ({ onClose }) => {
    const RApproach = {
        filter_CurrencyCode: "",
        filter_CurrencyName: "",
        filter_CurrencySymbol: "",
        filter_ConversionRate : "",
        filter_Major : "",
        filter_Minor : "",
      };
      
  const [formValues, setFormValues] = useState(RApproach);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleClearSearch = () => {
    setFormValues(RApproach);
  };
  return (
    <div className="mb-4" >
      <Accordion className='accordionbg' defaultExpanded>
        <AccordionSummary className='accor_textsize'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header">
          Advanced Search
        </AccordionSummary>
        <AccordionDetails>
        <div class="row">
          <div class="col-sm-4 mb-2">
            <Label htmlFor="filter_CurrencyCode">Currency Code</Label>
            <TextField id="filter_CurrencyCode" value={formValues.filter_CurrencyCode} onChange={handleInputChange} placeholder="ac1234"/>
          </div>
          <div class="col-sm-4 mb-2">
            <Label htmlFor="filter_CurrencyName">Currency Name</Label>
            <TextField id="filter_CurrencyName" value={formValues.filter_CurrencyName} onChange={handleInputChange} placeholder="Indian"/>
          </div>
          <div class="col-sm-4 mb-2">
            <Label htmlFor="filter_CurrencySymbol">Currency Symbol</Label>
            <TextField id="filter_CurrencySymbol" value={formValues.filter_CurrencySymbol} onChange={handleInputChange} placeholder="Rs."/>
          </div>
          <div class="col-sm-4 mb-2">
            <Label htmlFor="filter_ConversionRate">Conversion Rate (Value Vs. Base Currency)</Label>
            <TextField id="filter_ConversionRate" value={formValues.filter_ConversionRate} onChange={handleInputChange} placeholder="10"/>
          </div>
          <div class="col-sm-3 mb-2">
            <Label htmlFor="filter_Major">Major</Label>
            <TextField id="filter_Major" value={formValues.filter_Major} onChange={handleInputChange} placeholder="10"/>
          </div>
          <div className='col-sm-1'></div>
          <div class="col-sm-3 mb-2">
            <Label htmlFor="filter_Minor">Minor</Label>
            <TextField id="filter_Minor" value={formValues.filter_Minor} onChange={handleInputChange} placeholder="10"/>
          </div>
          <div className='col-sm-1'></div>
          
        </div>
          <div class="row">
              <div class="col-sm-12 d-flex justify-content-end gap-3 mt-3">
                 <DefaultButton id="ClearSearchBtn" className="underline_btn" text='Clear Search'/>
                  <DefaultButton id="SaveSearchBtn" className="underline_btn" text='Save and Search'/>
                  <DefaultButton id="CloseSearchBtn" className="underline_btn" onClick={onClose} text='Close'/>
                  <DefaultButton id="SearchBtn" className="" color="primary" text='Search'/>
              </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Accor_Currency

