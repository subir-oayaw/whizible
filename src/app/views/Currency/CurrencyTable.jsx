import React, { useState, useEffect } from "react";
import { Box, Tooltip, Modal, Typography } from "@mui/material";
import {
  Checkbox,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  DetailsListColumns,
  DetailsRow,
  DetailsHeader,
  IColumn
} from "@fluentui/react";
import DrawerCurrency from "./DrawerCurrency";
import AccorCurrency from "./AccorCurrency";
import { CurrencyInfo_Section } from "./DummyData";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import Ad_SearchIcon from "../../../assets/img/search-list.png";
import Pagination from "@mui/material/Pagination";

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

  const columns = [
    {
      key: "currencyID",
      name: t("currency_code"),
      fieldName: "currencyID",
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false
    },
    {
      key: "currencyName",
      name: t("currency_name"),
      fieldName: "currencyName",
      minWidth: 150,
      maxWidth: 200,
      isMultiline: false
    },
    {
      key: "currencySymbol",
      name: t("currency_symbol"),
      fieldName: "currencySymbol",
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false
    },
    {
      key: "conversionRate",
      name: `${t("conversion_rate")} (${t("value_vs_base_currency")})`,
      fieldName: "conversionRate",
      minWidth: 150,
      maxWidth: 200,
      isMultiline: false
    },
    {
      key: "majorCurrencyUnit",
      name: t("major"),
      fieldName: "majorCurrencyUnit",
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false
    },
    {
      key: "minorCurrencyUnit",
      name: t("minor"),
      fieldName: "minorCurrencyUnit",
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false
    },
    {
      key: "select",
      name: "",
      fieldName: "select",
      minWidth: 50,
      maxWidth: 50,
      isMultiline: false,
      onRender: (item, index) => (
        <Checkbox
          styles={checkboxStyles}
          id={`chkRow${index + 1}`}
          className="dltSingleCost"
          checked={individualChecks[index]}
          onChange={(e, checked) => handleIndividualChange(index, checked)}
        />
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
        />
      </div>
      {showForm && <AccorCurrency onClose={onClose} onSearch={onSearch} />}
      <Box sx={{ height: 340 }}>
        <DetailsList
          items={currentData}
          columns={columns}
          layoutMode={DetailsListLayoutMode.fixedColumns}
        />
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
            {t("access_denied")}
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
