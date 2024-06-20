import React from "react";
import { Table, Nav, Stack } from "react-bootstrap";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import "bootstrap/dist/css/bootstrap.min.css";

const WorkOrderTab = () => {
  const workOrders = [
    { id: 1, number: "9000234", subject: "Lorem Ipsum", date: "10 Aug 2022", vendor: "Vendor1" },
    { id: 2, number: "9000234", subject: "Lorem Ipsum", date: "10 Aug 2022", vendor: "Vendor2" },
    { id: 3, number: "9000234", subject: "Lorem Ipsum", date: "10 Aug 2022", vendor: "Vendor3" },
    { id: 4, number: "9000234", subject: "Lorem Ipsum", date: "10 Aug 2022", vendor: "Vendor4" },
    { id: 5, number: "9000234", subject: "Lorem Ipsum", date: "10 Aug 2022", vendor: "Vendor5" },
    { id: 6, number: "9000234", subject: "Lorem Ipsum", date: "10 Aug 2022", vendor: "Vendor6" },
    { id: 7, number: "9000234", subject: "Lorem Ipsum", date: "10 Aug 2022", vendor: "Vendor7" },
    { id: 8, number: "9000234", subject: "Lorem Ipsum", date: "10 Aug 2022", vendor: "Vendor8" }
  ];

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
              onClick={() => console.log("Add button clicked")}
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

      <div className="table-responsive offTable_wrapper ">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="thOuter col-sm-4">
                <div className="igph_title position-relative">Work order No</div>
              </th>
              <th className="thOuter col-sm-3">Subject</th>
              <th className="thOuter">Date of Issue</th>
              <th className="thOuter">Vendor</th>
              <th className="thOuter col-sm-1 text-center">
                <div className="custom_chckbox">
                  <Checkbox />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((order) => (
              <tr key={order.id} className="TRworkorder">
                <td className="tdOuter">
                  <div className="igph_title position-relative">
                    <a
                      href="javascript:;"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#Iniworkorderoffcanvas"
                    >
                      {order.number}
                    </a>
                  </div>
                </td>
                <td className="tdOuter">
                  <div className="init_title position-relative">{order.subject}</div>
                </td>
                <td className="tdOuter">
                  <div className="igph_title position-relative">{order.date}</div>
                </td>
                <td className="tdOuter">
                  <div className="igph_title position-relative">{order.vendor}</div>
                </td>
                <td className="tdOuter text-center">
                  <div className="custom_chckbox">
                    <Checkbox />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="clearfix"></div>
      <div id="IMworkorderpagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>
    </div>
  );
};

export default WorkOrderTab;
