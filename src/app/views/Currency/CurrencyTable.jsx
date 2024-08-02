import React, { useState, useEffect } from "react";
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
  TableRow,
  Tooltip,
  Modal,
  Typography
} from "@mui/material";
import Ad_SearchIcon from "../../../assets/img/search-list.png";
import { Checkbox, PrimaryButton } from "@fluentui/react";
import DrawerCurrency from "./DrawerCurrency";
import AccorCurrency from "./AccorCurrency";
import { CurrencyInfo_Section } from "./DummyData";

const CurrencyTable = ({ currencyData, onSearch, onClose, getViewOptions }) => {
  const [data, setData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState(CurrencyInfo_Section.map(() => false));
  const [selectedCurrencyNames, setSelectedCurrencyNames] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const viewPermission = getViewOptions && getViewOptions[0] ? getViewOptions[0] : {};
  const { a: canAdd, e: canEdit, d: canDelete } = viewPermission;

  useEffect(() => {
    setData(currencyData);
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

  const handleDisabledClick = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
              style={{ width: "30px", height: "30px" }}
            />
            <Tooltip title={!canAdd ? "You don't have rights, contact admin" : ""}>
              <span>
                <PrimaryButton
                  onClick={() => {
                    if (!canAdd) {
                      handleDisabledClick("You don't have rights to add, contact admin.");
                    } else {
                      setSelectedCurrencyNames([]);
                      setDrawerVisible(true);
                    }
                  }}
                  text="Add"
                  disabled={!canAdd}
                  styles={{
                    root: { backgroundColor: canAdd ? "#1976d2" : "#ccc", color: "#fff" }
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip title={!canDelete ? "You don't have rights, contact admin" : ""}>
              <span>
                <PrimaryButton
                  text="Delete"
                  onClick={() => {
                    if (!canDelete) {
                      handleDisabledClick("You don't have rights to delete, contact admin.");
                    }
                  }}
                  disabled={!canDelete}
                  styles={{
                    root: { backgroundColor: canDelete ? "#1976d2" : "#ccc", color: "#fff" }
                  }}
                />
              </span>
            </Tooltip>
          </div>
        </div>
        <DrawerCurrency
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          selectedCurrencyNames={selectedCurrencyNames}
        />
      </div>
      {showForm && <AccorCurrency onClose={onClose} onSearch={onSearch} />}
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
                    <Tooltip title={!canEdit ? "You don't have rights to edit, contact admin" : ""}>
                      <span>
                        <Link
                          href="javascript:;"
                          id="ClearSearchBtn"
                          className="closelink"
                          onClick={() => {
                            if (!canEdit) {
                              handleDisabledClick("You don't have rights to edit, contact admin.");
                            } else {
                              setSelectedCurrencyNames([currency]);
                              setDrawerVisible(true);
                            }
                          }}
                          style={{
                            color: canEdit ? "#1976d2" : "#ccc",
                            textDecoration: "none",
                            cursor: canEdit ? "pointer" : "not-allowed"
                          }}
                        >
                          {currency.currencyName}
                        </Link>
                      </span>
                    </Tooltip>
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
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Access Denied
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CurrencyTable;
