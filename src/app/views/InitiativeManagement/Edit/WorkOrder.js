import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { TextField } from "@fluentui/react/lib/TextField";
import Drawer from "@mui/material/Drawer";
import "bootstrap/dist/css/bootstrap.min.css";
import { DatePicker } from "@fluentui/react/lib/DatePicker";

import "./WorkOrder.css";

const WorkOrderTab = ({ initiativeWorkOrder }) => {
  // Extract the work orders from initiativeWorkOrder
  const workOrderList = initiativeWorkOrder.data.listInitiativeWorOrderListEntity.map((order) => ({
    id: order.ideaID,
    number: order.workOrderNo,
    subject: order.location,
    date: new Date(order.signingDate).toLocaleDateString(), // Format the date as needed
    vendor: order.vendorName,
    selected: false
  }));

  const [workOrders, setWorkOrders] = useState(workOrderList);
  const [selectAll, setSelectAll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState({
    number: "",
    subject: "",
    date: "",
    vendor: "",
    initiativeCode: "",
    initiativeTitle: "",
    relationshipManager: "",
    seniorManagementInstructions: "",
    backgroundContext: "",
    approachOverview: "",
    description: ""
  });

  const toggleSelectAll = () => {
    const newState = !selectAll;
    setWorkOrders(workOrders.map((order) => ({ ...order, selected: newState })));
    setSelectAll(newState);
  };

  const toggleSelection = (orderId) => {
    const updatedOrders = workOrders.map((order) =>
      order.id === orderId ? { ...order, selected: !order.selected } : order
    );
    setWorkOrders(updatedOrders);
    setSelectAll(updatedOrders.every((order) => order.selected));
  };

  const openDrawer = (data) => {
    setDrawerData({
      number: data.number,
      subject: data.subject,
      date: new Date(data.date), // Set the date for the DatePicker
      vendor: data.vendor,
      initiativeCode: "", // Add additional fields as needed
      initiativeTitle: "",
      relationshipManager: "",
      seniorManagementInstructions: "",
      backgroundContext: "",
      approachOverview: "",
      description: ""
    });
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row align-items-center mb-3">
        <div className="col-12 col-sm-6 text-start">
          <label className="textstrong ps-2">Work order</label>
        </div>
        <div className="col-12 col-sm-6 text-end">
          <div className="toprightactionsCol pt-1 pe-2">
            <PrimaryButton
              className="me-2"
              iconProps={{ iconName: "Add" }}
              text="Add"
              onClick={() =>
                openDrawer({
                  number: "",
                  subject: "",
                  date: new Date(),
                  vendor: "",
                  initiativeCode: "",
                  initiativeTitle: "",
                  relationshipManager: "",
                  seniorManagementInstructions: "",
                  backgroundContext: "",
                  approachOverview: "",
                  description: ""
                })
              }
            />
            <PrimaryButton
              className="ms-2"
              iconProps={{ iconName: "Delete" }}
              text="Delete"
              onClick={() => console.log("Delete button clicked")}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive offTable_wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="thOuter col-sm-4">
                <div className="igph_title position-relative">
                  <span className="ms-2">Work order No</span>
                </div>
              </th>
              <th className="thOuter col-sm-3">Subject</th>
              <th className="thOuter">Date of Issue</th>
              <th className="thOuter">Vendor</th>
              <th className="thOuter col-sm-1 text-center">
                <Checkbox checked={selectAll} onChange={toggleSelectAll} />
              </th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((order) => (
              <tr key={order.id} className="TRworkorder">
                <td className="tdOuter" onDoubleClick={() => openDrawer(order)}>
                  <div className="igph_title position-relative">
                    <a href="javascript:;">{order.number}</a>
                  </div>
                </td>
                <td className="tdOuter" onDoubleClick={() => openDrawer(order)}>
                  <div className="init_title position-relative">{order.subject}</div>
                </td>
                <td className="tdOuter" onDoubleClick={() => openDrawer(order)}>
                  <div className="igph_title position-relative">{order.date}</div>
                </td>
                <td className="tdOuter" onDoubleClick={() => openDrawer(order)}>
                  <div className="igph_title position-relative">{order.vendor}</div>
                </td>
                <td className="tdOuter text-center">
                  <Checkbox checked={order.selected} onChange={() => toggleSelection(order.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <div className="offcanvas-body p-4">
          <h5 className="offcanvasTitle">Workorder Details</h5>
          <div className="form-group row pt-1 mb-3">
            <div className="col-sm-12 text-end form-group">
              <label className="form-label IM_label">
                (<font color="red">*</font> Mandatory)
              </label>
            </div>
            <div className="col-sm-4 form-group">
              <TextField
                label="Work Order No."
                value={drawerData.number}
                onChange={(e) => setDrawerData({ ...drawerData, number: e.target.value })}
              />
            </div>
            <div className="col-sm-4 form-group">
              <TextField
                label="Subject"
                value={drawerData.subject}
                onChange={(e) => setDrawerData({ ...drawerData, subject: e.target.value })}
                required
                errorMessage={drawerData.subject.trim() === "" ? "Subject is required" : ""}
              />
            </div>
            <div className="col-sm-4 form-group">
              <DatePicker
                label="Date of Issue"
                value={drawerData.date}
                onSelectDate={(date) =>
                  setDrawerData({ ...drawerData, date: date ? date.toLocaleDateString() : "" })
                }
                isRequired={true}
                placeholder="Select a date"
              />
            </div>
          </div>
          <div className="form-group row pt-1 mb-3">
            <div className="col-sm-4 form-group">
              <TextField
                label="Vendor"
                value={drawerData.vendor}
                onChange={(e) => setDrawerData({ ...drawerData, vendor: e.target.value })}
              />
            </div>
          </div>
          {/* Add the rest of the fields here */}
          <div className="text-end">
            <PrimaryButton
              text="Save"
              styles={{ root: { marginRight: 8 } }}
              onClick={() => console.log("Save button clicked")}
            />
            <PrimaryButton text="Cancel" onClick={handleDrawerClose} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default WorkOrderTab;
