import React, { useState, useEffect } from "react";
import { CurrencyInfo_Section } from "./DummyData";
import {
  Box,
  Link,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Ad_SearchIcon from "../../../assets/img/search-list.png";
import { Checkbox, PrimaryButton } from "@fluentui/react";
import DrawerCurrency from "./DrawerCurrency";
import AccorCurrency from "./AccorCurrency";

const CurrencyTable = ({ currencyData }) => {
  const [data, setData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState(CurrencyInfo_Section.map(() => false));
  const [selectedCurrencyNames, setSelectedCurrencyNames] = useState();
  useEffect(() => {
    setData(currencyData);
    console.log("currencyData4", currencyData);
  }, [currencyData]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const currentData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSelectAllChange = (e, checked) => {
    setSelectAllChecked(checked);
    setIndividualChecks(individualChecks.map(() => checked));
  };

  const handleIndividualChange = (index, checked) => {
    const newChecks = [...individualChecks];
    newChecks[index] = checked;
    setIndividualChecks(newChecks);
    setSelectAllChecked(newChecks.every((check) => check));
  };

  const checkboxStyles = {
    checkbox: {
      selectors: {
        "::after": {
          content: '"✓"',
          fontSize: "16px",
          color: "white",
          paddingRight: "7px"
        }
      }
    },
    checkmark: {
      visibility: "hidden"
    }
  };

  // Get selected items based on individualChecks
  const selectedItems = currentData.filter((_, index) => individualChecks[index]);
  console.log("selectedValue2s", selectedCurrencyNames);
  return (
    <div className="mx-4 mt-3">
      <div className="row align-items-end mb-3">
        <div className="col-3 col-sm-3"></div>
        <div className="col-3 col-sm-3" align={"start"}></div>
        <div className="col-6 col-sm-6 my-2">
          <div className="d-flex justify-content-end gap-3">
            <img
              src={Ad_SearchIcon}
              alt=""
              onClick={handleShowForm}
              data-bs-toggle="tooltip"
              aria-label="Search List"
              data-bs-original-title="Search List"
            />
            <PrimaryButton
              className="borderbtnbgblue"
              onClick={() => setDrawerVisible(true)}
              text="+ Add"
            />
            <PrimaryButton className="borderbtnbgblue" text="Delete" />
          </div>
        </div>
        <DrawerCurrency
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          selectedCurrencyNames={selectedCurrencyNames}
        />
      </div>
      {showForm && <AccorCurrency className="mb-3" onClose={handleCloseForm} />}
      <Box sx={{ height: 340 }}>
        <TableContainer component={Paper} className="mt-3">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Currency Code</TableCell>
                <TableCell align="center">Currency Name</TableCell>
                <TableCell align="center">Currency Symbol</TableCell>
                <TableCell align="center">
                  Conversion Rate <br /> (Value Vs. Base Currency)
                </TableCell>
                <TableCell align="center">Major</TableCell>
                <TableCell align="center">Minor</TableCell>
                <TableCell align="center" className="col-sm-1">
                  <Checkbox
                    styles={checkboxStyles}
                    id="dltAllcost"
                    className="chckHead"
                    checked={selectAllChecked}
                    onChange={(e, checked) => handleSelectAllChange(e, checked)}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((currency, index) => (
                <TableRow
                  key={currency.currencyID}
                  style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" }}
                >
                  <TableCell align="center">{currency.currencyID}</TableCell>
                  <TableCell align="center">
                    <Link
                      href="javascript:;"
                      id="ClearSearchBtn"
                      className="closelink"
                      onClick={() => {
                        setSelectedCurrencyNames([currency]);
                        setDrawerVisible(true);
                      }}
                    >
                      {currency.currencyName}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{currency.currencySymbol}</TableCell>
                  <TableCell align="center">{currency.conversionRate}</TableCell>
                  <TableCell align="center">{currency.majorCurrencyUnit}</TableCell>
                  <TableCell align="center">{currency.minorCurrencyUnit}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      styles={checkboxStyles}
                      id={`chkRow${index + 1}`}
                      className="dltSingleCost"
                      checked={individualChecks[index]}
                      onChange={(e, checked) => handleIndividualChange(index, checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div>
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </div>
    </div>
  );
};

export default CurrencyTable;
