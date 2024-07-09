import React, { useState, useEffect } from "react";
import { Drawer, Select, MenuItem, TextField } from "@mui/material"; // Assuming you are using MUI for Select and TextField
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { mergeStyles } from "@fluentui/react/lib/Styling"; // Importing mergeStyles from Fluent UI Styling
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = mergeStyles({
  drawerContent: {
    width: 400,
    padding: 20
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  formGroup: {
    marginBottom: 20
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10
  }
});

const ROIDetailsDrawer = ({ open, onClose, initialData, onSave }) => {
  const classes = useStyles();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [projectedROI, setProjectedROI] = useState("");

  useEffect(() => {
    if (initialData) {
      setMonth(initialData.month);
      setYear(initialData.year);
      setProjectedROI(initialData.projectedROI);
    }
  }, [initialData]);

  const handleSave = () => {
    onSave({ month, year, projectedROI });
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className={classes.drawerContent}>
        <div className={classes.header}>
          <h5>ROT Details</h5>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.formGroup}>
          <label>Month</label>
          <Select value={month} onChange={(e) => setMonth(e.target.value)} fullWidth>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
        </div>
        <div className={classes.formGroup}>
          <label>Year</label>
          <Select value={year} onChange={(e) => setYear(e.target.value)} fullWidth>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
          </Select>
        </div>
        <div className={classes.formGroup}>
          <label>Projected ROI</label>
          <TextField
            value={projectedROI}
            onChange={(e) => setProjectedROI(e.target.value)}
            fullWidth
          />
        </div>
        <div className={classes.buttonGroup}>
          <DefaultButton onClick={onClose}>Cancel</DefaultButton>
          <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
        </div>
      </div>
    </Drawer>
  );
};

export default ROIDetailsDrawer;
