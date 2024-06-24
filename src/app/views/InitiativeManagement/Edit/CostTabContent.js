import React, { useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { Label } from "@fluentui/react/lib/Label";
import { TooltipHost } from "@fluentui/react/lib/Tooltip";
import { TextField, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns"; // Correct import for date-fns adapter
import { Table, Nav, Stack } from "react-bootstrap";
const CostTabContent = ({ costData }) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState(costData.map(() => false));
  const [showDrawer, setShowDrawer] = useState(false);
  const [formState, setFormState] = useState({
    costCategory: "",
    amount: "",
    costType: "",
    fromDate: null,
    toDate: null,
    description: "",
    monthlyDistribution: Array(12).fill("")
  });

  const handleSelectAllChange = (checked) => {
    setSelectAllChecked(checked);
    setIndividualChecks(individualChecks.map(() => checked));
  };

  const handleIndividualChange = (index, checked) => {
    const newChecks = [...individualChecks];
    newChecks[index] = checked;
    setIndividualChecks(newChecks);
    setSelectAllChecked(newChecks.every((check) => check));
  };

  const openDrawer = () => {
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  const handleFormChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const DrawerContent = () => (
    <div style={{ width: 300, padding: 20 }}>
      <div className="offcanvas-body">
        <div className="graybg container-fluid py-2 mb-2">
          <div className="row">
            <div className="col-sm-10">
              <h5 className="offcanvasTitle">Cost Details</h5>
            </div>
            <div className="col-sm-2 text-end">
              <a
                href="javascript:;"
                className="close offClose"
                onClick={closeDrawer}
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Stack tokens={{ childrenGap: 15 }}>
            <TextField
              label="Cost Category"
              select
              SelectProps={{
                native: true
              }}
              value={formState.costCategory}
              onChange={(e) => handleFormChange("costCategory", e.target.value)}
            >
              <option value="" />
              <option value="Alpha">Alpha</option>
              <option value="Petrol">Petrol</option>
            </TextField>
            <TextField
              label="Amount"
              type="number"
              value={formState.amount}
              onChange={(e) => handleFormChange("amount", e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From Date"
                value={formState.fromDate}
                onChange={(newValue) => handleFormChange("fromDate", newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="To Date"
                value={formState.toDate}
                onChange={(newValue) => handleFormChange("toDate", newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <RadioGroup
              value={formState.costType}
              onChange={(e) => handleFormChange("costType", e.target.value)}
            >
              <FormControlLabel value="Running" control={<Radio />} label="Running" />
              <FormControlLabel value="Fixed" control={<Radio />} label="Fixed" />
            </RadioGroup>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={formState.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
            />
          </Stack>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tab-pane" id="Ini_Cost">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-start">
            <Label className="textstrong ps-2">Cost</Label>
          </div>
          <div className="col-12 col-sm-6">
            <Stack
              horizontal
              horizontalAlign="end"
              tokens={{ childrenGap: 10 }}
              className="toprightactionsCol text-end pe-2"
            >
              <TooltipHost content="Add">
                <DefaultButton
                  className="btn closelink add-new1"
                  onClick={openDrawer}
                  iconProps={{ iconName: "Add" }}
                >
                  Add
                </DefaultButton>
              </TooltipHost>
              <a
                id="deleteBtn_cost"
                className="btn closelink add-new1"
                data-bs-toggle="tooltip"
                data-bs-original-title="Delete"
              >
                Delete
              </a>
            </Stack>
          </div>
        </div>
      </div>

      <div className="init_grid_panel m-3">
        <div className="table_wrapper stageGridPanel">
          <Table striped bordered hover id="init_borderedTbl_Cost">
            <thead>
              <tr>
                <th>
                  <div className="igph_title position-relative">
                    <Checkbox
                      id="dltAllcost"
                      className="chckHead"
                      checked={selectAllChecked}
                      onChange={(e, checked) => handleSelectAllChange(checked)}
                    />
                  </div>
                </th>
                <th className="text-end">Amount</th>
                <th className="text-end">From Date</th>
                <th className="text-end">To Date</th>
                <th className="text-end">Cost Category</th>
              </tr>
            </thead>
            <tbody>
              {costData.map((cost, index) => (
                <tr key={index}>
                  <td>
                    <Checkbox
                      id={`chkRow${index + 1}`}
                      className="dltSingleCost"
                      checked={individualChecks[index]}
                      onChange={(e, checked) => handleIndividualChange(index, checked)}
                    />
                    <a href="#" className="stageAnchor text-decoration-none ps-1">
                      {cost.name}
                    </a>
                  </td>
                  <td className="text-end">{cost.amount}</td>
                  <td className="text-end">{cost.fromDate}</td>
                  <td className="text-end">{cost.toDate}</td>
                  <td className="text-end">{cost.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerContent />
      </Drawer>
    </div>
  );
};

export default CostTabContent;
