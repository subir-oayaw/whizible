import React from "react";
import { Table } from "react-bootstrap";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import "bootstrap/dist/css/bootstrap.min.css";

const FundingTab = () => {
  const fundings = [
    { id: 1, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" },
    { id: 2, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" },
    { id: 3, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" },
    { id: 4, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" },
    { id: 5, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" },
    { id: 6, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" },
    { id: 7, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" },
    { id: 8, category: "Lorem Ipsum", sourceTitle: "Lorem Ipsum", approvedAmount: "6,21,75,831" }
  ];

  return (
    <div className="container-fluid mt-3">
      <div className="row align-items-center mb-3">
        <div className="col-12 col-sm-6 text-start">
          <label className="textstrong ps-2">Funding</label>
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

      <div className="table_wrapper stageGridPanel">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="thOuter col-sm-4">
                <div className="igph_title position-relative">Cost of Category</div>
              </th>
              <th className="thOuter col-sm-3">Funding source & title</th>
              <th className="thOuter">Approved amount</th>
              <th className="thOuter col-sm-1 text-center">
                <div className="custom_chckbox">
                  <Checkbox />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {fundings.map((funding) => (
              <tr key={funding.id} className="TRfunding">
                <td className="tdOuter">
                  <div className="igph_title position-relative">
                    <a
                      href="javascript:;"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#IniFundingdetailoffcanvas"
                    >
                      {funding.category}
                    </a>
                  </div>
                </td>
                <td className="tdOuter">
                  <div className="init_title position-relative">{funding.sourceTitle}</div>
                </td>
                <td className="tdOuter">
                  <div className="igph_title position-relative">{funding.approvedAmount}</div>
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
      <div id="IMfunding_pagination" className="text-center Init_pagination"></div>
      <div className="clearfix"></div>
    </div>
  );
};

export default FundingTab;
