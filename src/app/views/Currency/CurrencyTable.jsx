import React, { useState, useEffect } from "react";
import { Box, Tooltip, Modal, Typography } from "@mui/material";
import { Checkbox, PrimaryButton, DetailsList, DetailsListLayoutMode } from "@fluentui/react";
import Pagination from "@mui/material/Pagination";
import DrawerCurrency from "./DrawerCurrency";
import AccorCurrency from "./AccorCurrency";
import { CurrencyInfo_Section } from "./DummyData";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import Ad_SearchIcon from "../../../assets/img/search-list.png";

const CurrencyTable = ({ currencyData, onSearch, onClose, getViewOptions }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState(CurrencyInfo_Section.map(() => false));
  const [selectedCurrencyNames, setSelectedCurrencyNames] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [editCurrency, setEditCurrency] = useState(null);
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

  const handleEditClick = (currency) => {
    setEditCurrency(currency);
    setDrawerVisible(true);
  };

  const handleUpdateCurrency = (updatedCurrency) => {
    const updatedData = data.map((currency) =>
      currency.currencyID === updatedCurrency.currencyID ? updatedCurrency : currency
    );
    setData(updatedData);
    setDrawerVisible(false); // Close the drawer/modal after update
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

  const cellStyle = {
    borderRight: "1px solid #ddd", // Vertical lines between cells
    padding: "8px" // Adjust padding as needed
  };

  const columns = [
    {
      key: "currencyID",
      name: t("currency_code"),
      fieldName: "currencyID",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      isMultiline: false, // Disable multiline to support resizing
      onRender: (item) => <div style={cellStyle}>{item.currencyID}</div>
    },
    {
      key: "currencyName",
      name: t("currency_name"),
      fieldName: "currencyName",
      minWidth: 150,
      maxWidth: 200,
      isMultiline: false,
      isResizable: true,
      onRender: (item) => <div style={cellStyle}>{item.currencyName}</div>
    },
    {
      key: "currencySymbol",
      name: t("currency_symbol"),
      fieldName: "currencySymbol",
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false,
      isResizable: true,
      onRender: (item) => <div style={cellStyle}>{item.currencySymbol}</div>
    },
    {
      key: "conversionRate",
      name: `${t("conversion_rate")} (${t("value_vs_base_currency")})`,
      fieldName: "conversionRate",
      minWidth: 150,
      maxWidth: 200,
      isMultiline: true,
      isResizable: true,
      onRender: (item) => <div style={cellStyle}>{item.conversionRate}</div>
    },
    {
      key: "majorCurrencyUnit",
      name: t("major"),
      fieldName: "majorCurrencyUnit",
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false,
      isResizable: true,
      onRender: (item) => <div style={cellStyle}>{item.majorCurrencyUnit}</div>
    },
    {
      key: "minorCurrencyUnit",
      name: t("minor"),
      fieldName: "minorCurrencyUnit",
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false,
      isResizable: true,
      onRender: (item) => <div style={cellStyle}>{item.minorCurrencyUnit}</div>
    },
    {
      key: "select",
      name: "",
      fieldName: "select",
      minWidth: 50,
      maxWidth: 50,
      isMultiline: false,
      isResizable: true,
      onRender: (item, index) => (
        <Checkbox
          styles={checkboxStyles}
          id={`chkRow${index + 1}`}
          className="dltSingleCost"
          checked={individualChecks[index]}
          onChange={(e, checked) => handleIndividualChange(index, checked)}
        />
      )
    },
    {
      key: "edit",
      name: "",
      fieldName: "edit",
      minWidth: 50,
      maxWidth: 50,
      isMultiline: false,
      isResizable: false,
      onRender: (item) => (
        <Tooltip title={!canEdit ? t("no_rights_edit") : ""}>
          <span>
            <PrimaryButton
              text={t("edit")}
              onClick={() => {
                if (!canEdit) {
                  handleDisabledClick(t("no_rights_edit"));
                } else {
                  handleEditClick(item);
                }
              }}
              disabled={!canEdit}
              styles={{
                root: { backgroundColor: canEdit ? "#1976d2" : "#ccc", color: "#fff" }
              }}
            />
          </span>
        </Tooltip>
      )
    }
  ];

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
              aria-label={t("search_list")}
              data-bs-original-title={t("search_list")}
              style={{ width: "30px", height: "30px" }}
            />
            <Tooltip title={!canAdd ? t("no_rights_add") : ""}>
              <span>
                <PrimaryButton
                  onClick={() => {
                    if (!canAdd) {
                      handleDisabledClick(t("no_rights_add"));
                    } else {
                      setSelectedCurrencyNames([]);
                      setDrawerVisible(true);
                    }
                  }}
                  text={t("add")}
                  disabled={!canAdd}
                  styles={{
                    root: { backgroundColor: canAdd ? "#1976d2" : "#ccc", color: "#fff" }
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip title={!canDelete ? t("no_rights_delete") : ""}>
              <span>
                <PrimaryButton
                  text={t("delete")}
                  onClick={() => {
                    if (!canDelete) {
                      handleDisabledClick(t("no_rights_delete"));
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
          onUpdateCurrency={handleUpdateCurrency} // Pass update handler
        />
      </div>

      <Box>
        <DetailsList
          items={currentData}
          columns={columns}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          isMultiline={true}
          onItemInvoked={(item) => handleEditClick(item)}
          selectionMode={0}
          selectionPreservedOnEmptyClick={true}
        />
      </Box>
      <div className="d-flex justify-content-center">
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-content">
          <Typography variant="h6">{modalMessage}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CurrencyTable;
